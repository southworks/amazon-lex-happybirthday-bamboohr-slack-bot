# Contributing to Amazon Lex Happy Birthday Bot with Slack

Thank you for reading the contributing guidelines of the project. It will help you to make great contributions like reporting issues, creating feature requests, and submitting pull requests.

## Issues, Feature Request & Questions

Before submitting **issues**, **features requests**, or **questions**, please do a quick search in [Open Issues](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot/issues?q=is%3Aopen+is%3Aissue) to verify if it was already created. If there is an existing issue, add your comments to that one. 

### Writing Great Issues & Feature Requests

- Provide reproducible steps, what the result of the steps was, and what you expected to happen.
- Avoid listing multiple bugs or requests in the same issue. Always write a single bug or feature request per issue. 
- Avoid adding your issue as a comment to an existing one unless it's for the exact input. Issues can look similar, but have different causes.
- Add screenshots or animated GIFs.

### Submitting Issues 

1. Go to the [repository](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot) page, click on [New issue](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot/issues).
2. Select the **template**. Choose the one that fits to your case. 
   1. Bug
   2. Documentation Bug
   3. Feature request
   4. Question
3. Fill the issue template. Remember to follow the best practices to write Issues and Feature requests.



## Develop Guidelines

### Branching Model

- **Main**: Accepts merges from Features/Issues and Hotfixes
- **Features/Issues**: Always branch off from Main
  
  - Prefix: action/* e.g.: `add/new-command`, `fix/birthday-message-issue`
  
    >  Actions available: `add`, `update`, `fix`, and `remove`
    
- **Hotfix**: Always branch off from Main
  
  - Prefix: hotfix/* e.g.: `hotfix/remove-duplicate-load-data`



### Contributing to Lambdas functions

If you are going to contribute to the lambdas functions, follow the next steps to deploy and test them:

1. Clone the repo

   ```
   git clone https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot.git
   ```

2. Go to the **birthday-bot** directory

   ```
   cd amazon-lex-happybirthday-bamboohr-slack-bot/birthday-bot
   ```

3. Install the dependencies

   ```
   npm install
   ```

4. Make your great contribution. Like updates, hotfix and enhancements. Please, remember to follow the [branching model](#branching-model)

5. Follow the next [guide](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot/blob/main/docs/serverless.md) to deploy to an AWS environment. We are using the [Serverless Framework](https://www.serverless.com/open-source/) to deploy the resources to AWS.

6. Test your work using the [AWS console](https://console.aws.amazon.com) portal.

#### Run Lambda Functions using Serverless Framework

Using  [Serverless Framework](https://www.serverless.com/open-source/) you are able to run an instance of the Lambda function from your computer without deploying it. 

1. In the **birthday-bot** directory, open a terminal.

2. Install the dependencies.

   ```
   npm install
   ```

3. Run the next command.

   ```
   serverless invoke local --function <FUNCTION_NAME>
   ```



### Contributing to Birthday Bot

**To make changes to the Amazon Lex Birthday Bot**

1. Import the Bot model, follow the steps provided [here](https://github.com/southworks/amazon-lex-happybirthday-bamboohr-slack-bot/blob/main/birthday-bot/README.md#import-amazon-lex-bot).
2. Make your changes ex: Update/Remove/Add intents, utterances, slot types, etc.
3. Save and build the Bot.
4. Select the bot, click on **Actions**. Then, **Export** the bot model.

When **exporting** a new version of the Amazon Lex Birthday Bot Model, please take into account:

- Avoid leaving keys or sensitive data, the file must only contain the Amazon Lex model. 
- Remove the AWS Lambda function information to let the user choose their own. 
  - For the **selectChannel** and **GetBirthdays** intents:.
    - Remove the **CodeHook** property. This property will have the URI to the AWS Lambda function. 
    - Change the **Type** from `CodeHook` to `ReturnIntent`.
- Export the latest version of the model.



### Submit contribution

Pull Requests are a great way to keep track of tasks, enhancements, and bugs for the projects. When we are writing them, we must think about how the rest of the team is going to read it? What kind of information we will place in it to make it easy to read and understand their changes?. Follow these practices to help you to write a great pull requests. 

#### Writing great pull requests

- Choose a descriptive title and add the context of the changes using brakes. 
  - ex: `[Serverless] Remove dynamo reference`, `[AWS Lex] add channel slot`
- If the pull request fixes an issue:
  - Add the name of the issue as the title. 
    - ex: ISSUE #003: `Use s3 instead of dynamoDB` ---> PR Title: `[ISSUE#003] use s3 instead of dynamoDB`
  - Add the number of the related issue at the beginning following the pull request template.
    - ex: `Fixes #003` 
- Provide all the information about the changes made in the pull request.
- Add screenshots or animated GIFs.
