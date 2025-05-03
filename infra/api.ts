import { vpc, database } from "./db";

const ClerkJWTAuthorizerAud = new sst.Secret("ClerkJWTAuthorizer");
const ClerkDevAccountDefaultEndpoint = new sst.Secret(
  "ClerkDevAccountDefaultEndpoint",
);

export const api = new sst.aws.ApiGatewayV2("Api", {
  link: [ClerkJWTAuthorizerAud, ClerkDevAccountDefaultEndpoint],
  transform: {
    route: {
      handler: {
        link: [database],
      },
    },
  },
  cors: true,
});

const ClerkJWTAuthorizer = "ClerkJWTAuthorizer";
const ClerkJWTAuthorizerVar = api.addAuthorizer({
  name: ClerkJWTAuthorizer,
  jwt: {
    issuer: ClerkDevAccountDefaultEndpoint.value,
    audiences: [ClerkJWTAuthorizerAud.value],
  },
});

function addProtectedGoRoute(rawRoute: string, handler: string): void {
  const isDev = process.env.SST_STAGE === "dev";
  api.route(
    rawRoute,
    {
      handler,
      runtime: "go",
      environment: {
        POSTGRES_USERNAME: database.username,
        POSTGRES_PASSWORD: database.password,
        POSTGRES_DATABASE: database.database,
        POSTGRES_HOST: database.host,
        SST_STage: process.env.SST_STAGE,
      },
      ...(isDev ? {} : { vpc }), // include `vpc` only if not in dev
    },
    {
      auth: {
        jwt: {
          authorizer: ClerkJWTAuthorizerVar.id,
        },
      },
    },
  );
}

addProtectedGoRoute("GET /links", "packages/functions/cmd/links/main.go");
