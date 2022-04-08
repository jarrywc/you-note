import React, {useEffect, useState} from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
import {NoteInfo} from "./NoteInfo";
import {List} from "./List";
import axios from "axios";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoTest = ( { video, select } ) => {
    const { ID, ext_video_id, title, notes } = video;

    const [originalData, setOriginalData] = useState(video);
    const [data, setData] = useState({});


    useEffect(() => {
        (async () => {
            const response = await axios.get('video');
            setOriginalData(response.data);
            setData(response.data);
        })();
    }, []);

    const onChangeVideo = changes => {
        console.log('Changed '+{changes})
        setData({ ...data, ...changes });
    }

    const onSaveVideo = async () => {
        console.log('Saved')
        const response = await axios.post('video', { ['video']: data });
        setOriginalData(response.data);
        setData(response.data);
    }

    const onResetVideo = () => {
        console.log('Reset')
        setData(originalData);
    }
    console.log("VideoInfo");
    console.log("id:"+ID)
    return video ? (
        <>
        <h4><button
            style={{ display: "block", margin: "1rem 0" }}
            onClick={select(video)}
            key={ID}>
                {title}
        </button></h4>
        <div>
            {ID}
            {ext_video_id}
        </div>

        <div>
            <ReactPlayer url={ext_video_id} />
        </div>
            <div>
                <List getList={()=>notes}
                      resourceName='note'
                      itemComponent={NoteInfo}

                />
            </div>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        defaultValue={title}
                        onChange={e => onChangeVideo({ title: e.target.value })} />
                </label>
                <label>
                    External Source/Url:
                    <input type="text"
                           defaultValue={ext_video_id}
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
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