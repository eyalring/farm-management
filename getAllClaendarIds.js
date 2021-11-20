require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth

const oAuth2ClientHorses = new OAuth2(
  process.env.HORSES_CLIENT_ID,process.env.HORSES_CLIENT_SECRET
)
oAuth2ClientHorses.setCredentials({
  refresh_token: process.env.HORSES_REFRESH_TOKEN,
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2ClientHorses })

const res = getAllCalendarIds();


async function getAllCalendarIds(){
    const res = await calendar.calendarList.list({
      });
      console.log(res.data);
}

