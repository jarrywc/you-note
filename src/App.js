import './App.css';
import axios from 'axios';
// import {
//     Link,
//     Route,
//     Routes,
//     Outlet,
// } from 'react-router-dom';
// import {ListSource} from "./components/archived/ListSource";
// import {VideoInfo} from "./components/VideoInfo";
// import {VideoInfoForm} from "./components/VideoForm";
// import {Video} from "./components/upcoming/Video";
// import {NoteForm} from "./components/NoteForm";
// import {NoteInfo} from "./components/NoteInfo";
// import data from "./d.json"
import {List} from "./components/List";
// import {VideoNote} from "./components/VideoNote";
import {useState} from "react";
import {VideoTest} from  "./components/VideoTest"

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}

// const getLocalStorageData = key => () => {
//     // const response = await axios.get('./testData.json');
//     // console.log("response: "+response.data)
//     const re = data[key]
//     console.log('Local Storage found:')
//     console.log(re)
//     return re
//     // return localStorage.getItem(key);
// }
function App() {

  //const user_id = "some_user_id";
  const [video, setVideo] = useState({});

  const setThisVideo = (v) => {
      console.log('App Received: '+v);
      setVideo(v);
      console.log('App Video Set To: '+video);
  }


  return (
    <div className="App">
        <div>
            <List getList={getServerData('/get_videos')}
                  resourceName='video'
                  itemComponent={VideoTest}
                  selectItem={setThisVideo}
            />

            {/*<List getList={getServerData('/get_videos')}*/}
            {/*      resourceName='video'*/}
            {/*      itemComponent={VideoInfo}*/}
            {/*      selectItem={setThisVideo}*/}
            {/*/>*/}
        </div>


        {/*<Routes>*/}
        {/*    <Route*/}
        {/*        index*/}
        {/*        element={*/}
        {/*            <main style={{ padding: "1rem" }}>*/}
        {/*                <p>Select an Video</p>*/}
        {/*            </main>*/}
        {/*        }/>*/}
        {/*    <Route path="/videos" element={*/}
        {/*        <List getList={getServerData('/get_videos')}*/}
        {/*              resourceName='video'*/}
        {/*              itemComponent={VideoInfo}*/}
        {/*              selectItem={setThisVideo}*/}
        {/*        />*/}
        {/*    }>*/}
        {/*        <Route path=":videoId" element={<VideoNote video={video} />} />*/}
        {/*    </Route>*/}

        {/*    <Route*/}
        {/*        path="*"*/}
        {/*        element={*/}
        {/*            <main style={{ padding: "1rem" }}>*/}
        {/*                <p>There's nothing here!</p>*/}
        {/*            </main>*/}
        {/*        }/>*/}
        {/*</Routes>*/}
        {/*We assume the app route will be '/video_list'*/}
        {/*getServerData('/videos/'+{user_id})*/}

        {/*<List getList={getServerData('notes')}*/}
        {/*      resourceName='note'*/}
        {/*      itemComponent={NoteInfo}*/}
        {/*/>*/}

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
