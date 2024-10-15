import env from "dotenv"
env.config({ path: './.env' })

import express from "express"
import { connectDB } from "./db/index.js"
import cors from 'cors'
import session from 'express-session';

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
        // credentials: true
    }
))
// Session configuration
// app.use(session({
//     secret: 'your-secret-key', // Use a strong secret key
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', // Use true in production
//         sameSite: 'None', // or 'Lax' if appropriate
//     },
// }));
import { authRouter } from "./routes/auth.routes.js"
import { userRouter } from "./routes/user.routes.js"
import stationaryCombustionRouter from './routes/calculators/stationaryCombustion.routes.js';
import mobileCombustionRouter from './routes/calculators/mobileCombustion.routes.js';
import refrigerantRouter from './routes/calculators/refrigerant.routes.js';
import fireSuppressantRouter from './routes/calculators/fireSuppressant.routes.js';
import electricitySupplyRoutes from './routes/calculators/electricitySupply.routes.js';
import purchasedGasRoutes from './routes/calculators/purchasedGases.routes.js';
import allCalculatorsRoutes from './routes/calculators/allCalculators.routes.js';
import pieChartRouter from './routes/charts/pieChart.routes.js';

app.use('/api/v1', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/stationary-combustion', stationaryCombustionRouter)
app.use('/api/v1/mobile-combustion', mobileCombustionRouter)
app.use('/api/v1/refrigerant', refrigerantRouter)
app.use('/api/v1/fire-suppressant', fireSuppressantRouter)
app.use('/api/v1/electricity-supply', electricitySupplyRoutes);
app.use('/api/v1/purchased-gas', purchasedGasRoutes);
app.use('/api/v1/', pieChartRouter);
app.use('/api/v1/', allCalculatorsRoutes);


app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT} `))