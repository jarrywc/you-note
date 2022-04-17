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
function updatePassword(e) {
  var id = e.target.className

  console.log(e.target.className)

  fetch("/password_reset", {
    method: "POST",
    body: JSON.stringify({
      id: id
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())

  alert("Password Updated")
}
updatePassword()
function App() {

  //const user_id = "some_user_id";
  const [video, setVideo] = useState({});

  const setThisVideo = (v) => {
      console.log('App Received: '+{v});
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
            {/*      itemComponent={VideoForm}*/}
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

