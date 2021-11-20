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

const res = addPermission();


async function addPermission(){
    const res = await calendar.acl.insert({
        calendarId: 'fjlap2ugktcbs2mlhsr0a03k5s@group.calendar.google.com',
        requestBody: {
             "etag": "my_etag",
             "kind": "calendar#aclRule",
             "role": "owner",
             "scope": {
                 "type": "user",
                 "value": "nachshonim.myhorses0@gmail.com"
             }
        },
      });
      console.log(res.data);
}

