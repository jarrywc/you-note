import './App.css';
import axios from 'axios';
// import {
//     Link,
//     Route,
//     Routes,
//     Outlet,
// } from 'react-router-dom';
// import {ListSource} from "./components/archived/ListSource";
// import {VideoInfoForm} from "./components/VideoForm";
// import {Video} from "./components/upcoming/Video";
// import {NoteForm} from "./components/NoteForm";
// import {NoteInfo} from "./components/NoteInfo";
// import {VideoNote} from "./components/VideoNote";

import data from "./d.json"
import {List} from "./components/List";
import {VideoInfo} from "./components/VideoInfo";
import React, {createContext, useCallback, useReducer, useState} from "react";
import {VideoNote} from "./components/VideoNote";
import {Routes, Route} from "react-router-dom"


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

export const VNContext = createContext(
    { ID:0, user_id:0, ext_video_id:"", title:"" }
);

function Index() {
    // This hook provides a VideoNote context accessible accross app
    const [videoNote, setVideoNote] = useState([]);

    const stateTester = (state) => {
        console.log("State changed from child"+state);
    }
    return (
        <>
        {/*<VNContext.Provider value={{videoNote, setVideoNote}}>*/}
        <List getList={getServerData('/get_videos')}
              resourceName='video'
              itemComponent={VideoInfo}
              activeVideoNote={stateTester}
        />
        {/*<VideoNote />*/}
        {/*</VNContext.Provider>*/}
        </>
    );
}

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path="/index" element={<Index/>}/>
        </Routes>


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
