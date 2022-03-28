import React from 'react'
import Iframe from 'react-iframe'
import ReactPlayer from "react-player";

export const VideoInfo = ({video}) => {
    const {Id, User_Id, Ext_Movie_Source, Title } = video || {};

    return video ? (
        <>
            <div>
                {Id}
                {User_Id}
                {Ext_Movie_Source}
                {Title}
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