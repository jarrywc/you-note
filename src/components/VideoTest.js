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
    const [originalData, setOriginalData] = useState(video);
    const [data, setData] = useState(video);
    const [edit, toggle] = useReducer((edit)=>!edit, false);
    const onChangeVideo = changes => {
        console.log('Changed '+{changes})
        setData(prevState => {return{...prevState, changes}});
        console.log("Changed to "+data)
    }

    const onSaveVideo = async () => {
        console.log('Saving' + {data} + " -- "+data)
        const response = await axios.post('video', {ID:ID, data } );
        setOriginalData(response.data);
        setData(response.data);
    }

    const onResetVideo = () => {
        console.log('Reset')
        setData(originalData);
    }
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

            {/*<div>*/}
            {/*    /!*External Movie Source*!/*/}
            {/*    <Iframe url={ext_video_id}*/}
            {/*            width="450px"*/}
            {/*            height="450px"*/}
            {/*            id="myId"*/}
            {/*            className="myMovie"*/}
            {/*            display="initial"*/}
            {/*            position="relative"/>*/}
            {/*</div>*/}
        </>
    ): <p>Video loading...</p>;
}