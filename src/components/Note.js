import React, {  useReducer, useState} from 'react';
import axios from "axios";
import {MDBBtn, MDBContainer} from "mdb-react-ui-kit";

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const Note = ( { video_id, note, id, appendList=()=>{}, toggleList=()=>{}, listShow } ) => {

    const noteTemplate = {ID:0, video_id:video_id, content:"", location_index:1 }
    // ID must stay constant, user cannot modify. The ID is retrieved from video prop or URL params or template

    const { ID } = note || id; // || videoTemplate;

    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(noteTemplate);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, true);

    // append to the a list
    const append = async() => {
        // Inner data must have correct Note -> If new send with zero
        setData(prevState => {return{...prevState, ID:0 }});
        // Send Data to DB
        const response =  await axios.post("note", {ID:0, data});
        // Some logging
        console.log(response.data)
        // Temp store the results
        let confirmedNote = response.data
        // Set results to Data (Should have ID now)
        setData(confirmedNote);
        // Add note to the list
        const new_note = await appendList(data)
        console.log("Note || Added to List");
        console.log(new_note);
        setData(prevState => {return{...prevState, content: "" }});
        //setOriginalData(prevState => {return{...prevState, content: "" }});
    }
    // Just some logging
    console.log("NoteInfo");
    console.log("id: "+ID)

    // Here is the magic that make Enter (or CRL+Enter) submit note line item
    function KeyPress(e) {
        if (e.keyCode === 13){
            append();
        }
        // if (e.keyCode === 13 && e.ctrlKey){
        //     append()
        // }
    }
    const [buttonText, setButtonText] = useState("Hide List");
    const toggleListActive = () => {
        console.log("App Video List changed from "+listShow);
        toggleList(!listShow);
        console.log(" to "+listShow);
        setButtonText(listShow?'Hide List':'Show List')
    }
    //
    document.onkeydown = KeyPress;
    return data ? (
        <div>

            <MDBContainer className='pt-2 pb-2'>
                <div className="input-group p-1">

                    <textarea
                        style={{height:"90px"}}
                        rows="3"
                        className="form-control"
                        readOnly={edit}
                        defaultValue={data.content}
                        onChange={
                        e => {setData(prevState =>
                        {return{...prevState, content: e.target.value }}

                            )}

                        }
                        value={data.content}/>
                    <MDBBtn onClick={append}/>

                </div>
                <MDBBtn onClick={()=>toggle()}>{edit?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-unlock" viewBox="0 0 16 16">
                        <path
                            d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                    </svg>: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-lock" viewBox="0 0 16 16">
                        <path
                            d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                    </svg>}</MDBBtn>
                <span className="p-1 text-center text-muted" >
                    <small>
                        <strong><button onClick={toggleListActive} >{buttonText}</button></strong>    Press Enter to Add
                    </small></span>
            </MDBContainer>

        </div>
    ): <p>Loading...</p>;
}
