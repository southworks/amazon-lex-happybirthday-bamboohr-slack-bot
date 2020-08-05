exports.proactive = (event, context, callback) => {
  const fetch = require("node-fetch");

  let authToken = process.env.supersecret;
  
  let message = "Birthday msg from Lamda - Triggered by Cron";
  let url = "https://slack.com/api/chat.postMessage";
  const getChannel = () => {
    return "project-gnalog";
  };
  let channel = getChannel();
  
  fetch(url, {
      method: "post",
      body: JSON.stringify({
          text: message,
          channel: channel
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
  });
};

