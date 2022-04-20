import {SplitScreen} from "./style_tools/SplitScreen";
import {useParams} from "react-router-dom";
import axios from "axios";
import {VideoTest} from "./VideoTest";
import React, {useEffect, useReducer, useState} from 'react';
import {NoteList} from "./NoteList";
import {NoteInfo} from "./NoteInfo";
import {Note} from "./Note";

// Page entry -> props: video id

// Get a video

// Render the video look

// Get the video's notes


const getNoteData = ID => async () => {
    console.log("Getting notes for ID "+ID)
    const response = await axios.get("get_notes",{params: {video_id:ID}});
    return response.data;
}



const RightHandComponent = ({getList = ()=> {}}) => {
    const [list, setList] = useState([]);
    const [listActive, setListActive] = useState(true);
    const [index, increment] = useReducer(
        (index)=>index+1, list.length
    )
    const [buttonText, setButtonText] = useState("Hide List");
    const [load, reload] = useReducer(
        (load)=>!load
        , true);
    const toggleListActive = () => {
        console.log("App Video List changed from "+listActive);
        setListActive(!listActive);
        console.log(" to "+listActive);
        setButtonText(listActive?'Hide List':'Show List')
    }

    const addNote = newNote => {
        const {ID, video_id, location_index, content} = newNote;
        const add = {
            ID: ID, video_id:video_id, location_index:index
        };
        const addNote = [...list, add];
        setList(addNote)
    }

    useEffect(() => {
        if (load){
            ( async () => {
                const l = await getList();
                setList(l);
                console.log("ListSource || Using Effect, we obtained:");
                console.log(l);
            })();}
        // eslint-disable-next-line
    }, [load]);
    console.log('ListSource || List Loaded as:');
    console.log(list);

    return (
        <>
            <button onClick={toggleListActive}>{buttonText}</button>
            <button onClick={reload}>Reload</button>
        <p style={{ backgroundColor: 'red' }}>Some words!</p>
            <ul>
                {listActive &&
                    list.map((note) => (
                        <NoteInfo {...{ ['note']: note }} />
                    ))}
            </ul>
            <Note id={0} editor={true} appendList={addNote}/>

        </>
    );
}
const LeftHandComponent = ({ID}) => {
    return (
        <>
            <VideoTest id={{ID:ID}}/>
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
            <RightHandComponent getList={getNoteData(ID)} />
        </SplitScreen>
        </>
    );
}