import Express from "express"
import dotenv from "dotenv"
import axios from "axios"
import ICAL from "ical.js"

dotenv.config()

const PORT = process.env.PORT | 3000
const ICAL_URL = process.env.ICAL_URL

const app = new Express()

const data = (await axios.get(ICAL_URL)).data

// console.log(data)
const ical = ICAL.parse(data)
const vcalendar = new ICAL.Component(ical)

const events = vcalendar.getAllSubcomponents()


const eventlist = events.map( (event) => {
    
    return {
        uid: event.getFirstPropertyValue('uid'),
        start: event.getFirstPropertyValue('dtstart'),
        end: event.getFirstPropertyValue('dtend'),
        timestamp: event.getFirstPropertyValue('dtstamp'),
        last_modified: event.getFirstPropertyValue('last-modfied'),
        summary: event.getFirstPropertyValue('summary').match(/\w+\s([^,]*)/)[1],
        location: event.getFirstPropertyValue('location').split(',').map( (locationString) => {
            // console.log(locationString)
            const name = locationString.match(/(\s–\s|\s-\s)(\w.[^\(]+)/)[2]
            const number  = locationString.match(/\w+-(\w+)/)[1]
            return {
                number, name
            }}),
        description: event.getFirstPropertyValue('description')
    }
})

const results = {}

eventlist.foreach( (event) => {
    event.location.foreach
})

app.get('/room/:room', (request, response) => {
    console.log
    response.send("OK " + request.params.room)
})

console.log("hello world");


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})