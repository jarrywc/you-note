import './App.css';
import axios from 'axios';
import {ListSource} from "./components/archived/ListSource";
import {VideoInfo} from "./components/VideoInfo";
import {VideoInfoForm} from "./components/VideoForm";
import {Video} from "./components/upcoming/Video";
import {NoteForm} from "./components/NoteForm";
import {NoteInfo} from "./components/NoteInfo";
import data from "./d.json"
import {List} from "./components/List";

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}

const getLocalStorageData = key => () => {
    // const response = await axios.get('./testData.json');
    // console.log("response: "+response.data)
    const re = data[key]
    console.log('Local Storage found:')
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

        {/*<ListSource getList={getLocalStorageData('videos')} resourceName='video' >*/}
        {/*    <VideoInfo />*/}
        {/*</ListSource>*/}

        <List getList={getLocalStorageData('videos')}
              resourceName='video'
              itemComponent={VideoInfo}
        />
        <List getList={getLocalStorageData('notes')}
              resourceName='note'
              itemComponent={NoteInfo}
        />
        {/*<VideoInfoForm />*/}
        {/*getServerData('/notes/'+{user_id})*/}
        {/*<ListSource getList={getLocalStorageData('notes')} resourceName='notes'>*/}
        {/*    <NoteInfo />*/}
        {/*</ListSource>*/}
        {/*<NoteForm />*/}

    </div>
  );
}

export default App;
