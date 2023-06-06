# Gmail Attachment to Slack

This Google Apps Script-based project named `gmail-attachment-to-slack.gs` retrieves attachments from an email with a specified subject and sends them to a particular Slack channel. It uses the `files.upload` method of the Slack API.

## Setup

1.  Create a new Google Apps Script. 
    
2.  Paste the provided code into the Google Apps Script Editor.
    
3.  Create a Slack App and set it up to use the `files.upload` method. To do this, you will need to create a new Slack App, install the app in your workspace, add the `files:write` OAuth scope.
    
4.  After setting up the Slack App, retrieve the `SLACK_TOKEN` from the App setting page

5.  Invite the Slack App to the target Slack channel, then retrieve the `SLACK_CHANNEL_ID` from your Slack where you want to send the attachments.
    
5.  Replace the placeholders `YOUR_TITLE`, `YOUR_CHANNEL_ID`, and `YOUR_TOKEN` in the script with the desired email subject, Slack channel ID, and Slack token, respectively.
    

## Functionality

-   `main()`: The main function starts by defining constants for the email subject, Slack channel ID, and Slack token. It then calls the helper functions to get the email thread based on the subject, get attachments from the thread, 
    
-   `getThread(emailTitle)`: This function queries the Gmail API for an email thread with a specific subject and returns it.
    
-   `getAttachmentsFromEmail(thread)`: This function retrieves and returns attachments from the specified email thread.
    
-   `uploadToSlack(blob, slackChannelId, slackToken)`: This function uploads the given blob (attachment) to the specified Slack channel using the provided Slack token.
    

## Important Notes

Please note that the Slack App setup and the provided token should have the necessary permissions for uploading files. In addition, this script is designed to upload attachments from the most recent email in a thread.

## Error Handling

The script logs a message to the console if it doesn't find an email with the specified subject or if the email doesn't have any attachments. If there's an error while uploading a file to Slack, it throws an exception with the error.

## Final Words

Feel free to modify this script according to your needs. This is a basic script designed to demonstrate how you can integrate Google Apps Script with the Slack API to automate the process of sending email attachments to Slack.