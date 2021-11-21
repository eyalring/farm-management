require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth


function intializeCalendars() {

    const oAuth2ClientHorses1 = new OAuth2(
        process.env.HORSES1_CLIENT_ID,process.env.HORSES1_CLIENT_SECRET
      )
      oAuth2ClientHorses1.setCredentials({
        refresh_token: process.env.HORSES1_REFRESH_TOKEN,
      })
      const oAuth2ClientHorses2 = new OAuth2(
        process.env.HORSES2_CLIENT_ID,process.env.HORSES2_CLIENT_SECRET
      )
      oAuth2ClientHorses2.setCredentials({
        refresh_token: process.env.HORSES2_REFRESH_TOKEN,
      })
      const oAuth2ClientHorses = new OAuth2(
        process.env.HORSES_CLIENT_ID,process.env.HORSES_CLIENT_SECRET
      )
      oAuth2ClientHorses.setCredentials({
        refresh_token: process.env.HORSES_REFRESH_TOKEN,
      })
      

      const oAuth2ClientInstructors1 = new OAuth2(
        process.env.INSTRUCTORS1_CLIENT_ID,process.env.INSTRUCTORS1_CLIENT_SECRET
      )
      oAuth2ClientInstructors1.setCredentials({
        refresh_token: process.env.INSTRUCTORS1_REFRESH_TOKEN,
      })
      const oAuth2ClientInstructors2 = new OAuth2(
        process.env.INSTRUCTORS2_CLIENT_ID,process.env.INSTRUCTORS2_CLIENT_SECRET
      )
      oAuth2ClientInstructors2.setCredentials({
        refresh_token: process.env.INSTRUCTORS2_REFRESH_TOKEN,
      })
      const oAuth2ClientInstructors = new OAuth2(
        process.env.INSTRUCTORS_CLIENT_ID,process.env.INSTRUCTORS_CLIENT_SECRET
      )
      oAuth2ClientInstructors.setCredentials({
        refresh_token: process.env.INSTRUCTORS_REFRESH_TOKEN,
      })
      



    // Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2ClientHorses })
const calendar1 = google.calendar({ version: 'v3', auth: oAuth2ClientHorses1 })
const calendar2 = google.calendar({ version: 'v3', auth: oAuth2ClientHorses2 })
const calendar3 = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors })
const calendar4 = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors1 })
const calendar5 = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors2 })

const calendars = new Array();
calendars.push(calendar);
calendars.push(calendar1);
calendars.push(calendar2);
calendars.push(calendar3);
calendars.push(calendar4);
calendars.push(calendar5);

console.log(' i have in total number of calendars : ',calendars.length)
return calendars;
}

module.exports={intializeCalendars};