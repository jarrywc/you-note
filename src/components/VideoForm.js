import { withEditableResource } from "./withEditableResource";
import Iframe from "react-iframe";
import React from "react";

export const VideoInfoForm = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo }) => {
    const {  id, user_id, ext_source, title  } = video || {};

    return video ? (
        <>
            <p>
                <Iframe url={ext_source}
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
                    <input type="ext_source"
                           placeholder={ext_source}
                           value={ext_source}
                           onChange={e => onChangeVideo({ ext_source: e.target.value })} />
                </label>
                <button onClick={onResetVideo}>Reset</button>
                <button onClick={onSaveVideo}>Save Changes</button>
            </p>

        </>
    ) : <p>Loading...</p>;
}, 'videos', 'video');