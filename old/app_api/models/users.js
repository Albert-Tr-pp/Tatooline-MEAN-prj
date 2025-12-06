// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');

// ----------------------------- NODE-PASSPORT -----------------------------
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
email: {type: String, required:true, unique:true},
username : {type: String, unique: true, required:true},
});

UserSchema.plugin(passportLocalMongoose);


// ----------------------------- userSchema -----------------------------
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

// ----------------------------- EXPORTS -----------------------------
module.exports = mongoose.model('User', userSchema);