import React, { useEffect, useState } from 'react'
import api from '../../servicos/api'
import { useHistory } from 'react-router-dom'
import { PrincipalContainer, TodosClientes } from './estilo'

interface CadastroCliente {
  nome: string;
  telefone: string;
  email: string;
}

interface TodosCliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}


const Principal: React.FC = () => {
  const history = useHistory()
  const [clientes, setClientes] = useState<TodosCliente[]>([])
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    buscarTodosClientes()
  }, [])

  async function apagarCliente(id: string) {
    await api.delete(`/clientes/${id}`)
    buscarTodosClientes()
  }

  async function buscarTodosClientes() {
    const todosClientes = await api.get('/clientes')
    setClientes(todosClientes.data)
  }

  async function adicionarCliente(event: any) {
    event.preventDefault()
    console.log(`Nome: ${nome}  Telefone: ${telefone}  Email: ${email}`)

    if (!nome.trim() || !telefone.trim() || !email.trim()) {
      return
    }

    const novocliente = await api.post('/clientes', {
      nome,
      telefone,
      email
    })

    const { data } = novocliente

    setClientes([...clientes, data])
  }
  return (
    <PrincipalContainer>
      <form onSubmit={adicionarCliente}>
        <input
          type='text'
          name='nome'
          onChange={event => setNome(event.target.value)}
          placeholder='Nome do cliente: ' />
        <input
          type='text'
          name='telefone'
          onChange={event => setTelefone(event.target.value)}
          placeholder='Telefone do cliente: ' />
        <input
          type='text'
          name='email'
          onChange={event => setEmail(event.target.value)}
          placeholder='Email do cliente: ' />
        <button type='submit'>Cadastrar</button>
      </form>
      <TodosClientes>
        {clientes.map(cliente => {
            return (
              <div key={cliente.id}>
                <div>
                  <span>{`Nome: ${cliente.nome}`}</span>
                  <span>{`Telefone: ${cliente.telefone}`}</span>
                  <span>{`Email: ${cliente.email}`}</span>
                </div>
                <div>
                  <button onClick={() => {
                    history.push(`/cliente/${cliente.id}`)
                  }}>Atualizar</button>
                  <button onClick={() => {
                    apagarCliente(cliente.id)
                  }}>Apagar</button>
                </div>
              </div>
            )
          })}
      </TodosClientes>
    </PrincipalContainer>
  )
}

export default Principal
