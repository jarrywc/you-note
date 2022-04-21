import React, {useEffect, useReducer, useState, useRef} from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
// import {NoteInfo} from "./NoteInfo";
// import {List} from "./List";
import {Link } from "react-router-dom";
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import {VideoSize as sizes} from "./style_tools/VideoSize";
import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBInput, MDBRow, MDBBtnGroup, MDBCol
} from "mdb-react-ui-kit"
// import { Button, Modal } from "react-bootstrap";


// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoTest = ( { video, id, setTimeParent=()=>{}, videoNote } ) => {
    // Keep states from reload
    const [load, reload] = useReducer(
        (load)=>!load
        , true);

    //let navigate = useNavigate();
    // Template for NEW Blank Videos
    // const videoTemplate = {ID:0, ext_video_id:"", title:""}
    // ID must stay constant, user cannot modify. The ID is retrieved from video prop or URL params or template

    const { ID } = video || id; // || videoTemplate;

    const getVideoData = async  () => {
        if(load){
            console.log("Getting videos for ID "+ID)
            const response =  await axios.get("video", {params: {ID:ID}});
            setOriginalData(response.data)
            setData(response.data);
        }
    }
    // const [load, reload] = useReducer(
    //     (load)=>!load
    //     , true);
    // eslint-disable-next-line
    useEffect(()=>{getVideoData()},[]);

    // These are states that manage how video test looks
    // Original data is what is loaded from the DB or a blank template if this is a new video
    const [originalData, setOriginalData] = useState(video);//||videoTemplate);
    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(video);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, !videoNote);
    const [seek, setSeek] = useState()
    const player_ref = useRef()
    const [time, setTime] = useState();
    
    //function to convert seconds -> minutes and vice versa
    function hmsToSeconds(str) {
        var p = str.split(':'),
            s = 0, m = 1;
    
        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }
    
        return s;
    }
    
    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
    
      return h + ":" + m + ":" + s;
    }

    

    function handleTime(){
        setTime(secondsToHms(player_ref.current.getCurrentTime()));
        setTimeParent(secondsToHms(player_ref.current.getCurrentTime()));
        
    }
    
      const handleSeek = e => {
        var convert_seek = hmsToSeconds(seek)
        player_ref.current.seekTo(convert_seek)
      } 
      
    // onChangeVideo is the function that writes change to Data (not the DB)
    const onChangeVideo = changes => {
        console.log('Changed '+{changes})
        setData(prevState => {return{...prevState, changes}});
        console.log("Changed to "+data)
    }
    // onSaveVideo is the function that writes the Data to DB, and updates originalData
    const onSaveVideo = async () => {
        console.log('Saving' + {data} + " -- "+data)
        const response = await axios.post('video', {ID:ID, data } );
        setOriginalData(response.data);
        setData(response.data);
    }
    // onResetVideo is the function that reverts form field to the most recently *saved* state
    const onResetVideo = () => {
        console.log('Reset')
        setData(originalData);
    }
    // Just some logging
    console.log("VideoInfo");
    console.log("id: "+ID)
    // className="col col-lg-6 p-2 pt-4"
    return data ? (
        <>
            <div className="pb-2 pt-2">


                <MDBCard style={{height:"32rem", paddingBottom:"5px"}}>
                <MDBCardBody >
                <MDBCardTitle className="align-content-center">
                    {/*    <button*/}
                    {/*    style={{ display: "block", margin: "1rem 0" }}*/}
                    {/*    onClick={()=>console.log('Clicked Button for '+data.title)}*/}
                    {/*    key={ID}>*/}
                    {/*        {data.title}*/}
                    {/*</button>*/}
                            <Link to={`/videos/${ID}`} style={{textDecoration:"none"}}>{data.title}</Link>
                    </MDBCardTitle>
                
                <ReactPlayer 
                ref={player_ref}
                url={data.ext_video_id} 
                controls= {true}
                height="80%"
                width="100%" />
                
                {/*<label>*/}
                {/*    Title:*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        readOnly={edit}*/}
                {/*        defaultValue={data.title}*/}
                {/*        onChange={e => {*/}
                {/*            setData(prevState => {return{...prevState, title: e.target.value }})*/}
                {/*        }} />*/}
                {/*</label>*/}



                    {videoNote &&
                        <>
                        <MDBRow className="pt-2">
                            <MDBBtnGroup className="btn-group-sm">
                                <CopyToClipboard text={time}>
                                    <MDBBtn className="btn-secondary" onClick={handleTime}>+Timestamp</MDBBtn>
                                </CopyToClipboard>
                                <MDBBtn className="btn-light" onClick={handleSeek}>Jump</MDBBtn>
                            </MDBBtnGroup>
                        </MDBRow>
                        <MDBRow className="pt-2">
                        <MDBInput size="20" placeholder='Time Hop (h:m:s)' defaultValue='Time Hop (h:m:s)'
                                  onChange={event => setSeek(event.target.value)}/>
                        </MDBRow>
                        </>
                    }

                    {/*<select value={size} onChange={onChangeSize}>*/}
                {/*    <option value="small">Small</option>*/}
                {/*    <option value="medium">Medium</option>*/}
                {/*    <option value="large">Large</option>*/}
                {/*</select>*/}
                </MDBCardBody>
            </MDBCard>
            <MDBCard hidden={edit}>
                <MDBCardBody hidden={edit}>
                    <MDBRow hidden={edit}>
                        <MDBCol hidden={edit} className="pt-2">

                            <MDBRow>
                                <label hidden={edit} >
                                    Title:
                                    <input type="text"
                                           size="25"
                                           readOnly={edit}
                                           defaultValue={data.title}
                                           onChange={e => onChangeVideo({ title: e.target.value })} />
                                </label>
                            </MDBRow>


                        </MDBCol>
                        <MDBCol hidden={edit} className="pt-2 text-end">
                            <MDBBtnGroup className="btn-group-sm" hidden={edit}>
                                <MDBBtn hidden={edit} onClick={onResetVideo}>Reset</MDBBtn>
                                <MDBBtn hidden={edit} onClick={reload}>Reload</MDBBtn>
                                <MDBBtn hidden={edit} onClick={onSaveVideo}>Save</MDBBtn>
                            </MDBBtnGroup>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow hidden={edit} className="pt-4">
                        <label hidden={edit} >
                            External Source/Url:
                            <input type="text"
                                   readOnly={edit}
                                   size="40"
                                   defaultValue={data.ext_video_id}
                                   onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                        </label>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
                <MDBRow className="align-content-end">
                    <MDBCol>
                        <MDBBtn className="btn-light align-content-end" onClick={()=>toggle()}>{edit?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                        </svg>}</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    ): <p>Video loading...</p>;
}
