import { withEditableResource } from "./withEditableResource";
// import Iframe from "react-iframe";
import React from "react";
import ReactPlayer from "react-player";
import {List} from "./List";
import {NoteInfo} from "./NoteInfo";

export const VideoInfoForm = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo, select }) => {
    console.log("Video Form Received"+video)
    const {  ID, ext_video_id, title, notes  } = video || {};
    console.log("VideoInfo");
    console.log("id:"+ID)
    return video ? (
        <>
            <p>
                <h4><button
                    style={{ display: "block", margin: "1rem 0" }}
                    onClick={select(video)}
                    key={ID}>
                    {title}
                </button></h4>
                <div>
                    <ReactPlayer url={ext_video_id} />
                </div>
                <div>
                    <List getList={()=>notes}
                          resourceName='note'
                          itemComponent={NoteInfo}

                    />
                </div>
            </p>
            <p>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={e => onChangeVideo({ title: e.target.value })} />
                </label>
                <label>
                    External Source/Url:
                    <input type="text"
                           value={ext_video_id}
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={onSaveVideo}>Save Changes</button>
            </p>

        </>
    ) : <p>Loading...</p>;
}, 'video', 'video');