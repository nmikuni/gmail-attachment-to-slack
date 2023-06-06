function main() {
    const EMAIL_TITLE = "YOUR_TITLE";
    const SLACK_CHANNEL_ID = "YOUR_CHANNEL_ID";
    const SLACK_TOKEN = "YOUR_TOKEN";
    const thread = getThread(EMAIL_TITLE);
    if (!thread) {
        Logger.log("no message");
        return;
    }
    const attachments = getAttachmentsFromEmail(thread);
    if (attachments.length == 0) {
        Logger.log("no attachment");
        return;
    }
    for (let i = 0; i < attachments.length; i++) {
        const attachment = attachments[i];
        const blob = attachment.copyBlob();
        uploadToSlack(blob, SLACK_CHANNEL_ID, SLACK_TOKEN);
    }
    thread.moveToArchive();
    return;
}
function getThread(emailTitle) {
    const query = 'in:inbox subject:"' + emailTitle + '"';
    const threads = GmailApp.search(query);
    if (threads.length == 0) {
        return false;
    }
    const thread = threads[0];
    return thread;
}
function getAttachmentsFromEmail(thread) {
    const messages = thread.getMessages();
    const message = messages[messages.length - 1];
    const attachments = message.getAttachments();
    return attachments;
}
function uploadToSlack(blob, slackChannelId, slackToken) {
    const url = "https://slack.com/api/files.upload";
    const options = {
        method: "post",
        headers: {
            Authorization: "Bearer " + slackToken
        },
        payload: {
            file: blob,
            filename: blob.getName(),
            channels: slackChannelId
        }
    };
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());
    if (!json.ok) {
        throw new Error("Error uploading file: " + json.error);
    }
    return true;
}
