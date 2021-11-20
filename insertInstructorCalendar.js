require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth

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


const mongo = require('mongoose');
const { createCollection } = require('./model/Instructor');
const Instructor = require('./model/Instructor');

mongo.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
  console.log('connected to DB!')
})
// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors })
const calendar1 = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors1 })
const calendar2 = google.calendar({ version: 'v3', auth: oAuth2ClientInstructors2 })

const calendars = new Array();
calendars.push(calendar);
calendars.push(calendar1);
calendars.push(calendar2);

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

async function getActiveInstructor(activeInstructorChunk,calendarNumber,) {
  console.log('the chunk is ' ,activeInstructorChunk);
  console.log('the number is ' ,calendarNumber);
  try {
      for (var i = 0; i < activeInstructorChunk.length; i++){        
          console.log('trying to go to sleep for a moment',activeInstructorChunk[i]);
          var waitTill = new Date(new Date().getTime() + 4 * 1000);
          while(waitTill > new Date()){} ;
          const response = insert_calendar(activeInstructorChunk[i],calendarNumber)     
      }    
  } catch (err) {
    console.log('could not get the horse list ', err);
  }
}


function getNumberOfRecordsPerAccount(){
  const res = Instructor.find().exec((error,response) =>{
    var activeInstructor = new Array();
    for (const instructor of response){
      if(instructor.Active==1){
       console.log('the instructor is active : ',instructor.FirstName) ;
       activeInstructor.push(instructor.FirstName)
      }
    }
    console.log(activeInstructor);
    const pagingSize = Math.floor(activeInstructor.length/3) + 1;
    
    const activeInstructor0 = activeInstructor.slice(0,pagingSize);
    const activeInstructor1 = activeInstructor.slice(pagingSize,pagingSize*2);
    const activeInstructor2 = activeInstructor.slice(pagingSize*2);


    console.log('activeInstructor0',activeInstructor0);
    console.log('activeInstructor1',activeInstructor1);
    console.log('activeInstructor2',activeInstructor2);
    
    const res = getActiveInstructor(activeInstructor0,0);
    const res1 = getActiveInstructor(activeInstructor1,1);
    const res2 = getActiveInstructor(activeInstructor2,2);

  });
  
}