# Google Meet Bot

## Introduction
This is a bot that can automatically join Google Meet meetings and get transcription of the meeting. It provides an automated way to participate in meetings without manual intervention. The bot consists of a client-side interface and a server to manage the meeting joining and to get meeting transcription.

## Features
- Automatically joins Google Meet meetings.
- Gets Transcription of the meeting.
- Easy-to-use web-based interface.
- Works with VB Virtual Cable for audio management.

## Setup Guide
Follow these steps to set up and run the bot on your system.

### 1. Install VB Virtual Cable
VB Virtual Cable is required to manage the bot's audio input and output.
- Download and install **VB Virtual Cable** from [VB-Audio](https://vb-audio.com/Cable/).
- After installation, set **CABLE Output(VB-Audio Virtual Cable)** as your **default input** and **CABLE In 16ch(VB-Audio Virtual Cable)** as your **default output** in your system sound settings.

### 2. Setup and Run the Client
The client is responsible for providing a user interface to configure the bot.
```bash
cd client
npm install
npm run dev
```
This will start the frontend development server.

### 3. Setup and Run the Server
The server handles meeting joining and getting transcription.
```bash
cd server
npm install
npm run dev
```
This will start the backend server.

### 4. Set your Google Account 
Set your Google Account Email and Password in App.js file.

### 5. Set the Time of Transcription
In the app.js files startRecording function set the first number of setTimeout to the minutes to which you want the transcription of meeting. e.g if you want transcription of 5 mins of meeting you can set
```
await setTimeout(5 * 60000);
```
By default it is set to 1 minute for testing purpose. you an set it to any number but don't set it greater than 30 minutes because maximum api web socket session is 30 minutes.

### 6. Open Port 5173
To access the web interface, ensure **port 5173** is open. You can then use the application in your browser.

## Usage
1. Open the web interface.
2. Enter the Google Meet link.
3. Configure audio settings.
4. Start the bot to join and get transcription of the meeting.

## Troubleshooting
- If the bot does not play audio, verify that **VB Virtual Cable** is set as the default input/output.
- If the UI does not load, check if **port 5173** is open.
- Ensure all dependencies are installed properly using `npm install` in both `client` and `server` directories.

## Contributing
Feel free to submit pull requests for improvements or report issues in the repository.

