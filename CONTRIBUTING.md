# Contributing to Amazon Lex Happy Birthday Bot with Slack

Thank you for reading the contributing guide of the project. It will help you to make great contributions like reporting issues, creating a feature request, and submitting pull requests.

## Issues, Feature Request & Questions

Before reporting an **issue**, **feature request,** or **question**, please do a quick search in **Open Issues** to verify if it was already created. If there is an existing issue, add your comments to that issue. 

##### Writing Great Issues & Feature Requests

- Provide reproducible steps, what the result of the steps was, and what you would have expected to happen.
- Avoid listing multiple bugs or requests in the same issue. Always write a single bug or feature request per issue. 
- Avoid adding your issue as a comment to an existing one unless it's for the exact input. Issues can look similar, but have different causes.
- Add screenshots or animated GIF.

##### Submitting Issues 

1. Go to the [repository](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot) page, click on **New issue**.
2. Select the **template**. Choose the one that fixes to your case. 
   1. Bug
   2. Documentation Bug
   3. Question
3. Fill the issue template. Remember to follow the best practices to write Issues and Feature requests.



## Develop Guidelines

### Branching Model

- **Main**: Accepts merges from Features/Issues and Hotfixes
- **Features/Issues**: Always branch off HEAD of Main
  - Prefix: topic/* ex: `add/new-command`, `fix/birhtday-message-issue`
- **Hotfix**: Always branch off HEAD of Main. 
  - Prefix: hotfix/* ex: `hotfix/remove-duplicate-load-data`

### Developing on Lambdas functions

If you are going to contribute to the lambdas functions, follow the next steps to deploy and test them. 	

1. Clone the repo

   ```
   git clone https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot.git
   ```

2. Navigate to the project 

   ```
   cd amazon-lex-happybirthday-bamboohr-slack-bot
   ```

3. Install the dependencies

   ```
   npm install
   ```

4. Make your great contribution. Like updates, hotfix and enhancements. Please, remember to follow the [branching model](#branching-model)

5. Follow the next [guide](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot.git) to deploy to an AWS environment. We are using the [Serverless Framework](https://www.serverless.com/open-source/) to deploy the resources to AWS.

6. Test it using the [AWS console](https://console.aws.amazon.com) portal.



#### Run Lambda Functions using Serverless Framework

Using  [Serverless Framework](https://www.serverless.com/open-source/) you are able to run an instance of the Lambda function from your computer without deploy it. 

1. In the **birthday-bot** directory, open a terminal.

2. Install the dependencies.

   ```
   npm install
   ```

3. Run the next command.

   ```
   serverless invoke local --function FUNCTION_NAME
   ```



### Amazon Lex Birthday Bot

If you are going to contribute to the Birthday Bot, Follow the Set up steps to import the bot to the AWS resource. 



If you want to import a new version of the Amazon Lex Birthday Bot Model. 

Please remove the values of the lambdas names. 





