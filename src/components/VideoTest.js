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
    MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBInput, MDBRow, MDBBtnGroup
} from "mdb-react-ui-kit"
// import { Button, Modal } from "react-bootstrap";


// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoTest = ( { video, id, setTimeParent=()=>{} } ) => {
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
    const [edit, toggle] = useReducer((edit)=>!edit, false);
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
            <MDBCard style={{height:"30rem", paddingBottom:"5px"}}>
                <MDBCardBody >
                <MDBCardTitle className="align-content-center text-center">
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
                <label hidden >
                    External Source/Url:
                    <input type="text"
                           readOnly={edit}
                           defaultValue={data.ext_video_id}
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
                <button hidden onClick={toggle}>{edit?`Edit`:`Lock`}</button>
                <button hidden onClick={onResetVideo}>Reset</button>
                <button hidden onClick={reload}>Reload</button>
                <button hidden onClick={onSaveVideo}>Save Changes</button>
                    <MDBRow className="pt-2">
                        <MDBBtnGroup className="btn-group-sm">
                            <CopyToClipboard text={time}>
                                <MDBBtn className="btn-secondary" onClick ={handleTime}>+Timestamp</MDBBtn>
                            </CopyToClipboard>
                            <MDBBtn className="btn-light"  onClick={handleSeek}>Jump</MDBBtn>
                        </MDBBtnGroup>
                        <MDBInput size="20" placeholder='Time Hop (h:m:s)' defaultValue='Time Hop (h:m:s)' onChange={event => setSeek(event.target.value)} />
                    </MDBRow>
                {/*<select value={size} onChange={onChangeSize}>*/}
                {/*    <option value="small">Small</option>*/}
                {/*    <option value="medium">Medium</option>*/}
                {/*    <option value="large">Large</option>*/}
                {/*</select>*/}
                </MDBCardBody>
            </MDBCard>
            </div>
        </>
    ): <p>Video loading...</p>;
}
