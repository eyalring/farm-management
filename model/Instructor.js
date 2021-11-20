const mongo = require('mongoose');

const instructorSchema = mongo.Schema({
    WorkerID : {
        type: String , 
        required : true
    },
    DepartmetId : {
        type: String , 
    } ,
    Active : {
        type : Boolean ,
        required : true
    } ,
    InsuranceID : {
        type: String
    } ,
    IDNmber : {
        type: String
    } ,
    FirstName : {
        type: String
    } ,
    MiddelName : {
        type: String
    } ,
    FamilyName : {
        type: String
    } ,
    Duty : {
        type: String
    } ,
    Email : {
        type: String
    } ,
    Address : {
        type: String
    } ,
    City : {
        type: String
    } ,
    ZipCode : {
        type: String
    } ,
    Country : {
        type: String
    } ,
    PhonHome : {
        type: String
    } ,
    PhonWork : {
        type: String
    } ,
    MobilePhon : {
        type: String
    },
    PicLocation : {
        type: String
    } ,
    Graduation : {
        type: String
    } ,
    SaleryCode : {
        type: String
    } ,
    Remark : {
        type: String
    } ,
    EmergncyPhon : {
        type: String
    } ,
    EmergencyPerson : {
        type: String
    } ,
    MateName : {
        type: String
    } ,
    AdInchargeCodedress : {
        type: String
    } ,
    deduction : {
        type: String
    } ,
    DebitRate : {
        type: String
    } ,
    Salary : {
        type: String
    } ,
    StartJobDate : {
        type: String
    } ,
    BirthDay : {
        type: String
    }
})

module.exports = mongo.model('Instructor',instructorSchema);



BirthDay
:""
StartJobDate
:"2/16/2012 0:00:00"
Salary
:""
DebitRate
:""
deduction
:""
InchargeCode
:""
MateName
:""
EmergencyPerson
:""
EmergncyPhon
:""
Remark
:""
Active
:0
SaleryCode
:0
Graduation
:1
PicLocation
:""