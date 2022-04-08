import {SplitScreen} from "./style_tools/SplitScreen";
import {Link, Outlet, useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import React, {useContext, useEffect, useState} from "react";
import {VNContext} from "../App";

// Page entry -> props: video id

// Get a video

// Render the video look

// Get the video's notes


const LeftHandComponent = ({ video }) => {
    const { ID, user_id, ext_source, title } = video;

    return (
        <>
        <h1 style={{ backgroundColor: 'green' }}>{title}</h1>
            <h4><Link
                style={{ display: "block", margin: "1rem 0" }}
                key={ID}>
                {title}
            </Link></h4>
            <div>
                {ID}
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
export const VideoNote = () => {
    let params = useParams();
    const { videoNote } = useContext(VNContext);
    return (
        <VNContext.Consumer>
        {
            <SplitScreen leftWeight={3} rightWeight={2}>
                <LeftHandComponent video={videoNote} />
                <RightHandComponent message="Hello" />
            </SplitScreen>
        }
        <Outlet />
        </VNContext.Consumer>
    );
}