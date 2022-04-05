import React from 'react';

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const NoteInfo = ({note}) => {
    const {id, video_id, sort_id, content} = note || {};

    return note ? (
        <>
            <div>
                {id}
                {video_id}
                {sort_id}
                <p>Content: {content}</p>
            </div>

        </>
    ): <p>Note loading...</p>;
}