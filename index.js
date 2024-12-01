import express from 'express';
import 'dotenv/config';
import './db/db.js';
import router from './router/index.js'
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})