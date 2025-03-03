const express = require("express");
const cors = require("cors");
require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');  // Import the promise-based setTimeout
const port = 3000;
const app = express();
const audioUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"; // This audio will be played automatically in meeting.

//We use Stealth Plugin to get extra protection against bot detection
puppeteer.use(StealthPlugin());


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
}));

// Middleware to parse JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//This function validates weather a link is of google meet or not.
function isValidGoogleMeetLink(link) {
    const meetRegex = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/;
    return meetRegex.test(link);
}

app.post("/joinMeeting", async (req, res) => {
    console.log(req.body);
    
    const url = req.body.url;
    if (!isValidGoogleMeetLink(url)) {
        return res.status(400).send("Not a Valid Link");
    }

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';

    // This will Launch the browser instance
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        headless: false,
        args: ['--use-fake-ui-for-media-stream',
            "--auto-select-tab-sharing-source=1",
        ]
    });
    const page = await browser.newPage();

    //This will give extra protection against bot detection
    await page.setUserAgent(userAgent);
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
    });

    try {
        // Login to your Google Account

        await page.goto('https://accounts.google.com/signin', { waitUntil: 'load', timeout: 90000 });
        await page.waitForSelector('input[type="email"]')
        await page.click('input[type="email"]')
        await page.type('input[type="email"]', process.env.EMAIL);
        await page.waitForSelector('#identifierNext');
        await setTimeout(2000);
        await page.click('#identifierNext');
        await setTimeout(2000);
        await page.waitForSelector('input[type="password"]')
        await setTimeout(2000);
        await setTimeout(2000);
        await page.type('input[type="password"]', process.env.PASSWORD)
        await setTimeout(4000);
        await page.waitForSelector('#passwordNext')
        await setTimeout(2000);
        await page.click('#passwordNext')
        await setTimeout(5000);


        //Go to the Google Meet page
        await page.goto(url, { waitUntil: 'load', timeout: 90000 });

        // Bypass camera/microphone permissions
        const context = browser.defaultBrowserContext();
        await context.overridePermissions(url, ['microphone', 'camera']);

        //Code to select realtec speaker
        // Wait for the speaker settings dropdown container to load
        await page.waitForSelector('.VfPpkd-RLmnJb', { timeout: 15000 });

        // Get all dropdown elements and select the second one
        const speakerDivs = await page.$$('.VfPpkd-RLmnJb');
        if (speakerDivs.length < 2) {
            console.error("Could not find the second speaker settings div.");
            return;
        }

        const speakerDropdown = speakerDivs[1]; // Selecting the second one
        await speakerDropdown.click();
        console.log("speaker selection menu os opened");
        
        // Wait for the dropdown options to appear
        await page.waitForSelector('.VfPpkd-StrnGf-rymPhb', { timeout: 5000 });
        await setTimeout(2000);
        
        // Find all available options in the dropdown
        const options = await page.$$('.VfPpkd-StrnGf-rymPhb');
        await setTimeout(1000);

        if (options.length < 2) {
            console.error("Speaker options not found!");
            return;
        }

        // Click the second option (which is "Speakers / Headphones (Realtek Audio)")
        await options[1].click(); // Selecting the 2nd option
        console.log("Selected 'Speakers / Headphones (Realtek Audio)'");

        // Wait briefly to ensure the setting is applied
        await setTimeout(5000);


        //Turn off the camera
        // Wait for the parent div with class "utiQxe"
        await page.waitForSelector('.utiQxe', { timeout: 10000 });
        const parentDiv = await page.$('.utiQxe');

        if (!parentDiv) {
            console.error(" Parent div (.utiQxe) not found!");
            return;
        }

        // Find the first child div inside it
        const childDiv = await parentDiv.$('div'); // Selects the first child div inside

        if (!childDiv) {
            console.error(" No child div found inside .utiQxe!");
            return;
        }

        // Click the child div
        await childDiv.click();
        console.log("Camera is turned off");
        await setTimeout(2000);


        //Click Join Now Button
        const buttonSelector = '.UywwFc-LgbsSe.UywwFc-LgbsSe-OWXEXe-dgl2Hf.UywwFc-StrnGf-YYd4I-VtOx3e.tusd3.IyLmn.QJgqC';
        const button = await page.waitForSelector(buttonSelector);
        await setTimeout(5000);
        await button.click();
        await setTimeout(5000);


        // Now we will play audio and it will sent as microphone input
        const audioPage = await browser.newPage();
        await audioPage.goto(audioUrl, { waitUntil: "load" });
        console.log("Audio page opened.");

        // Create an audio element and store it in the page context
        await audioPage.evaluate(() => {
            window.audioElement = new Audio(document.location.href);
            window.audioElement.play().catch(e => console.error(" Audio autoplay failed:", e));
        });
        console.log("Audio is be playing now.");

        // Function to replay the audio whenever you want
        async function replayAudio() {
            await audioPage.evaluate(() => {
                if (window.audioElement) {
                    window.audioElement.currentTime = 0; // Reset to start
                    window.audioElement.play().catch(e => console.error(" Audio replay failed:", e));
                }
            });
            console.log("Audio replayed.");
        }
        await setTimeout(6000);
        await replayAudio();
        await setTimeout(6000);
        await replayAudio();
        await setTimeout(6000);
        await replayAudio();
        await setTimeout(6000);
        await replayAudio();
        await setTimeout(3000);

    } catch (error) {
        console.error(`Error fetching page content: ${error.message}`);
        res.status(500).send("Failed to Join the meeting");
    } finally {
        // Close the browser
        await browser.close();
        await console.log("Browser Closed");
        res.status(200).send("Meeting Done Sucsessfully");

    }
});

app.listen(port, () => {
    console.log(`App is live at port no:${port}.`);
})