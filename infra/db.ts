export const vpc = new sst.aws.Vpc("aecomjotsPostgresVpc", {
  bastion: false,
  nat: null,
});
export const database = new sst.aws.Aurora("aecomjotsPostgresDb", {
  engine: "postgres",
  scaling: {
    min: "0 ACU",
    max: "1 ACU",
    pauseAfter: "300 seconds",
  },
  vpc,
});
