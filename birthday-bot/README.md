## Bot Setup Steps

### Prerequisites

- [AWS Account](https://aws.amazon.com/account/)

- Setup [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/intro/) to deploy the bot resources. You can configure it following this [guide](../docs/serverless.md)

- [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7)

### Import Amazon Lex Bot

> You need to setup and deploy the resources using [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/intro/) before configure the AWS Lex service. You can configure it following this [guide](../docs/serverless.md)

1. Got to the **models** directory, open a PowerShell terminal and run the next command.

   ```powershell
   Compress-Archive -Path . -DestinationPath ./BirthdayBot_Model.zip
   ```

2. Open the [Amazon Lex console](https://console.aws.amazon.com/lex/), click on **cancel** to avoid the bot creation wizard.

3. On the **Bots** page, choose **Action**, select **Import**.

4. In the **Import Bot** dialog, browse to the **models** directory, select the **BirthdayBot_Model.zip** and click on **import**.

   <img alt="import-bot" src="../docs/images/import-bot.png" style="float:left; width:60%">

   (Optional) In case you already have a resource with the same name, you will see a confirmation dialog to **overwrite** it. Be careful and check twice before clicking on **overwrite and continue**.

   <img alt="overwrite-resource" src="../docs/images/overwrite-bot.png" style="float:left; width:60%">

5. Open the **BirthdayBot**, for the **GetBirthdays** and **SelectChannel** intents.

   1. In the **Fulfillment** section, choose the **Lambda function** related to the **Intent** and Accept the **Add permission to Lambda Function** dialog. Make sure you have selected the Latest version of the function.

      Lambdas functions will have a name related with the intent

      Intent: **GetBirthdays** => Lambda function: **birthday-bot-dev-getBirthdays**

      Intent: **selectChannel** => Lambda function: **birthday-bot-dev-configChannel**

      <img alt="select-lambda-fulfillment" src="../docs/images/select-lambda-fulfillment.png" style="float: left; width:60%">

   2. Click on **Save Intent**

6. On the up right corner, Click on **Build**. Then, click on **Test Chatbot** to test the bot.

   <img alt="build-and-test" src="../docs/images/build-and-test.png" style="float: left; width:60%">

7. On the up right corner, Click on **Publish**, enter the alias and publish the bot.

   <img alt="publish-bot" src="../docs/images/publish-bot.png" style="float:left; width:60%" >

### Connect with Slack

In order to link our bot to Slack, we have to create an application on the Slack side

1. Go to [create a Slack application](https://api.slack.com/apps) channel, and create a new slack application.

   <img alt="create-slack-app" src="../docs/images/create-slack-app.png" style="float: left">

2. In the **Basic Information** page. Record the following **App Credentials:**

   - Client ID
   - Client Secret
   - Verification Token

3. Open the [Amazon Lex console](https://console.aws.amazon.com/lex/), click on your **BirthdayBot**.

4. Go to **Channels**, select **Slack** and provide the following information. Then, click on **Activate**

   - **Channel Name**: Type name for the channel
   - **Channel Description**: Type description for the channel
   - **KMS key**: select default, `aws/lex`
   - **Alias**: Bot alias create when publish the bot
   - **Client Id**: Recorded from Slack
   - **Client secret**: Recorded from Slack
   - **Verification Token**: Recorded from Slack

   The console will create the bot channel association and returns the **Postback URL** and **OAuth** URLs.

   <img alt="activate-channel" src="../docs/images/activate-channel.png" style="float:left; width:60%">

   Record them in order to update your **Slack application** configuration to use these endpoints as follows:

   - The **Postback URL** is the Amazon Lex bot's endpoint that listens to Slack events. You use this URL:

     - As the request URL in the **Event Subscriptions** feature of the Slack application.
     - To replace the placeholder value for the request URL in the **Interactive Messages** feature of the Slack application.

   - The **OAuth URL** is your Amazon Lex bot's endpoint for an OAuth handshake with Slack.

5. Go back to the [Slack API console](https://api.slack.com/apps) and choose the app previously created on **step 1**.

6. In the left menu, choose **OAuth & Permissions**.

7. In the **Redirect URLs** section, add the **OAuth URL** that Amazon Lex provided in the previous step, click on **Add**. Then **Save URLs**

   <img alt="add-urls" src="../docs/images/add-urls.png" style="float:left; width:60%">

8. In the **Scopes** section, click on **Add an OAuth Scope** button, add the next permissions:

   - `chat:write`
   - `groups:read`
   - `im:history`
   - `incoming-webhook`
   - `team:read`
   - `users:read`
   - `users:read.email`

   <img alt="add-scopes" src="../docs/images/add-scopes.png" style="float: left">

9. In the left menu, choose **Interactivity & Shortcuts**.

   1. Turn Interactivity **On**
   2. Enter the **Postback URL** that you saved in step 4.
   3. Then, click on **Save Changes**

      <img alt="save-interactive-changes" src="../docs/images/save-interactive-changes.png" style="width:60%; float:left">

10. In the left menu, choose **Event Subscriptions**.

    1. Turn the **Enable Events** On

    2. Set the **Request URL** value to the Postback URL that Amazon Lex provided in the step 4.

    3. In the **Subscribe to workspace events** section, subscribe to the `message.im` bot event to enable direct messaging between the end user and the Slack bot.

    4. Click on **Save Changes**

       <img alt="subscribe-events" src="../docs/images/subscribe-events.png" style="float:left; width:60%">

11. In the left menu, choose **Manage Distribution**, click on **Add to Slack** to install the application. Authorize the bot to respond to messages.

12. In slack app go to **Direct Messages** section, choose your bot and send messages related to the configured intents.

### Further reading

- [Create AWS Lex custom bot](https://docs.aws.amazon.com/lex/latest/dg/getting-started-ex2.html)
- [AWS Lex bot and Slack integration](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html)
