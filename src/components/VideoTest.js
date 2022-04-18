import React, {useReducer, useState} from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
// import {NoteInfo} from "./NoteInfo";
// import {List} from "./List";
import axios from "axios";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoTest = ( { video, select } ) => {
    const videoTemplate = {ID:0, ext_video_id:"", title:""}
    const { ID } = video || videoTemplate;
    // These are states that manage how video test looks
    // Original data is what is loaded from the DB or a blank template if this is a new video
    const [originalData, setOriginalData] = useState(video);//||videoTemplate);
    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(video);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, false);
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
    console.log("id:"+data.ID)
    return video ? (
        <>
            <h4><button
                style={{ display: "block", margin: "1rem 0" }}
                onClick={select(data)}
                key={ID}>
                {data.title}
            </button></h4>
            <div>
                {ID}
                {data.ext_video_id}
            </div>

            <div>
                <ReactPlayer url={data.ext_video_id} />
            </div>
            {/*<div>*/}
            {/*    <List getList={()=>notes}*/}
            {/*          resourceName='note'*/}
            {/*          itemComponent={NoteInfo}*/}

            {/*    />*/}
            {/*</div>*/}
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
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
                <button onClick={toggle}>{edit?`Edit`:`Lock`}</button>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={onSaveVideo}>Save Changes</button>
            </div>

        </>
    ): <p>Video loading...</p>;
}