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

const RightHandComponent = ({videoId, getList = ()=> {}, timeStamp, getTime=()=>{}}) => {
    const [list, setList] = useState([]);
    const [listActive, setListActive] = useState(true);
    const [index, increment] = useReducer(
        (index)=>index+1, list.length+1
    )
    const [time, setTime] = useState("")

    useEffect(()=>{
        console.log("Lastest TS sent from button in Video"+timeStamp);
        setTime(timeStamp);
    }, [timeStamp]);

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
        let ts = getTime();
        console.log("TS in Note List Right side is"+ts);
        console.log("List length is")
        console.log(" New Note adding "+newNote);
        let {content, ID} = newNote;
        let add = { ID:ID, location_index:index, content:content };
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
                <Note video_id={videoId}
                      id={0} editor={true}
                      appendList={addNote}
                      toggleList={setListActive}
                      listShow={listActive}
                    currentTime={time}/>

            </MDBCard>

            </MDBContainer>
        </>
    );
}
const LeftHandComponent = ({ID, setTimeGrandParent}) => {
    return (
        <>
            <MDBContainer className="p-1 pt-2">
            <VideoTest id={{ID:ID}} setTimeParent={setTimeGrandParent}/>
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
    const [time, setTime] = useState("")

    const setTimeGG = (time) => {
        console.log("Video told told time to GG Video Note"+time);
        setTime(time);
    }
    const getTimeVN = () => {
        console.log("Time getting sent from VideoNote to Note List: "+time);
      return time;
    }

    return (
        <>
        <SplitScreen leftWeight={3} rightWeight={3}>
            <LeftHandComponent ID={ID} setTimeGrandParent={setTimeGG} />
            <RightHandComponent videoId={ID} getList={getNoteData(ID)} timeStamp={time} getTime={getTimeVN} />
        </SplitScreen>
        </>
    );
}