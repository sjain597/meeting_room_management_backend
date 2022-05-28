import type { AWS } from "@serverless/typescript";
import { createUser,user } from "@functions/user";
import { changeMemberRole } from "@functions/admin";
const serverlessConfiguration: AWS = {
  service: "meeting-room-mgmt",
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-prune-plugin",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${self:custom.stage}",
    region: "${self:custom.region}" as any,
    iamRoleStatements: [],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    
  },
  functions: {
    createUser,
    user,
    changeMemberRole
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk","pg-native"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    defaultStage: "dev",
    defaultRegion: "ap-south-1",
    stage: "${opt:stage,self:custom.defaultStage}",
    region: "${opt:region,self:custom.defaultRegion}",
    prune: {
      automatic: true,
      number: 1,
    },
  },
  
};

module.exports = serverlessConfiguration;
