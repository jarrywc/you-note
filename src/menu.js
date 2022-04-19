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
    <input type="checkbox" id="ham-menu"></input>
<label for="ham-menu">
  <div class="hide-des">
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
  </div>

</label>
<div class="full-page-green"></div>
<div class="ham-menu">
  <ul>
    <li><Link to="/">Home</Link></li>

    <li><Link to="/videos"> My videos</Link></li>
      <ul>
          <li><Link to="/videos/list">List</Link></li>
      </ul>
    <li><Link to="/logout">Log Out</Link></li>
    <li><Link to="/main">Search</Link></li>
      <li><Link to="/logout" onClick={onLogout}>Logout</Link></li>
  </ul>
</div>
<Outlet/>
        </div>
    )
}