import React, {useReducer, useState, useRef} from 'react';
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
    const [seek, setSeek] = useState()
    const player_ref = useRef()

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

    const handleTime = e => {
        console.log(secondsToHms(player_ref.current.getCurrentTime()))
      }
    
      const handleSeek = e => {
        var convert_seek = hmsToSeconds(seek)
        player_ref.current.seekTo(convert_seek)
      }

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
            <ReactPlayer 
            ref={player_ref}
            url={data.ext_video_id} 
            controls= {true}
            />
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
                <button onClick={handleTime} >Timestamp</button>
                <input size="20" placeholder='Time to Jump (h:m:s)' onChange={event => setSeek(event.target.value)} ></input>
                <button onClick={handleSeek}>Jump</button>
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
