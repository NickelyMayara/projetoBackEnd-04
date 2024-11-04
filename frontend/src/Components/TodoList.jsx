import { Table } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import EditForm from './EditForm.jsx';
import Button from 'react-bootstrap/Button';

const TodoList = ({ tarefas, setTarefas }) => {

    const [show, setShow] = React.useState(false)
    const [onEdit, setOnEdit] = React.useState(false)

    const handleEdit = (tarefa) => {
        setOnEdit(tarefa)
        setShow(true)
    }

    const handleSubmitEdit = async (editedTarefa) => {
        try {
            await axios.put(`http://localhost:3333/tarefas/${editedTarefa.id}}`,
                editedTarefa)

            setTarefas((prevTarefas) =>
                prevTarefas.map((tarefa) => 
                tarefa.id === editedTarefa.id ? editedTarefa : tarefa))

            setShow(false)
        } catch (error) {
            console.error(error)
        }
    }



const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3333/api/tarefas/${id}`)
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
    } catch (error) {
        console.log("Não foi possível Excluir os dados")
    }
}
console.log(tarefas)

return (
    <>
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
                <tbody key={index}>
                    <tr>
                        <td>{tarefa.tarefa}</td>
                        <td>{tarefa.descricao}</td>
                        <td>{tarefa.status}</td>
                        <td>
                            <Button variant="outline-danger" onClick={() => handleDelete(tarefa.id)}>Deletar</Button>
                            <Button style={{ marginLeft: 20 }} variant="outline-primary" onClick={() => handleEdit(tarefa)}>Editar</Button>
                        </td>
                    </tr>
                </tbody>
            ))}

        </Table>
        <EditForm show={show} handleClose={() => setShow(false)} />
    </>
);
}

export default TodoList;