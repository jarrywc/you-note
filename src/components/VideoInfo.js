import React from 'react';
// import Iframe from 'react-iframe';
import ReactPlayer from "react-player";

// THIS IS HOW THE VIDEO WILL BE DISPLAYED
export const VideoInfo = ( { video, select } ) => {
    const { ID, user_id, ext_video_id, title } = video;

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
            {user_id}
            {ext_video_id}
        </div>

        <div>
            <ReactPlayer url={ext_video_id} />
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