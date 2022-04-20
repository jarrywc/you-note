import React from 'react';

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const NoteInfo = ({note}) => {
    const {ID, video_id, location_index, content} = note;// || {};

    return note ? (
        <>
            <li key={location_index.toString()} about={"ID: "+ID+" video_id: "+video_id+" location_index "+location_index}>
                <p>{content}</p>
            </li>

        </>
    ): <p>Note loading...</p>;
}