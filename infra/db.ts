const vpc = new sst.aws.Vpc("aecomjotsPostgresVpc", { bastion: true });
export const database = new sst.aws.Aurora("aecomjotsPostgresDb", {
  engine: "postgres",
  scaling: {
    min: "1 ACU",
    max: "1 ACU",
  },
  vpc,
});
