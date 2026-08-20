import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
});

app.get("/", (request, response) => {
    response.json({
        message: "API de Filmes funcionando!"
    });
});

app.post("/create-film", (request, response) => {

    const { titulo, genero, duracao, classificacao } = request.body;

    const insertCommand = `
        INSERT INTO filmes_RaphaelBrandao
        (titulo, genero, duracao, classificacao)
        VALUES (?, ?, ?, ?)
    `;

    database.query(
        insertCommand,
        [titulo, genero, duracao, classificacao],
        (error) => {

            if (error) {
                console.log(error);
                response.status(500).json({
                    message: "Erro ao cadastrar filme."
                });
            } else {
                response.status(201).json({
                    message: "Filme cadastrado com sucesso!"
                });
            }

        }
    );

});

app.get("/films", (request, response) => {

    const selectCommand = "SELECT * FROM filmes_RaphaelBrandao";

    database.query(selectCommand, (error, result) => {

        if (error) {
            console.log(error);
            response.status(500).json({
                message: "Erro ao buscar filmes."
            });
        } else {
            response.json(result);
        }

    });

});

app.get("/films/:id", (request, response) => {

    const { id } = request.params;

    const selectCommand = "SELECT * FROM filmes_RaphaelBrandao WHERE id=?";

    database.query(selectCommand, [id], (error, result) => {

        if (error) {
            console.log(error);
            response.status(500).json({
                message: "Erro ao buscar filme."
            });
        } else {
            response.json(result);
        }

    });

});

app.put("/update-film/:id", (request, response) => {

    const { id } = request.params;

    const { titulo, genero, duracao, classificacao } = request.body;

    const updateCommand = `
        UPDATE filmes_RaphaelBrandao
        SET
        titulo=?,
        genero=?,
        duracao=?,
        classificacao=?
        WHERE id=?
    `;

    database.query(
        updateCommand,
        [titulo, genero, duracao, classificacao, id],
        (error) => {

            if (error) {
                console.log(error);
                response.status(500).json({
                    message: "Erro ao atualizar filme."
                });
            } else {
                response.json({
                    message: "Filme atualizado com sucesso!"
                });
            }

        }
    );

});

app.delete("/delete-film/:id", (request, response) => {

    const { id } = request.params;

    const deleteCommand = "DELETE FROM filmes_RaphaelBrandao WHERE id=?";

    database.query(deleteCommand, [id], (error) => {

        if (error) {
            console.log(error);
            response.status(500).json({
                message: "Erro ao apagar filme."
            });
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            });
        }

    });

});

app.listen(3333, () => {
    console.log("Servidor online!");
});