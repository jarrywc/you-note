import './App.css';
import axios from 'axios';

import { List } from "./components/List";
// import {VideoNote} from "./components/VideoNote";
import { useState } from "react";
import { VideoTest } from "./components/VideoTest"


const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}
//update password
function App() {

  //const user_id = "some_user_id";
  const [video, setVideo] = useState({});

  const setThisVideo = (v) => {
      console.log('App Received: '+{v});
      setVideo(v);
      console.log('App Video Set To: '+video);
  }



  return (
    <div id="flex-container">
      <div class="videos">
        <li>
          <List class="list" getList={getServerData('/get_videos')}

            resourceName='video'
            itemComponent={VideoTest}
            selectItem={setThisVideo}
          />
        </li>
      </div>
    </div>

  );
}

export default App;

