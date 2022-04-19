import React, {useEffect, useReducer, useState} from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
// import {NoteInfo} from "./NoteInfo";
// import {List} from "./List";
import {Link } from "react-router-dom";
import axios from "axios";
import {VideoSize as sizes} from "./style_tools/VideoSize";

// Size the video State, take in initial_size if nothing set then use small
// const [size, setSize] = useState(sizes.small)
// // onChangeSize set the size
// const onChangeSize = new_size => {
//     console.log("Size changes to "+new_size)
//     setSize(new_size)
// }
// Set load state for usage in VideoNote


//  Use this effect to change the sizes of video
// useEffect(() => {
//         ( async () => {
//             const s = await changeSize();
//             setSize(s)
//             console.log("Video Size || Using Effect, we obtained:");
//             console.log(s);
//         })();
//     // eslint-disable-next-line
// }, [size]);


// select=()=>{}, getVideo=()=>{}, initial_size, changeSize=()=>{}

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoTest = ( { video, id } ) => {
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
    useEffect(getVideoData,[load]);

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
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
                <button onClick={toggle}>{edit?`Edit`:`Lock`}</button>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={reload}>Reload</button>
                <button onClick={onSaveVideo}>Save Changes</button>
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