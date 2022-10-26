import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as SimpleCdkApp from "../lib/simple-cdk-app-stack";

// example test. To run these tests, uncomment this file along with the
// example resource in lib/simple-cdk-app-stack.ts
test("S3 Bucket Created", () => {
  const app = new cdk.App();

  const stack = new SimpleCdkApp.SimpleCdkAppStack(app, "MyTestStack");
  // THEN
  const template = Template.fromStack(stack);

  template.hasResource("AWS::S3::Bucket", {});
});
