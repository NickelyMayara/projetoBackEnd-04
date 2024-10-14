import { Table } from 'react-bootstrap';
import { BsTrash3Fill } from "react-icons/bs";
import React from 'react';
import axios from 'axios';

const TodoList = () => {

    const [tarefas, setTarefas] = React.useState([])

    React.useEffect(() => {

        const handleGetList = async () => {
            try {
                    const response = await axios.get("http://localhost:3333/api/tarefas")
                    setTarefas(response.data)
            } catch (error) {
                console.log("Não foi possível obter os dados")
            }
        }

        handleGetList()
    }, [])

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3333/api/tarefas/${id}`)
            setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
        } catch (error) {
            console.log("Não foi possível Excluir os dados")
        }
    }

    console.log(tarefas)

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Tarefa</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            {tarefas.map((tarefa, index) => (
                <tbody>
                <tr>
                    <td>{tarefa.tarefa}</td>
                    <td>{tarefa.descricao}</td>
                    <td>{tarefa.status}</td>
                    <td>
                        <span><BsTrash3Fill onClick={}/></span>
                    </td>
                </tr>
            </tbody>
            ))}
            
        </Table>
    );
}

export default TodoList;