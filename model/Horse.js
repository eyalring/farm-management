const mongo = require('mongoose');

const horseSchema = mongo.Schema({
    HorseId : {
        type: String , 
        required : true
    },
    HorseDec : {
        type: String , 
        required : true
    } ,
    Active : {
        type : String ,
        required : true
    } ,
    species : {
        type: String
    } ,
    Race : {
        type: String
    } ,
    Remark : {
        type: String
    } ,
    Owner : {
        type: String
    } ,
    ForRiding : {
        type: String
    } ,
    DateofBirth : {
        type: String
    } ,
    SumHourAllowd : {
        type: String
    } ,
    ForRiderType : {
        type: String
    } ,
    Category : {
        type: String
    } ,
    pension : {
        type: String
    } ,
    HorseValue : {
        type: String
    } ,
    MonthlyAutoCharge : {
        type: String
    } ,
    InsuranceDesc : {
        type: String
    } ,
    InsuranceDateFrom : {
        type: String
    } ,
    InsuranceDateTill : {
        type: String
    } ,
    hView : {
        type: String
    }
})

module.exports = mongo.model('Horse',horseSchema);