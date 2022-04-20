import {SplitScreen} from "./style_tools/SplitScreen";
import {useParams} from "react-router-dom";
import axios from "axios";
import {VideoTest} from "./VideoTest";
import React, {useEffect, useReducer, useState} from 'react';
//import {NoteList} from "./NoteList";
import {NoteInfo} from "./NoteInfo";
import {Note} from "./Note";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBContainer } from "mdb-react-ui-kit"
// import { Button, Modal } from "react-bootstrap";


const getNoteData = ID => async () => {
    console.log("Getting notes for ID "+ID)
    const response = await axios.get("get_notes",{params: {video_id:ID}});
    return response.data;
}

const RightHandComponent = ({videoId, getList = ()=> {}}) => {
    const [list, setList] = useState([]);
    const [listActive, setListActive] = useState(true);
    const [index, increment] = useReducer(
        (index)=>index+1, list.length+1
    )

    const [load, reload] = useReducer(
        (load)=>!load
        , true);
    // const toggleListActive = () => {
    //     console.log("App Video List changed from "+listActive);
    //     setListActive(!listActive);
    //     console.log(" to "+listActive);
    //     setButtonText(listActive?'Hide List':'Show List')
    // }

    const addNote = newNote => {
        console.log("List length is")
        console.log(" New Note adding "+newNote);
        let {content} = newNote;
        let add = { ID:index, location_index:index, content:content };
        const addNote = [...list, add];
        setList(addNote);
        increment()
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
            <MDBContainer className="pt-3" >

            <button hidden onClick={reload}>Reload</button>
            <MDBCard>
                <MDBCardTitle className="p-3 align-content-center text-center h3">Notes</MDBCardTitle>
                <MDBCardBody style={{
                    height:"400px",
                    overflowY: "scroll"}}>
                    <ul className="list-unstyled">
                        {listActive &&
                            list.map((note) => (
                                <NoteInfo note={note} />
                            ))}
                    </ul>
                </MDBCardBody>
            </MDBCard>
            <div className="p-1"/>
            <MDBCard>
                <Note video_id={videoId} id={0} editor={true} appendList={addNote} toggleList={setListActive} listShow={listActive}/>

            </MDBCard>

            </MDBContainer>
        </>
    );
}
const LeftHandComponent = ({ID}) => {
    return (
        <>
            <MDBContainer className="p-1 pt-2">
            <VideoTest id={{ID:ID}}/>
        </MDBContainer>
        </>
    );
}

// Props includes the video object
export const VideoNote = () => {
    // Clears Searches if they are there
    document.getElementById("changeable").innerHTML = "";
    let {ID} = useParams();
    console.log("---------P"+ ID);
    return (
        <>
        <SplitScreen leftWeight={3} rightWeight={2}>
            <LeftHandComponent ID={ID} />
            <RightHandComponent videoId={ID} getList={getNoteData(ID) } />
        </SplitScreen>
        </>
    );
}