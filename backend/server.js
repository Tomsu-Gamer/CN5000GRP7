// const express = require('express');
// const mongoose = require('mongoose');
import express from 'express';
import mongoose from 'mongoose';
const DATABASE_URL = "mongodb+srv://merilesh:CN5000GRP7@cn5000.clkrsmk.mongodb.net/football";
import cors from 'cors';

//requiring the model.js file for post, update and deletion of data in databse
// const Model = require('./models/model');
import Model from './models/model.js';



const mongoString = DATABASE_URL;


//connect the mongodb database using mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;


//this code basically means it will connect to the database and throw any error if the connection fails
database.on('error', (error) => {
    console.log(error)
})


//this code means it will run only one time ,if it is succesfull it will run and show dataBase connected
database.once('connected', () => {
    console.log('Database connected');
})

//creating a new constant app express
const app = express();
app.use(express.json());
app.use(cors())

//listen on port 3000
app.listen(4000, () => {
    console.log('Server started at ${4000}')
})



//default get path
app.get('/', (req, res) => {
    res.send("hello from express")
})

//Query to add data to the football collection
app.post('/post', async (req, res) => {
    const data = new Model({
        Team: req.body.Team,
        GamesPlayed: req.body.GamesPlayed,
        Win: req.body.Win,
        Draw: req.body.Draw,
        Loss: req.body.Loss,
        GoalsFor: req.body.GoalsFor,
        GoalsAgainst: req.body.GoalsAgainst,
        Points: req.body.Points,
        Year: req.body.Year
    })
    //in the try block we save the data in our mongodb database using data.save() and storing the saved data into a constant
    try {
        const dataToSave = await data.save();//this function takes more time so add await
        res.status(200).json(dataToSave);
        //in the catch block we catch the error if we recieve any
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//getting all the data from database 2.0 and finding the average goals for given year
app.get('/getAll/year/:year', async (req, res) => {
    try {
        //model.find() method fetches all the data from the database
        const yr = req.params.year
        const data = await Model.find();

        const yearData = await Model.find({ Year: yr })
        var totalGoalsFor = 0, len = yearData.length
        for (let i = 0; i < yearData.length; i++) {
            totalGoalsFor += yearData[i].GoalsFor
        }
        const average = totalGoalsFor / len
        console.log(Math.floor(average))
        // res.write(JSON.stringify(data))
        // res.write(JSON.stringify(average))
        // res.end()
        res.send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get data based on the id
app.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Query to update team records based on the name and year it played on 
app.patch('/update/team/:name/year/:year', async (req, res) => {
    try {
        const tName = req.params.name
        const yr = req.params.year

        const data = await Model.find({ Team: tName, Year: { $eq: yr } }).exec();

        const updatedData = req.body;
        const options = { new: true };//returns the value after update

        const result = await Model.findOneAndUpdate(data.Team, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

//deleting data based on the id
app.delete('/delete/team/:team/year/:year', async (req, res) => {
    try {
        const tName = req.params.team;
        const yr = req.params.year;
        const deletedData = await Model.findOneAndDelete({ Team: tName, Year: yr })
        // res.send(deletedData)
        res.send(deletedData.Team + " played on year " + deletedData.Year + " has been deleted")
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//get method for showing the total games played draw and won for a given year
app.get('/total/year/:year', async (req, res) => {

    try {
        const yr = req.params.year;
        //finds the data for a given year
        const data = await Model.find({ Year: yr })
        // console.log(data.length)
        // console.log(isNaN(data[0].Win))
        var totalGamesPlayed = 0
        var totalDraw = 0
        var totalWin = 0
        console.log(data[0].GamesPlayed)

        for (let i = 0; i < data.length; i++) {
            totalGamesPlayed += data[i].GamesPlayed
            totalDraw += data[i].Draw
            totalWin += data[i].Win
        }

        //debug check 
        console.log(totalGamesPlayed + ' ' + totalDraw + ' ' + totalWin)

        res.send({ totalPlay: totalGamesPlayed, Draw: totalDraw, Win: totalWin })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

app.get('/records/value/:value', async (req, res) => {
    try {
        const userInput = req.params.value
        const data = await Model.find().limit(10)//returns a maximum of 10 documents
        // res.send(data);
        const dataYear = await Model.find({ Win: { $gt: userInput } }).exec()

        if (dataYear.length == 0) {
            res.send('No team has won ' + userInput + ' times')
        } else {
            console.log(dataYear.length)//debug check
            res.send(dataYear)
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})