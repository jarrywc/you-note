import {SplitScreen} from "./style_tools/SplitScreen";
import {useParams} from "react-router-dom";
import axios from "axios";
import {VideoTest} from "./VideoTest";
import React from 'react';
import {List} from "./List";
import {NoteInfo} from "./NoteInfo";

// Page entry -> props: video id

// Get a video

// Render the video look

// Get the video's notes


const getNoteData = ID => async () => {
    console.log("Getting notes for ID "+ID)
    const response = await axios.get("get_notes",{params: {video_id:ID}});
    return response.data;
}


const LeftHandComponent = ({ID}) => {
    return (
        <>
        <VideoTest id={{ID:ID}}/>
        </>
    );
}

const RightHandComponent = ({ID}) => {


    return (
        <>

        <p style={{ backgroundColor: 'red' }}>Some words! {ID}</p>
            <ul>
        <List getList={getNoteData(ID)}
              resourceName='note'
              itemComponent={NoteInfo}
            // selectItem={setThisVideo}
        />
            </ul>






        </>
    );
}
// Props includes the video object
export const VideoNote = () => {
    let {ID} = useParams();
    console.log("---------P"+ ID);
    return (
        <>
        <SplitScreen leftWeight={3} rightWeight={2}>
            <LeftHandComponent ID={ID} />
            <RightHandComponent ID={ID} />
        </SplitScreen>
        </>
    );
}