import Tarefa from "../models/tarefaModel.js";
import { z } from "zod"

const createSchema = z.object({ //validar dados inseridos no campo de tarefa
    tarefa: 
    z.string({ 
    invalid_type_error: "A tarefa deve ser um texto", 
    required_error: "Tarefa é Obrigatória" 
    })
    .min(3, {message: "A tarefa deve conter no mínimo 3 caracteres"})
    .max(255, {message: "A tarefa deve conter no máximo 255 caracteres"}),
})
const idSchema = z.object({ //validar id
    id: z.string().uuid({message: 'Id inválido'})
})
const updateSchema = z.object({ //validação de atualização para ter os valores corretos na mudança de status e dados recebidos do campo tarefa
    tarefa: z.string()
    .min(3, { message: "A tarefa deve conter no mínimo 3 caracteres" })
    .max(255, { message: "A tarefa deve conter no máximo 255 caracteres" }),
    status: z.enum(["pendente", "concluida"])
})
const situacaoSchema = z.object({ //validação de atualização para ter os valores corretos na mudança de status e dados recebidos do campo tarefa
    tarefa: z.enum(["pendente", "concluida"])
})

export const create = async (req, res) => {

    const createValidation = createSchema.safeParse(req.body)
    if(!createValidation.success){
        res.status(400).json(createValidation.error)
        return
    }
    const {tarefa} = createValidation.data
    const descricao = req.body?.descricao || null  // faz isso pq é uma informação opcional

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

    //Paginação: para limitar a quantidade de informação que será enviada no view
    //GET - 3333/api/tarefas?page=1&limit = 10

    const page = parseInt(req.query.page) || 1 // se usuário não passar a informação será 1
    const limit = parseInt(req.query.limit) || 10 // se usuário não passar a informação será 10
    const offset = (page - 1) * 10

    try {
        const tarefas = await Tarefa.findAndCountAll({//findAll: SELECT * FROM tabela -> busca todos e é uma função assíncrona e findAndCountAll: encontre e conte todos
            limit,
            offset,
        }) 

        const totalPaginas = Math.ceil(tarefas.count / limit)
        res.status(200).json({  // para apresentar as info para o titio Igor (frontEnd)
            totalTarefas : tarefas.count,
            totalPaginas,
            paginaAtual: page,
            itensPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null : `http://localhost:3333?api?tarefas?page=${page + 1}`,
            tarefas: tarefas.rows //refere-se às linhas de dados retornadas pela consulta ao banco de dados, representando as tarefas que serão exibidas na página atual.
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: "Erro ao buscar as tarefas" })
    }
}
export const getTarefa = async (req, res) => {
    const idValidation = idSchema.safeParse(req.params)
    
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
        return
    }

    const id = idValidation.data.id

    try {
        const tarefa = await Tarefa.findByPk(id)
        if(!tarefa){
            res.status(404).json({err: 'Tarefa não encontrada'})
            return
        }
        res.status(200).json(tarefa)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Erro ao buscar Tarefa'})
    }
}
export const updateTarefa = async (req, res) => {

    const idValidation = idSchema.safeParse(req.params)
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
        return
    }
    const id = idValidation.data.id

    const updateValidation = updateSchema.safeParse(req.body)
    if(!updateValidation.success){
        res.status(400).json({message: updateValidation.error})
        return
    }

    const {tarefa, status} = updateValidation.data
    const descricao = req.body.descricao || ""

    const tarefaAtualizada = {
        tarefa,
        descricao,
        status
    }

    try {// [número de linhas afetadas]  //valores para update: objeto, onde será modificado      
        const [numAffectedRow] = await Tarefa.update(tarefaAtualizada, {
            where: { id },
        })
        if(numAffectedRow <= 0){
            res.status(404).json({err: "Tarefa Não Encontrada"})
        }
        res.status(200).json({message: "Tarefa Atualizada com Sucesso!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({err: "Erro ao atualizar a tarefa"})
    }
}
export const updateStatusTarefa = async (req, res) => {

    const idValidation = idSchema.safeParse(req.params)
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
        return
    }
    const id = idValidation.data.id

    try {
        const tarefa = await Tarefa.findOne({where: { id }})
        console.log(tarefa)

        if(!tarefa){
            res.status(404).json({err: "Tarefa não encontrada"})
        }

        if(tarefa.status === 'pendente'){
            //att para concluída
            await Tarefa.update({status: "concluida"}, {where: { id } })
        }
        else if(tarefa.status === 'concluida'){
            //att para pendente
            await Tarefa.update({status: "pendente"}, {where: { id } })
        }
        // const tarefaAtualizada = await Tarefa.findByPk(id)
        const tarefaAtualizada = await Tarefa.findOne({
            where: { id },
            attributes: ["id", "tarefa", "status"],
        })
        res.status(200).json(tarefaAtualizada)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Erro ao atualizar Status da Tarefa'})
    }
}
export const getTarefaStatus = async (req, res) => {

    const situacaoValidation = situacaoSchema.safeParse(req.params)
    if(!situacaoValidation.success){
        res.status(400).json({err: situacaoValidation.error})
        return
    }
    const { situacao } = situacaoValidation.data

    try {
        const tarefas = await Tarefa.findAll({where:{status: situacao}})
        res.status(200).json(tarefas)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Erro ao Buscar Tarefas por situação'})
    }
}
export const deleteTarefa = async (req, res) => {
    const idValidation = idSchema.safeParse(req.params)
    
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
        return
    }

    const id = idValidation.data.id

    try {
        const tarefaDeletada = await Tarefa.destroy({
            where: { id }, //Filtra os registros para encontrar aquele com o id especificado.
        })
        
        if(tarefaDeletada === 0){
            res.status(404).json({message: 'Tarefa não existe!'})
            return
        }

        res.status(200).json({message: 'Tarefa Excluída!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Erro ao excluir Tarefa'})
    }
}