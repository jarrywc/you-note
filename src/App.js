import './App.css';
import axios from 'axios';
import {ListSource} from "./components/ListSource";
import {VideoInfo} from "./components/VideoInfo";
import {VideoInfoForm} from "./components/VideoForm";
import {NoteForm} from "./components/NoteForm";
import {NoteInfo} from "./components/NoteInfo";
import {data} from "./data"

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}

const getLocalStorageData = key => () => {
    // const response = await axios.get('./testData.json');
    // console.log("response: "+response.data)
    const re = data[key]
    console.log(re)
    return re
    // return localStorage.getItem(key);
}
function App() {

  const user_id = "some_user_id"

  return (
    <div className="App">
        {/*We assume the app route will be '/video_list'*/}
        {/*getServerData('/videos/'+{user_id})*/}

        <ListSource getList={getServerData('videos')} resourceName='videos' >
            <VideoInfo />
        </ListSource>

        <VideoInfoForm />
        {/*getServerData('/notes/'+{user_id})*/}
        {/*<ListSource getList={getLocalStorageData('notes')} resourceName='notes'>*/}
        {/*    <NoteInfo />*/}
        {/*</ListSource>*/}
        <NoteForm />

    </div>
  );
}

export default App;
