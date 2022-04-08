import { withEditableResource } from "./withEditableResource";
import Iframe from "react-iframe";
import React from "react";

export const VideoInfoForm = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo }) => {
    const {  ID, user_id, ext_source, title  } = video || {};

    return video ? (
        <>
            <p>
                <Iframe url={ext_video_id}
                       width="450px"
                       height="450px"
                       id="myId"
                       className="myMovie"
                       display="initial"
                       position="relative"/>
            </p>
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

        </>
    ) : <p>Loading...</p>;
}, 'videos', 'video');