import React from 'react';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoInfo = ( { video, select } ) => {
    const { id, user_id, ext_source, title } = video;

    console.log("VideoInfo");
    console.log("id:"+id)
    return video ? (
        <>

        <h4><Link
            style={{ display: "block", margin: "1rem 0" }}
            onClick={select(video)}
            to={`/videos/${id}`}
            key={id}>
                {title}
        </Link></h4>
        <div>
            {id}
            {user_id}
            {ext_source}
        </div>

        <div>
            <ReactPlayer url={ext_source} />
        </div>

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
}