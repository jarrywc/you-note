import React, {useCallback, useState} from "react";
import {List} from "./List";
import {VideoInfo} from "./VideoInfo";
import {VideoNote} from "./VideoNote";
import axios from "axios";

const getServerData = url => async () => {
    const response = await axios.get(url);
    return response.data;
}

export const Main = () => {
    // const [show, setShow] = useState(null);
    const [video, setVideo] = useState({});
    // const toggleVideoNote = () => setShow(!show);

    const setThisVideo = useCallback((v) => {
        console.log('App Received: '+v);
        setVideo(v)
        // console.log('App Video Set To: '+video);
    },[setVideo])
    return (
        <>
        <div>
            <List getList={getServerData('videos')}
                  resourceName='video'
                  itemComponent={VideoInfo}
                  selectItem={setThisVideo}
            />
        </div>
        <div>
            <VideoNote video={video} />
        </div>
        </>
    );
}