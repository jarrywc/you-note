import { Outlet } from "react-router-dom";
import {useState} from "react";
import {VideoTest} from  "./components/VideoTest"
import './App.css';
import axios from 'axios';
import {List} from "./components/List";
const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}
export function MyVideos() {
  const [video, setVideo] = useState({});

  const setThisVideo = (v) => {
      console.log('App Received: '+v);
      setVideo(v);
      console.log('App Video Set To: '+video);
  }


  return (
        <div>
            <List getList={getServerData('/get_videos')}
                  resourceName='video'
                  itemComponent={VideoTest}
                  selectItem={setThisVideo}
            />


    </div>
  );
}