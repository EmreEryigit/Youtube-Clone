import express from "express"
import { connectToDatabase, disconnectFromDatabase } from "./utils/database"
import logger from "./utils/logger"
import cookieParser from "cookie-parser"
import cors from "cors"
import { CORS_ORIGIN } from "./constants"
import helmet from "helmet"
import userRoute from "./modules/user/user.route"
import authRoute from "./modules/auth/auth.route"
import videoRoute from "./modules/videos/video.route"
import deserializeUser from "./middlewares/deserialzeUser"
const PORT = process.env.PORT || 4000

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(deserializeUser)


app.use("/users", userRoute)
app.use("/auth", authRoute)
app.use("/videos", videoRoute)

const server = app.listen(PORT, async() => {
    await connectToDatabase()
    logger.info(`Server listening on http://localhost:${PORT}`)
})

const signals = ["SIGTERM", "SIGINT"]

function gracefulShutdown(signal: string) {
    process.on(signal, async() => {
        logger.info("Goodby got signal", signal)
        server.close()
        // disconnect from db
        await disconnectFromDatabase()

        
        logger.info("Work done shutting down.")
        process.exit(0)
    })
}

for(let i = 0; i< signals.length; i++){
    gracefulShutdown(signals[i])
}