const express = require("express")
const router = require('./Routes/index.js')
const app = express()
const corse = require('cors')

const errorHandler = require('./MiddleWare/ErrorHandlingMiddleware')

app.use(corse())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        app.listen(3001, () => console.log("ok"))
    } catch (error) {
        console.log(error)
    }
}
start()
