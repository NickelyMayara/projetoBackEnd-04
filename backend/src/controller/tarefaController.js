import Tarefa from "../models/tarefaModel.js";
import { z } from "zod"

const createSchema = z.object({
    tarefa: z.string({ 
        invalid_type_error: "A tarefa deve ser um texto", 
        required_error: "Tarefa é Obrigatória" 
    })
        .min(3, {message: "A tarefa deve conter no mínimo 3 caracteres"})
        .max(255, {message: "A tarefa deve conter no máximo 255 caracteres"}),

    descricao: z.string({ 
        required_error: "Descrição é Obrigatória"
    })
    .min(5, {message: "A descrição deve conter no mínimo 5 caracteres"})
    .nullable(),
})

export const create = async (req, res) => {

    const createValidation = createSchema.safeParse(req.body)
    if(!createValidation.success){
        res.status(400).json(createValidation.error)
        return
    }
    const {tarefa, descricao} = createValidation.data

    const novaTarefa = {
        tarefa,
        descricao
    }

    try {
        const tarefaAdd = await Tarefa.create(novaTarefa)
        res.status(201).json(tarefaAdd)
    } catch (error) {
        console.error(error)
        res.status(500).json({ err:"Erro ao cadastrar tarefa" })
    }

}
export const getAll = async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll() //findAll: SELECT * FROM tabela -> busca todos e é uma função assíncrona
        res.status(200).json(tarefas)
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: "Erro ao buscar as tarefas" })
    }
}
export const getTarefa = async (req, res) => {
    res.status(200).json("Chegou no controller")
}
export const updateTarefa = async (req, res) => {
    res.status(200).json("Chegou no controller")
}
export const updateStatusTarefa = async (req, res) => {
    res.status(200).json("Chegou no controller")
}
export const getTarefaStatus = async (req, res) => {
    res.status(200).json("Chegou no controller")
}