import React from 'react';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoInfo = ({video}) => {
    const {id, user_id, ext_source, title } = video || {};

    return video ? (
        <>
            <div>
                {id}
                {user_id}
                {ext_source}
                {title}
            </div>

            <div>
                <ReactPlayer url={Ext_Movie_Source} />
            </div>

            <div>
                {/*External Movie Source*/}
                <Iframe url={Ext_Movie_Source}
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