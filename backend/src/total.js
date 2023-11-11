import React, { Component, useState } from 'react';
import axios from "axios";
import './index.css'


function Total() {

    const [year, setYear] = useState('')
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [result, setResult] = useState({})//stores the result object of the axios response
    const [toggle, setToggle] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:4000/total/year/${year}`//ES6 template strings should be used with backquotes, not single quotes in order to use js variables inside the string or url parameters http://eslint.org/docs/rules/no-template-curly-in-string#examples

        axios.get(url)
            .then(res => {
                console.log(res.data)//debug check
                setResult(res.data)
                if (flag && res.data != null) {//this helps to toggle between the components
                    setFlag(true)
                }
                else {
                    setFlag(true)

                }

            })
            .catch(error => {//this will help the server not to crash when an unexpected value is entered instead it will catch the error and display it
                console.log({ message: error.message })//catch the error message and display  it on console
                setFlag2(true)
                setFlag(false)
            })
    }

    if (flag) {
        return (<>
            <h3>Based on the year: {year}</h3>
            <ul>
                <li>totalGamesPlayed: {result.totalPlay}</li>
                <li>Total Draw: {result.Draw}</li>
                <li>Total Win: {result.Win}</li>
            </ul><br />

            Enter Again:
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" required="required" name="Year" onChange={(e) => { setYear(e.target.value) }} />
                </label><br />
                <button type="submit">submit</button>
            </form>

        </>)
    }
    if (flag2) {
        return (<>
            <h3>No Team has played on year: {year}</h3>

            Enter Again:
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" required="required" name="Year" onChange={(e) => { setYear(e.target.value) }} />
                </label><br />
                <button type="submit">submit</button>
            </form>
        </>)


    }

    if (toggle) {
        return (<>
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" required="required" name="Year" onChange={(e) => { setYear(e.target.value) }} />
                </label><br />
                <button type="submit">submit</button>
            </form>
        </>)
    }

}

export default Total;