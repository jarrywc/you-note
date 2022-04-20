import './left.css'
import { BrowserRouter ,Outlet, Route, Link, Routes } from 'react-router-dom'
import {MyVideos} from './MyVideos'
import axios from "axios";

const onLogout = async () => {
    console.log('Logout')
    const response = await axios.get('logout' );
    window.location.pathname = "/landing"
    window.location.reload()
}

export function Menu(){
    return (
    <div>
        <input type="checkbox" id="ham-menu"/>
        <label for="ham-menu">
          <div className="hide-des">
            <span className="menu-line"/>
            <span className="menu-line"/>
            <span className="menu-line"/>
            <span className="menu-line"/>
            <span className="menu-line"/>
            <span className="menu-line"/>
          </div>

        </label>
        <div className="full-page-green"/>
        <div className="ham-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/videos/list">List</Link></li>
            <li><Link to="/main">Search</Link></li>
          <li><Link to="/logout" onClick={onLogout}>Logout</Link></li>
          </ul>
        </div>
        <Outlet/>
    </div>
    )
}