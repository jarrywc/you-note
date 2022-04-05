import React from 'react';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
import {withEditableResource} from "../withEditableResource";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const Video = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo }) => {
    const { id, user_id, ext_source, title } = video;
    // User ID will need to be locked on the backend by conditionals that prevent changing a user_id for a video instance

    console.log("VideoInfo");
    console.log("id:"+id)
    return video ? (
        <>
            <h4>{title}</h4>
            <div>
                {id}
                {user_id}
                {ext_source}
            </div>

            <div>
                <ReactPlayer url={ext_source} />
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
                    <input type="ext_source"
                           placeholder={ext_source}
                           value={ext_source}
                           onChange={e => onChangeVideo({ ext_source: e.target.value })} />
                </label>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={onSaveVideo}>Save Changes</button>
            </p>

            {/*<div>*/}
            {/*    /!*External Movie Source*!/*/}
            {/*    <Iframe url={ext_source}*/}
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