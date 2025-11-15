import Cabecalho from "../../components/cadastro/Cabecalho.jsx"
import api from '../../../api.js'

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

import './tela.scss'

export default function TelaAdmin() {
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const [totalAdmins, setTotalAdmins] = useState(0)
    const [usuariosLogados, setUsuariosLogados] = useState([])
    const [adminsLogados, setAdminsLogados] = useState([])



    async function listarAdmins() {
        try {
            let resp = await api.get('/totalAdmins')
            setTotalAdmins(resp.data.totalAdmins)

            let respAdmins = await api.get('/adminsLogados')
            setAdminsLogados(respAdmins.data.admins)
        } catch (error) {
            console.log("Erro ao buscar admins!", error)

        }
    }





    async function listarUsuarios() {
        try {
            let resp = await api.get('/totalUser')
            setCount(resp.data.totalUsers)

            let respUsuarios = await api.get('/usuariosLogados')
            setUsuariosLogados(respUsuarios.data.usuarios)
        } catch (err) {
            console.log("Erro ao buscar usuários!", err)
        }
    }

    useEffect(() => {
        let adm = localStorage.getItem('ADMIN')
        if (adm == null || adm == undefined) {
            navigate('/')
        }
        listarUsuarios()
        listarAdmins()
    }, [])

    return (
        <div>
            <Cabecalho />
            <main>
                <h1>Olá Administrador. Seja Bem-Vindo!</h1>
                <div className="container_estatisticas">
                    <div className="estatistica_usuarios">
                        <h2>Usuários</h2>
                        <p>{count}</p>
                        <ul>
                            {usuariosLogados.map((usuario, index) => (
                                <li key={index}>{usuario.nome} - {usuario.email}</li>
                            ))}
                        </ul>

                    </div>

                    <div className="estatistica_admins">
                        <h2>Admins</h2>
                        <p>{totalAdmins}</p>
                        <ul>
                            {adminsLogados.map((admin, index) => (
                                <li key={index}>{admin.email}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    )
}