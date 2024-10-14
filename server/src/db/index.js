import env from "dotenv"
env.config({ path: './.env' })

import { connect } from "mongoose"

export const connectDB = async () => {
    try {
        // await connect('mongodb+srv://userfree761:CalFGdbecQpaVTpt@cluster0.fqdp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        await connect('mongodb+srv://userfree761:4DeniRAgs2e5qgy@cluster0.fqdp3.mongodb.net/calculator')
    } catch (error) {
        console.log(`DB Connection ERROR: ${error.message}`)
        process.exit(1)
    }
}