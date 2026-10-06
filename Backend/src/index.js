import express from "express"
import fs from "fs"
import path from "path"
import taskRouter from "./routes/task.js"
import cors from "cors"

const Port = 8080
const app = express()
app.use(cors())
app.use(express.json())
app.use(taskRouter)


app.listen(Port, () => console.log("Server is running"))
