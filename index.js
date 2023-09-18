import express from "express"
import rout from './Routers/router.js'

const app= express()
app.use(express.json())
app.use(rout)

app.listen(4000);
console.log("Escuchando ");
