import React from 'react'

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
        </>
    ): <p>Video loading...</p>;
}