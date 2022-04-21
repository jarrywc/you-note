// import './App.css';
import React from 'react';
import { SearchMain} from './nav';
import {Menu} from './menu'
import { Route, Routes} from 'react-router-dom';
import {MyVideos} from './MyVideos'
import {Results} from './results'
import {VideoNote} from "./components/VideoNote";
import {MyVideosNav} from "./components/MyVideosNav";
import {MDBContainer, MDBRow} from "mdb-react-ui-kit";



function App() {

  return (

      <>
        {/*<MDBNavbar>*/}
        {/*  <img className="nav-icon" src="./younote.png" alt=""/>*/}
        {/*  <h1 className="nav-header">YouNote</h1>*/}
        {/*  <a className="home-btn" style="text-decoration:none" href="">Home</a>*/}
        {/*</MDBNavbar>*/}
        <div>
        <Menu/>
        <SearchMain/>
            <MDBContainer className="d-lg-flex">
            <MDBRow xs={3} style={{padding:"5px", height:"100%"}}>
                <div id='changeable'/>
            </MDBRow>
            </MDBContainer>
        <Routes>
          <Route path='/videos' element={<MyVideosNav/>}>
              <Route path='list' element={<MyVideos />}/>
              <Route path=':ID' element={<VideoNote/>}/>
              {/*<Route path='new' element={<VideoTest/>}/>*/}
          </Route>
          <Route path='/results' element ={<Results/>}/>
        </Routes>
        </div>
      </>
  );
}

export default App;

