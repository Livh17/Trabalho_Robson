import Cabecalho from '../../components/cadastro/Cabecalho.jsx'
import api from '../../../api.js'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'

import '../login/index.scss'

export default function Cadastrar() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        let user = localStorage.getItem("USUARIO")

        if (user != null || user != undefined) {
            navigate('/')
        }
    }, [])

    async function Cadastrar() {
        if (nome.length <= 1 && email.length <= 1 && senha.length <= 1) {
            toast.error('preencha todos os campos')
            return
        }

        if (nome.length <= 1) {
            toast.error('insira um nome')
            return
        }

        if (email.length <= 1) {
            toast.error('insira um email')
            return
        }

        if (senha.length <= 1) {
            toast.error('insira uma senha')
            return
        }

        let novo = {
            nome,
            email,
            senha
        }
        try {
            let res = await api.post('/cadastrar', novo)
            console.log(res.data);

            localStorage.setItem('USUARIO', res.data.usuario)
            localStorage.setItem('TOKEN', res.data.token)

            navigate('/')
        } 
        
        catch (e) {
            alert('erro ao cadastrar')
        }

    }

    function Enviar(e) {
        if (e.key === 'Enter') {
            Cadastrar()
        }
    }


    return (
        <div>
            <Cabecalho />
            <div className="formulario_cadastro">
                <label htmlFor="">CADASTRAR-SE</label>
                <input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)} onKeyUp={Enviar} />
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} onKeyUp={Enviar} />
                <input placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} onKeyUp={Enviar} />
                <button onClick={Cadastrar}>Cadastrar-se</button>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}