import './App.css';
import axios from 'axios';
import { SearchMain} from './nav';
import {Menu} from './menu'
import { Route, Routes} from 'react-router-dom';
import {MyVideos} from './MyVideos'
import {Results} from './results'
import {VideoNote} from "./components/VideoNote";
import {MyVideosNav} from "./components/MyVideosNav";

// import { List } from "./components/List";
// import {VideoNote} from "./components/VideoNote";
// import { useState } from "react";
// import { VideoTest } from "./components/VideoTest"


// const getServerData = url => async () => {
//   const response = await axios.get(url);
//   return response.data;
// }
//update password
// function updatePassword(e) {
//   var id = e.target.className
//   console.log(e.target.className)
//
//   fetch("/password_reset", {
//     method: "POST",
//     body: JSON.stringify({
//       id: id
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//
//   alert("Password Updated")
// }
// updatePassword()
function App() {

  //const user_id = "some_user_id";
  // const [video, setVideo] = useState({});
  //
  // const setThisVideo = (v) => {
  //     console.log('App Received: '+{v});
  //     setVideo(v);
  //     console.log('App Video Set To: '+video);
  // }



  return (
    <div>
      <Menu/>
      <SearchMain/>
      <div id='changeable'/>
      <Routes>
          <Route path='/videos' element={<MyVideosNav/>}>
              <Route path='list' element={<MyVideos />}/>
              <Route path=':ID' element={<VideoNote/>}/>
              {/*<Route path='new' element={<VideoTest/>}/>*/}
          </Route>
          <Route path='/results' element ={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;

