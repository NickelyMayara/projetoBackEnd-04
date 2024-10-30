import React from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const TodoForm = () => {
    
    const [tarefa, setTarefa] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [message, setMessage] = React.useState(null)
    const [loading, setLoading] = React.useState(null)

    const handlePost = async (event) => {
        setLoading("Carregando...")

        try {
            await axios.post("http://localhost:3333/api/tarefas", {
                tarefa,
                descricao
            })
            setMessage("Tarefa criada com sucesso!")
        } catch (error) {
            setMessage("Não foi possível salvar a sua tarefa!")
            console.error(error)
        }
    }

    return (
        <Form onSubmit={handlePost}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tarefa:</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Digite o titulo da sua tarefa..." 
                value={tarefa} onChange={(e) => setTarefa(e.target.value)}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Descrição</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Digite a descrição da sua tarefa..." 
                value={descricao} onChange={(e) => setDescricao(e.target.value)}
                required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Salvar
            </Button>
            {message ? <p>{message}</p> : <p>{loading}</p>}
        </Form>
    )
}

export default TodoForm
