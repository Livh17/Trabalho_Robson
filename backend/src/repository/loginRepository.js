import { connection } from "./connection.js"


export async function cadastrar(novo) {
    const comando = `Insert into LOGIN (nome,email,senha,data_criacao)
        values(?,?,MD5(?),?)`

    const [info] = await connection.query(comando,
        [novo.nome, novo.email, novo.senha, new Date()]
    )

    return info.insertId

}

export async function listarUsuarios() {
    const [registro] = await connection.query(`
        SELECT COUNT(*) AS total
        FROM LOGIN
    `)
    return registro[0].total
}


export async function listarAdmins() {
    const [registro] = await connection.query(
        `
        SELECT COUNT(id) as totaladmins
        FROM LOGIN_ADM
        `
    )

    return registro[0].totaladmins
}

export async function listarAdminsLogados() {
    const comando = `
        SELECT * FROM LOGIN_ADM
    `

    const [linhas] = await connection.query(comando)
    return linhas
}


export async function verificarLogin(pessoa) {
    const comando = `
    select nome, email from login
    where email = ? and senha = MD5(?)
`

    const [info] = await connection.query(comando, [pessoa.email, pessoa.senha])
    return info[0]
}


export async function buscarAdmin(admin) {
    const comando = `
    select * from LOGIN_ADM
    where email = ? and senha = MD5(?)
    `

    const [info] = await connection.query(comando, [admin.email, admin.senha])
    return info[0]

}

export async function listarLogins() {
    const comando = `
        SELECT * FROM Login
    `

    const [linhas] = await connection.query(comando)
    return linhas
}
