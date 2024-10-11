import express from "express" //framework para backend
import cors from "cors"

import conn from "./config/conn.js"

//Models
import Tarefa from "./models/tarefaModel.js"

//Routes
import tarefaRouter from "./routes/tarefaRouter.js"

const app = express()

// 3 middlewares para a api funcionar corretamente
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Necessário para sincronizar os arquivos models no projeto
conn.sync().then(() => {
    console.log("Conectado!")
}).catch((error) => console.error(error))

//Usar Routes
app.use("/api/tarefas", tarefaRouter)

// middleware para rota 404
app.use((req, res)=>{
    res.status(404).json({message: "Rota Não Encontrada"})
})

export default app