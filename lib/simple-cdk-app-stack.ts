import * as cdk from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as path from "path";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
export class SimpleCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "simple-cdk-app-bucket", {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new BucketDeployment(this, "simple-cdk-app-photos", {
      sources: [Source.asset(path.join(__dirname, "..", "photos"))],
      destinationBucket: bucket,
    });

    const getPhotos = new lambda.NodejsFunction(this, "simple-cdk-app-lambda", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, "../", "api", "get-photos", "index.ts"),
      handler: "getPhotos",
      environment: {
        PHOTO_BUCKET_NAME: bucket.bucketName,
      },
    });

    new cdk.CfnOutput(this, "simple-cdk-app-bucket-export", {
      value: bucket.bucketName,
      exportName: "simple-cdk-app-bucket-name",
    });
  }
}
