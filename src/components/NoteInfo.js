//import React, {useState} from 'react';
// import DOMPurify from 'dompurify';
// import { convertToHTML } from 'draft-convert'

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const NoteInfo = ({note}) => {
    const {ID, video_id, location_index, content} = note;// || {};
    // const [htmlContent, setHtmlContent] = useState("");
    // let currentContentAsHTML = convertToHTML(content);
    // setHtmlContent(currentContentAsHTML);
    //
    // const createMarkup = (html) => {
    //     return  {
    //         __html: DOMPurify.sanitize(html)
    //     }
    // }

    return note ? (
        <>
            <li key={location_index.toString()} about={"ID: "+ID+" video_id: "+video_id+" location_index "+location_index}>
                <p style={{overflowWrap: "break-word",
                    wordWrap: "break-word",
                    hyphens: "auto"}}>{content}</p>
                {/*<div dangerouslySetInnerHTML={createMarkup(htmlContent)}/>*/}
            </li>

        </>
    ): <p>Note loading...</p>;
}