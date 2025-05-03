/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aecomjots",
      removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const database = await import("./infra/db");
    const api = await import("./infra/api");
    await import("./infra/web");

    return {
      apiUrl: api.api.url,
      db: database,
    };
  },
});
