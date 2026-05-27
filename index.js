import express from "express"
import mysql2 from "mysql2"
const app = express()

app.use(express.json())

app.get("/", (request, response) =>{
    response.json({
        message: "Você acessou a rota principal"
    })
})

app.post("/create-task", (request, response) =>{
    const {description, status } = request.body

    const insertCommand = "INSERT INTO ToDo_RaphaelBrandao(description, status) VALUES (?, ?)" 
database. query(insertCommand, [description, status], (error) => {
if (error) {
console. log(error)
} else {
response. status (201).json({
message: "Tarefa criada com sucesso!"
})
}
})
})

app.delete("/delete-task/:id", (request, response) => {
    const {id} = request.params
    
    const deleteCommand = "DELETE FROM ToDo_RaphaelBrandao WHERE id=?"

    database.query(deleteCommand, [id],  (error) => {
        if(error) {
            console.log(error)
         } else {
            response.json({
                message: "Tarefa apagada com sucesso!"   
            })
         }
    })
})


app.listen(3333, () => {
    console.log("Servidor online")
})

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "todo_03mc"
})