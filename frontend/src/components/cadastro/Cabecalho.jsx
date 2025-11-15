import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './cabecalho.scss'

export default function Cabecalho() {
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        let adm = localStorage.getItem('ADMIN')

        if (adm != null || adm != undefined) {
            setAdmin(true)
        }
        else (
            setAdmin(false)
        )

    }, [])

    useEffect(() => {
        let user = localStorage.getItem("USUARIO")

        if (user != null || user != undefined) {
            setUser(true)
        }
        else (
            setUser(false)
        )
    }, [])

    function logout() {
        localStorage.removeItem('USUARIO')
        localStorage.removeItem('ADMIN')
        localStorage.removeItem('TOKEN')
        navigate('/login')

    }



    return (
        <div>
            {user ? null : null}
            {admin ? null : null}

            <div className="cabecalho">

                <div className="links">

                    {user &&
                        <div>
                            <Link to={'/'}>HOME</Link>
                            <button onClick={logout}>Sair</button>
                        </div>}

                    {admin &&
                        <div>
                            <Link to={'/teladm'}>ADM Tela</Link>
                            <Link to={'/'}>HOME</Link>
                            <button className="sair" onClick={logout}>SAIR</button>
                        </div>}

                    {!user && !admin &&
                        <div>
                            <Link to={'/'}>HOME</Link>
                            <Link to={'/cadastrar'}>Cadastrar-se</Link>
                            <Link to={'/login'}>Entrar</Link>
                            <Link to={'/loginadmin'}>ADM Login</Link>
                        </div>}
                </div>
            </div>
        </div>
    )
}


