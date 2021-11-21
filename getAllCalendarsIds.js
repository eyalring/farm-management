require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const initCalendars = require('./initCalendars');

const calendars = initCalendars.intializeCalendars();
var calendarIds = new Array();

const response = get();

async function get(){
    const res =  await getAllCalendarIds()
   // console.log('res is',res)
    const res2 = await addPermission(res);
}


async function addPermission(res){
    console.log(res)
    console.log('i reaches hereeee')
   


    console.log('res 0 ',res[0].id)


  
    for (const calendar of res){
        console.log('calendar is :', calendar)
        console.log(typeof(calendar));
  
      const res = await (calendar.cal).acl.insert({
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
 


 async function getAllCalendarIds() {
  var res = null;
  var calendarIds = new Array();
    for (const calendar of calendars) {
        console.log('looping................')
     res = await calendar.calendarList.list({});
     if(res){
         for(item of res.data.items){
             if(item.id.toString().includes("group.calendar.google.com")){
                calendarIds.push({cal:calendar ,
                                   id: item.id});
             }
         }
       
     }
  }

  console.log('the type of claendarids',typeof(calendarIds))
 return  calendarIds;
}

module.exports = {get};