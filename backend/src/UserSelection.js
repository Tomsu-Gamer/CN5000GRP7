import React, { Component, useState } from 'react';
import axios from "axios";
import './index.css'
import { render } from 'react-dom'
import UpdateForm from './UpdateForm';

function UserSelection() {
    const [team, setTeam] = useState('')
    const [year, setYear] = useState('')
    const [teamArray, setteamArray] = useState([])//creating an empty array state variable to store the fetched data from axios getmethod
    const [flag, setFlag] = useState(false)//while this flag is true it will render the updateform component
    const [flag2, setflag2] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get(`http://localhost:4000/getAll/year/${year}`)
            .then(res => {
                console.log(res.data)
                setteamArray(res.data)
            })
        for (let i = 0; i < teamArray.length; i++) {
            if (team == teamArray[i].Team && year == teamArray[i].Year) {
                setFlag(true)
            }
            else {
                setflag2(true)
            }
        }
    }


    if (flag) {
        return (<> <UpdateForm team={team} year={year} />

        </>)

    }
    if (flag2) {
        return (<>
            <h3>No team exists with such data</h3>
        </>)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Enter the Team and year it played to update its data</h3>
                <label>
                    Team:
                    <input type="text" name="Team" required="required" onChange={(e) => { setTeam(e.target.value) }} />
                </label><br />
                <label>
                    Year:
                    <input type="number" name="Year" required="required" onChange={(e) => { setYear(e.target.value) }} />
                </label><br />

                <button type="submit">Add</button>
            </form>

        </>
    )

}

export default UserSelection;