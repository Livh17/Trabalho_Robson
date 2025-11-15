import { BrowserRouter,Route,Routes } from "react-router";
import App from './pages/home/index.jsx'


import Admin from "./pages/admin/index.jsx";
import Cadastrar from "./pages/cadastrar/Index.jsx";
import Login from "./pages/login/index.jsx";
import TelaAdmin from "./pages/ADM/tela.jsx";



export default function Navegacao(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<App/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/cadastrar" element = {<Cadastrar/>}/>
            <Route path="/loginadmin" element = {<Admin/>}/>
            <Route path="/teladm" element = {<TelaAdmin/>}/>

        </Routes>
        </BrowserRouter>
    )
}