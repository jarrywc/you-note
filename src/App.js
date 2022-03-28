import './App.css';
import axios from 'axios';
import {VideoListSource} from "./components/ListSource";
import {VideoInfo} from "./components/VideoInfo";

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}

function App() {

  const user_id = "some_user_id"

  return (
    <div className="App">
      {/*We assume the app route will be '/video_list'*/}
      <VideoListSource getVideoList={getServerData('/video_list/'+{user_id})} resourceName='video' >
        <VideoInfo />
      </VideoListSource>

    </div>
  );
}

export default App;
