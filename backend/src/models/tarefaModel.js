import { DataTypes } from "sequelize";
import conn from "../config/conn.js"

// nomeTabela
const Tarefa = conn.define("tarefas", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        },
    },
    tarefa: {
        type: DataTypes.STRING,
        allowNull: false //obrigatório
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true //opcional
    },
    status: {
        type: DataTypes.ENUM, //só entrar dados que eu quero, proposto em baixo "values"
        values: ["pendente", "concluida"],
        defaultValue: "pendente"
    }
    },
    {
        tableName: "tarefas",
    }
)  

export default Tarefa