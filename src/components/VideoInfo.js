import React from 'react';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoInfo = ({video}) => {
    const {id, user_id, ext_source, title } = video || {};

    return video ? (
        <>
            <h4>{title}</h4>
            <div>
                Here is some Video Text
                {id}
                {user_id}
                {ext_source}

            </div>

            <div>
                <ReactPlayer url={ext_source} />
            </div>

            <div>
                {/*External Movie Source*/}
                <Iframe url={ext_source}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myMovie"
                        display="initial"
                        position="relative"/>
            </div>
        </>
    ): <p>Video loading...</p>;
}