const region = aws.getRegionOutput().name;

const clerkPublic = new sst.Secret("ClerkPublicKey");
const clerkSecret = new sst.Secret("ClerkSecretKey");
const stage = process.env.SST_STAGE;
export const frontend = new sst.aws.Astro("Frontend", {
  path: "packages/frontend",
  link: [clerkPublic, clerkSecret],
  environment: {
    ASTRO_STAGE: stage,
    ASTRO_REGION: region,
    PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublic.value,
    CLERK_SECRET_KEY: clerkSecret.value,
    CLERK_SIGN_IN_URL: "/sign-in",
  },
  domain: {
    name: process.env.ASTRO_APP_DOMAIN,
    dns: false,
    cert: process.env.FE_ACM_CERT_ARN,
  },
});
