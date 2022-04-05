import './App.css';
import axios from 'axios';
import { ListSource } from "./components/ListSource";
import { VideoInfo } from "./components/VideoInfo";
import { VideoInfoForm } from "./components/VideoForm";

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}

function App() {

  const user_id = "some_user_id"

  return (
    <div className="App">
      {/*We assume the app route will be '/video_list'*/}
      <ListSource getVideoList={getServerData('/video_list/' + { user_id })} resourceName='video' >
        <VideoInfo />
      </ListSource>
      <VideoInfoForm />

    </div>
  );
}


export default App;
