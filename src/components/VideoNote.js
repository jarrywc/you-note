import {SplitScreen} from "./style_tools/SplitScreen";
import {Link, useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import React from "react";

// Page entry -> props: video id

// Get a video

// Render the video look

// Get the video's notes


const LeftHandComponent = ({ name, video }) => {
    const { id, user_id, ext_source, title } = video;

    return (
        <>
        <h1 style={{ backgroundColor: 'green' }}>{name}</h1>
            <h4><Link
                style={{ display: "block", margin: "1rem 0" }}
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
        </>
    );
}

const RightHandComponent = ({ message }) => {
    return (
        <>
        <p style={{ backgroundColor: 'red' }}>{message}!</p>


        </>
    );
}
// Props includes the video object
export const VideoNote = ({video}) => {

    let params = useParams();

    return (
        <>
        <SplitScreen leftWeight={3} rightWeight={2}>
            <LeftHandComponent name={params.videoId} video={video} />
            <RightHandComponent message="Hello" />
        </SplitScreen>
        </>
    );
}