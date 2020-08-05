const getBirthdays = require('./getBirthdays');

async function sendPostReq(text, channel, url, authToken) {
    const fetch = require("node-fetch")

    await fetch(url, {
        method: "post",
        body: JSON.stringify({
            "text": text,
            "channel": channel
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    })
}

let birthdayMessage = getBirthdays.getBirthdays()
let url = "https://slack.com/api/chat.postMessage"
let channel = getChannel()

const getChannel = () => {
    // get channel from DynamoDB
}

// sendPostReq(birthdayMessage, "gnalog-team", "https://slack.com/api/chat.postMessage")