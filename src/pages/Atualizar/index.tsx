import React, { useEffect, useState } from 'react'
import api from '../../servicos/api'
import { useHistory, useParams } from 'react-router-dom'
import { PrincipalContainer } from './estilo'

interface TodosCliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

interface Params {
  id: string;
}

const Atualizar: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<Params>()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    buscarUmCliente(id)
    console.log(id)
  }, [])

  async function buscarUmCliente(id: string) {
    const buscarCliente = await api.get(`/clientes/${id}`)
    setNome(buscarCliente.data.nome)
    setTelefone(buscarCliente.data.telefone)
    setEmail(buscarCliente.data.email)
  }


  async function atualizarCliente(event: any) {
    event.preventDefault()
    console.log(`Nome: ${nome}  Telefone: ${telefone}  Email: ${email}`)

    if (!nome.trim() || !telefone.trim() || !email.trim()) {
      return
    }
    await api.put(`/clientes/${id}`, {
      nome,
      telefone,
      email
    })

    history.push('/')
  }

  return (
    <PrincipalContainer>
      <form onSubmit={atualizarCliente}>
        <input
          type='text'
          name='nome'
          defaultValue={nome}
          onChange={event => setNome(event.target.value)}
          placeholder='Nome do cliente: ' />
        <input
          type='text'
          name='telefone'
          value={telefone}
          onChange={event => setTelefone(event.target.value)}
          placeholder='Telefone do cliente: ' />
        <input
          type='text'
          name='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='Email do cliente: ' />
        <button type='submit'>Atualizar</button>
        <button type='button' onClick={() => {
          history.push('/')
        }}>Voltar</button>
      </form>
    </PrincipalContainer>
  )
}

export default Atualizar
