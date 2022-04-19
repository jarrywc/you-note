import React from 'react';

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const NoteInfo = ({note}) => {
    const {ID, video_id, location_index, content} = note;// || {};

    return note ? (
        <>
            <li>
                {ID}
                {video_id}
                {location_index}
                <p>Content: {content}</p>
            </li>

        </>
    ): <p>Note loading...</p>;
}