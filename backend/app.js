const dotenv=require('dotenv')
dotenv.config()

const express = require('express')
const app= express()

const cors = require('cors')

const connectdb = require('./database/db')
connectdb();

app.use(cors())


app.get('/',(req,res)=>{
    res.send('hello world')
    
})

module.exports=app