require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth

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
const oAuth2ClientHorses3 = new OAuth2(
  process.env.HORSES3_CLIENT_ID,process.env.HORSES3_CLIENT_SECRET
)
oAuth2ClientHorses3.setCredentials({
  refresh_token: process.env.HORSES3_REFRESH_TOKEN,
})
const oAuth2ClientHorses = new OAuth2(
  process.env.HORSES_CLIENT_ID,process.env.HORSES_CLIENT_SECRET
)
oAuth2ClientHorses.setCredentials({
  refresh_token: process.env.HORSES_REFRESH_TOKEN,
})


const mongo = require('mongoose');
const { createCollection } = require('./model/Horse');
const Horse = require('./model/Horse');

mongo.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
  console.log('connected to DB!')
})
// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2ClientHorses })
const calendar1 = google.calendar({ version: 'v3', auth: oAuth2ClientHorses1 })
const calendar2 = google.calendar({ version: 'v3', auth: oAuth2ClientHorses2 })
const calendar3 = google.calendar({ version: 'v3', auth: oAuth2ClientHorses3 })

const calendars = new Array();
calendars.push(calendar);
calendars.push(calendar1);
calendars.push(calendar2);
calendars.push(calendar3);

const numberOfRecords = getNumberOfRecordsPerAccount();


async function insert_calendar(activeHorse,calendarNumber) {
  try {
    console.log('inserting a horse',activeHorse);
    const res = await calendars[calendarNumber].calendars.insert({
      requestBody: {
        "summary": activeHorse
      }
    });
  } catch (error) {
    console.log('could not create calendar , the error is : ', error);
  }
}

async function getActiveHorses(activeHorsesChunk,calendarNumber,) {
  console.log('the chunk is ' ,activeHorsesChunk);
  console.log('the number is ' ,calendarNumber);
  try {
      for (var i = 0; i < activeHorsesChunk.length; i++){        
          console.log('trying to go to sleep for a moment',activeHorsesChunk[i]);
          var waitTill = new Date(new Date().getTime() + 4 * 1000);
          while(waitTill > new Date()){} ;
          const response = insert_calendar(activeHorsesChunk[i],calendarNumber)     
      }    
  } catch (err) {
    console.log('could not get the horse list ', err);
  }
}


function getNumberOfRecordsPerAccount(){
  const res = Horse.find().exec((error,response) =>{
    var activeHorses = new Array();
    for (const horse of response){
      if(horse.Active==1){
       console.log('the horse is active : ',horse.HorseDec) ;
       activeHorses.push(horse.HorseDec)
      }
    }
    console.log(activeHorses);
    const pagingSize = Math.floor(activeHorses.length/3) + 1;
    
    const activeHorses0 = activeHorses.slice(0,pagingSize);
    const activeHorses1 = activeHorses.slice(pagingSize,pagingSize*2);
    const activeHorses2 = activeHorses.slice(pagingSize*2);


    console.log('activeHorses0',activeHorses0);
    console.log('activeHorses1',activeHorses1);
    console.log('activeHorses2',activeHorses2);
    
    const res = getActiveHorses(activeHorses0,0);
    const res1 = getActiveHorses(activeHorses1,1);
    const res2 = getActiveHorses(activeHorses2,2);

  });
  
}