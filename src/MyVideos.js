import {VideoTest} from  "./components/VideoTest"
import './App.css';
import axios from 'axios';
import {List} from "./components/List";
const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}
export function MyVideos() {
  document.getElementById("changeable").innerHTML = "";
  return (
        <div>
            <List getList={getServerData('/get_videos')}
                  resourceName='video'
                  itemComponent={VideoTest}/>
    </div>
  );
}