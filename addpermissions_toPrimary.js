require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const initPermission = require('./initCalendars');
const allCalendarsIds = require('./getAllCalendarsIds');


const response = run();

async function run(){
  const calendarsIds = await allCalendarsIds.get();
  console.log('in add permssion : ' , typeof(calendarsIds));
  const res = addPermission(calendarsIds);

}



async function addPermission(calendarsIds){
  console.log('i reaches hereeee')

  for (const calendar in calendarsIds){

    const res = await calendar.cal.acl.insert({
        calendarId: calendar.id,
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
}

