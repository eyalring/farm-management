const mongo = require('mongoose');

const rideSchema = mongo.Schema({
    UnitsNumbers : {
        type: String , 
        required : true
    },
    TypeForBookkeeping : {
        type: String , 
    } ,
    trnrPayPrecent : {
        type : Boolean ,
        required : true
    } ,

    ReportedDate : {
        type : Boolean ,
        required : true
    } ,
    SecondTrainer : {
        type : Boolean ,
        required : true
    } ,
    DateofComp : {
        type : Boolean ,
        required : true
    } ,
    forComp : {
        type : Boolean ,
        required : true
    } ,
    fundingWay : {
        type : Boolean ,
        required : true
    } ,

    trnrPay : {
        type: String
    } ,
    financeInvoice2 : {
        type: String
    } ,
    financPrecent2 : {
        type: String
    } ,
    financier2 : {
        type: String
    } ,
    financeInvoice : {
        type: String
    } ,
    financPrecent : {
        type: String
    } ,
    financier : {
        type: String
    } ,
    OrderNo : {
        type: String
    } ,
    invoice : {
        type: String
    } ,
    User : {
        type: String
    } ,

   LastUpdate : {
        type: String
    } ,
    Sector : {
        type: String
    } ,
    Tmoney : {
        type: String
    } ,
    payStatus : {
        type: String
    },
    TypeofLesson : {
        type: String
    } ,
    Section : {
        type: String
    } ,

    TypeofRiders : {
        type: String
    } ,
    HorseId : {
        type: String
    } ,
    NumberOfHorses : {
        type: String
    } ,
    NumberofRiders : {
        type: String
    } ,
    OrgDeptId : {
        type: String
    } ,
    OrgId : {
        type: String
    } ,
    RiderId : {
        type: String
    } ,
    HourofRide : {
        type: String
    } ,
    WorkerId : {
        type: String
    } ,
    DayofRide : {
        type: String
    } ,
    RecordId : {
        type: String
    }
})

module.exports = mongo.model('Ride',rideSchema);


