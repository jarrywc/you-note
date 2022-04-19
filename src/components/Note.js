import React, {useEffect, useReducer, useState} from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
// import {NoteInfo} from "./NoteInfo";
// import {List} from "./List";
import {Link } from "react-router-dom";
import axios from "axios";
import {VideoSize as sizes} from "./style_tools/VideoSize";


// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const Note = ( { note, id } ) => {
    // Keep states from reload
    const [load, reload] = useReducer(
        (load)=>!load
        , true);

    //let navigate = useNavigate();
    // Template for NEW Blank Videos
    // const videoTemplate = {ID:0, ext_video_id:"", title:""}
    // ID must stay constant, user cannot modify. The ID is retrieved from video prop or URL params or template

    const { ID } = note || id; // || videoTemplate;

    const getData = async  () => {
        if(load){
            console.log("Getting note for ID "+ID)
            const response =  await axios.get("video", {params: {ID:ID}});
            setOriginalData(response.data)
            setData(response.data);
        }
    }
    // const [load, reload] = useReducer(
    //     (load)=>!load
    //     , true);
    useEffect(getData,[load]);

    // These are states that manage how video test looks
    // Original data is what is loaded from the DB or a blank template if this is a new video
    const [originalData, setOriginalData] = useState(video);//||videoTemplate);
    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(video);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, false);

    // onChangeVideo is the function that writes change to Data (not the DB)
    const onChange = changes => {
        console.log('Changed '+{changes})
        setData(prevState => {return{...prevState, changes}});
        console.log("Changed to "+data)
    }
    // onSaveVideo is the function that writes the Data to DB, and updates originalData
    const onSave = async () => {
        console.log('Saving' + {data} + " -- "+data)
        const response = await axios.post('note', {ID:ID, data } );
        setOriginalData(response.data);
        setData(response.data);
    }
    // onResetVideo is the function that reverts form field to the most recently *saved* state
    const onReset = () => {
        console.log('Reset')
        setData(originalData);
    }
    // Just some logging
    console.log("NoteInfo");
    console.log("id: "+ID)

    return data ? (
        <>

        <h4><button
            style={{ display: "block", margin: "1rem 0" }}
            onClick={()=>console.log('Clicked Button for '+data.title)}
            key={ID}>
                {data.title}
        </button></h4>
        <div>
            {ID}
            {data.ext_video_id}
        </div>

        <div>
            <ReactPlayer url={data.ext_video_id} height={sizes.small.height} width={sizes.small.width} />
        </div>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        readOnly={edit}
                        defaultValue={data.title}
                        onChange={e => {
                            setData(prevState => {return{...prevState, title: e.target.value }})
                        }} />
                </label>
                <label>
                    External Source/Url:
                    <input type="text"
                           readOnly={edit}
                           defaultValue={data.ext_video_id}
                           onChange={e => onChange({ ext_video_id: e.target.value })} />
                </label>
                <button onClick={toggle}>{edit?`Edit`:`Lock`}</button>
                <button onClick={onReset}>Reset</button>
                <button onClick={reload}>Reload</button>
                <button onClick={onSave}>Save Changes</button>
                <Link to={`/videos/${ID}`}>Open Video</Link>
                {/*<select value={size} onChange={onChangeSize}>*/}
                {/*    <option value="small">Small</option>*/}
                {/*    <option value="medium">Medium</option>*/}
                {/*    <option value="large">Large</option>*/}
                {/*</select>*/}
            </div>

        </>
    ): <p>Video loading...</p>;
}