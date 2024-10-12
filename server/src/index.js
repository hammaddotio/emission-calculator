import env from "dotenv"
env.config({ path: './.env' })

import express from "express"
import { connectDB } from "./db/index.js"
import cors from 'cors'

export const app = express()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

connectDB()
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error))

app.use(express.json())
app.use(cors(
    {
        origin: '*',
    }
))

import { authRouter } from "./routes/auth.routes.js"
import { userRouter } from "./routes/user.routes.js"
import stationaryCombustionRouter from './routes/calculators/stationaryCombustion.routes.js';
import mobileCombustionRouter from './routes/calculators/mobileCombustion.routes.js';
import refrigerantRoutes from './routes/calculators/refrigerant.routes.js';

app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', stationaryCombustionRouter)
app.use('/api/v1', mobileCombustionRouter)
app.use('/api/v1', refrigerantRoutes)


app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT} `))