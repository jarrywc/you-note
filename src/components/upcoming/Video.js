import React from 'react';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
import {withEditableResource} from "../withEditableResource";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const Video = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo }) => {
    const { ID, user_id, ext_video_id, title } = video;
    // User ID will need to be locked on the backend by conditionals that prevent changing a user_id for a video instance

    console.log("VideoInfo");
    console.log("id:"+ID)
    return video ? (
        <>
            <h4>{title}</h4>
            <div>
                {ID}
                {user_id}
                {ext_video_id}
            </div>

            <div>
                <ReactPlayer url={ext_video_id} />
            </div>

            <p>
                <label>
                    Title:
                    <input
                        placeholder={title}
                        value={title}
                        onChange={e => onChangeVideo({ title: e.target.value })} />
                </label>
                <label>
                    External Source/Url:
                    <input type="ext_video_id"
                           placeholder={ext_video_id}
                           value={ext_video_id}
                           onChange={e => onChangeVideo({ ext_video_id: e.target.value })} />
                </label>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={onSaveVideo}>Save Changes</button>
            </p>

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
}, 'videos', 'video');