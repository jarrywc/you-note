import React from 'react';

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const NoteInfo = ({note}) => {
    const {ID, video_id, location_index, content} = note;// || {};

    return note ? (
        <>
            <li key={ID.toString()} about={"ID: "+ID+" video_id: "+video_id+" location_index "+location_index}>
                <p style={{overflowWrap: "break-word",
                    wordWrap: "break-word",
                    hyphens: "auto"}}>{content}</p>
            </li>

        </>
    ): <p>Note loading...</p>;
}