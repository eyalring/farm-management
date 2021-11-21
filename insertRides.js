require('dotenv/config');
const { google } = require('googleapis')
const { OAuth2 } = google.auth


const mongo = require('mongoose');
const Horse = require('./model/Horse');
const Instructor = require('./model/Instructor');
const { createCollection } = require('./model/ride');
const Ride = require('./model/ride');
const Rider = require('./model/rider');

mongo.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
  console.log('connected to DB!')
})

const numberOfRecords = getRides();


async function getRides(){
  console.log('getting all riders');
  const riders = await Rider.find();
  const ridersMap = new Map(riders.map(i => [i.RiderId, i.PrivateName]));
  console.log('found ' + ridersMap.size + ' riders');
  console.log('getting all horses');
  const horses = await Horse.find();
  const horsesMap = new Map(horses.map(i => [i.HorseId, i.HorseDec]));
  console.log('found ' + horses.length + ' horses');
  console.log('getting all instructors');
  const instructors = await Instructor.find()
  const instructorsMap = new Map(instructors.map(i => [i.WorkerID, i.FirstName]));
  console.log('found ' + instructors.length + ' instructors');
  const res = await Ride.find({DayofRide:{$regex: /^11.*2021 0:00:00$/}})
  console.log('found ' + res.length + ' entries in november');

  for(const ride of res){
    console.log('the instructor ' +convertInstructorToName(ride.WorkerId,instructorsMap) +
     ' leads the rider :'+ convertRiderToName(ride.RiderId,ridersMap) + 
     ' with horse name : ' + convertHorseIdToName(ride.HorseId,horsesMap));
  } 
}

function convertInstructorToName(WorkerId,instructorsMap){
  if(instructorsMap.get(WorkerId)){
    return instructorsMap.get(WorkerId);
  }else{
    console.log('Workder id is undefined',WorkerId);
  }
}

function convertRiderToName(RiderId,ridersMap){
  return ridersMap.get(RiderId);
}

function convertHorseIdToName(HorseId,horsesMap){
  if(horsesMap.get(HorseId)){
    return horsesMap.get(HorseId);
  }else{
    console.log('HorseId id is undefined',HorseId);
  }
}


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


