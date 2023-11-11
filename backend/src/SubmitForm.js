import React, { Component, useState } from 'react';
import axios from "axios";
import './index.css'
import { render } from 'react-dom'

function SubmitForm() {
    const [Team, setTeam] = useState('')
    const [GamesPlayed, setGamesPlayed] = useState('')
    const [Win, setWin] = useState('')
    const [Draw, setDraw] = useState('')
    const [Loss, setLoss] = useState('')
    const [GoalsFor, setGoalsFor] = useState('')
    const [GoalsAgainst, setGoalsAgainst] = useState('')
    const [Points, setPoints] = useState('')
    const [Year, setYear] = useState('')
    const [isSignedUp, setisSignedUp] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()


        axios.post('http://localhost:4000/post', {
            Team: Team,
            GamesPlayed: GamesPlayed,
            Win: Win,
            Draw: Draw,
            Loss: Loss,
            GoalsFor: GoalsFor,
            GoalsAgainst: GoalsAgainst,
            Points: Points,
            Year: Year
        })
            .then(res => {
                console.log(res.data.Team)
                setisSignedUp(true)
            })
    }
    if (isSignedUp) {
        return <>
            <h2>Team with following stats have been added check your database!</h2>
            <ul>
                <li>Team: {Team}</li>
                <li>Games Played: {GamesPlayed}</li>
                <li>Win: {Win}</li>
                <li>Draw: {Draw}</li>
                <li>Loss: {Loss}</li>
                <li>Goals For: {GoalsFor}</li>
                <li>Goals Against: {GoalsAgainst}</li>
                <li>Points: {Points}</li>
                <li>Year: {Year}</li>
            </ul>
        </>
    }
    return (

        <div class="container">
            <form onSubmit={handleSubmit}>
                <label>
                    Team:
                    <input type="text" required="required" name="Team" onChange={(e) => { setTeam(e.target.value) }} />
                </label><br />
                <label>
                    GamesPlayed:
                    <input type="number" name="GamesPlayed" onChange={(e) => { setGamesPlayed(e.target.value) }} />
                </label><br />
                <label>
                    Win:
                    <input type="number" name="Win" onChange={(e) => { setWin(e.target.value) }} />
                </label><br />
                <label>
                    Draw:
                    <input type="number" name="Draw" onChange={(e) => { setDraw(e.target.value) }} />
                </label><br />
                <label>
                    Loss:
                    <input type="number" name="Loss" onChange={(e) => { setLoss(e.target.value) }} />
                </label><br />
                <label>
                    GoalsFor:
                    <input type="number" name="GoalsFor" onChange={(e) => { setGoalsFor(e.target.value) }} />
                </label><br />
                <label>
                    GoalsAgainst:
                    <input type="number" name="GoalsAgainst" onChange={(e) => { setGoalsAgainst(e.target.value) }} />
                </label><br />
                <label>
                    Points:
                    <input type="number" name="Points" onChange={(e) => { setPoints(e.target.value) }} />
                </label><br />
                <label>
                    Year:
                    <input type="number" name="Year" required="require" onChange={(e) => { setYear(e.target.value) }} />
                </label><br />
                <button type="submit">Add</button>

            </form>
        </div>
    )



}

export default SubmitForm;