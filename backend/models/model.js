// const mongoose = require('mongoose');
import mongoose from 'mongoose';

//this schema defines our database structure
const dataSchema = new mongoose.Schema({
    Team: {
        type: String
    },
    GamesPlayed: {
        type: Number
    },
    Win: {
        type: Number
    },
    Draw: {
        type: Number
    },
    Loss: {
        type: Number
    },
    GoalsFor: {
        type: Number
    },
    GoalsAgainst: {
        type: Number
    },
    Points: {
        type: Number
    },
    Year: {
        type: Number
    }
})

//converting our dataSchema into a model 
//first parameter 'Data' refers to modelName
//second parameter is the schema for that data model
export default mongoose.model("Model", dataSchema, "datas")

