import express from 'express'
import ViteExpress from 'vite-express'

const app = express()
ViteExpress.config({ mode: "production" })

app.get("/lalala", ( _, res )=> res.send("Hello!"))

ViteExpress.listen(app, 3000, () => console.log("Server is listening" ))