const mongo = require('mongoose');

const riderSchema = mongo.Schema({
    PrivateName : {
        type: String
    } ,
    FamilyName : {
        type: String
    } ,
    Section : {
        type: String
    } ,
    RiderId : {
        type: String
    }
})

module.exports = mongo.model('Rider',riderSchema);


