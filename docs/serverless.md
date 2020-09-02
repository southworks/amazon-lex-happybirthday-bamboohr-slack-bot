# Serverless application

[Serverless Framework](https://www.serverless.com/open-source/) is an open source framework to manage serverless applications, this allows you to develop, deploy, and test locally the app, making the development process easier.

It has many [examples](https://www.serverless.com/examples/) in different languages for various cloud platforms. Also has useful features, some of these are:

- You can [manage multiple stages](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy#deployment-with-stage-and-region-options), deploying the service with the flag `--stage`.
- You can easily [test locally](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) the Lambda functions.
- You can [configure in a YAML file](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/) the [events ](https://www.serverless.com/framework/docs/providers/aws/guide/events/)which trigger your functions and create related AWS [resources](https://www.serverless.com/framework/docs/providers/aws/guide/resources/).
- The deploy process compresses your functions and creates CloudFormation stack files with all the preconfigured services, and deploys it to the cloud.
- You can integrate it and automate a CI/CD process with many tools like [Jenkins](https://www.jenkins.io/) or [CircleCI](https://circleci.com/).

## How it works

We use the Serverless Framework to simplify our development and deployment of the solution.

We implemented the Lambda functions and also the other resources needed like the Cron job, S3 bucket, and Parameter Store.

This not include the Lex service configuration because the implementation of it would be complex from Serverless.

## Architecture diagram

You can see the architecture defined in the serverless application in the following diagram:

![image.png](https://storage.googleapis.com/slite-api-files-production/files/39c0c8cf-9cde-476d-a0d7-7e288a2ebe70/image.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [AWS account](https://aws.amazon.com/es)

## To run this project

1. Install **Serverless Framework**. Open a terminal, and run the next command:
   ```bash
   npm install -g serverless
   ```
   *(For alternative ways of installation see* [*this*](https://www.serverless.com/framework/docs/getting-started/)*)*

2. Configure your **AWS credentials** as follow:

   ```bash
   serverless config credentials --provider aws --key <your-key> --secret <your-secret>
   ```

   *(For more detailed information about how to get the AWS key and secret, see* [*this*](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)*)*

3. Go to the **birthday-bot** directory and run the next command.

   ```bash
   serverless deploy
   ```

   *The default value of the* `--stage` *flag is* `dev`*. You can choose whatever stage you want to deploy the app, like `prod`. This parameter will be added to the name of each resource to recognize it.*

   > **Environment Variables**
   >
   > The environment variables are in `env.yml`.
   >
   > For development set them `env.dev.yml`.

## Further reading
- [Serverless CLI Reference for AWS](https://www.serverless.com/framework/docs/providers/aws/cli-reference/)
- [AWS Lambda](https://aws.amazon.com/es/lambda/)
- [AWS S3 ](https://aws.amazon.com/es/s3/)
- [AWS CloudWatch cronjobs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)
- [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)