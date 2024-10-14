import React from 'react'
import { Container } from 'react-bootstrap'
import TodoForm from '../Components/TodoForm'
import TodoList from '../Components/TodoList'

const App = () => {
    return (
        <Container>
            <TodoForm />
            <TodoList />
        </Container>
    )
}

export default App
