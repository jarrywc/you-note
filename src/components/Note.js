import React, {  useReducer, useState} from 'react';
import axios from "axios";
import {MDBBtn, MDBBtnGroup, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const Note = ( { video_id, note, id, appendList=()=>{}, toggleList=()=>{}, listShow, currentTime } ) => {

    const noteTemplate = {ID:0, video_id:video_id, content:"", location_index:1 }
    // ID must stay constant, user cannot modify. The ID is retrieved from video prop or URL params or template

    const { ID } = note || id; // || videoTemplate;

    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(noteTemplate);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, true);
    const [addTS, toggleTS] = useReducer((addTS)=>!addTS, true);

    const resetDataContent = () => { setData(prevState => {return{...prevState, content: "" }});};

    const handleChange = e => {setData(prevState => {return{...prevState, content: e.target.value  }});};

    const append = async () => {
        contentTimeStamp().then(value => appendDB(value)).then(value => appendListParent(value));
    }

    const contentTimeStamp = async () => {
        // Timestamp Enabled ?? What to do....
        if (addTS){
            let time = " : "+currentTime.toString();
            let send = data.content+ time;
            console.log("TS Status: "+addTS+"with CONTENT:: "+ send);
            let note = {ID:0, video_id:noteTemplate.video_id, content:send, location_index:1 }
            //setData(note);
            // Log it
            console.log("Data About to send ID "+data.ID+" and content "+data.content);
            return note;
        } else {
            let send = data.content
            console.log("TS Status: "+addTS+"with CONTENT:: "+ send);
            let note = {ID:0, video_id:noteTemplate.video_id, content:send, location_index:1 }
            //setData(note);
            // Log it
            console.log("Data About to send ID "+data.ID+" and content "+data.content);
            return note;
        }


    }

    // append to the Note list
    const appendDB = async (data) => {
            // Send Data to DB
            let response = await axios.post("note", {ID: 0, data});
            // Some logging
            console.log("Server replied: "+ response.data);
            // Temp store the results
            return response.data;
    }

    const appendListParent = async (confirmedNote)=>{
        if (confirmedNote !== "Blank Note") {// Add note to the list
            const new_note = await appendList(confirmedNote)
            console.log("Note || Added to List");
            console.log(new_note);
            // let dataTemp = {
            //     ID:0, content:"", video_id:data.video_id, location_index: 1
            // }
            resetDataContent();
            console.log("DATA SHOULD RESET TO ID" + data.ID + " Content " + data.content);
        } else {
            alert("Could't send blank note");
        }
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
                        onChange={handleChange}
                        value={data.content}/>
                    <MDBBtn onClick={append}/>

                </div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="col-6">
                            <MDBBtnGroup>
                                <MDBBtn className={edit?"btn-secondary":"btn-light"} onClick={()=>toggle()}>{edit?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                                </svg>: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-lock" viewBox="0 0 16 16">
                                    <path
                                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>}
                                </MDBBtn>
                                <MDBBtn className={listShow?"btn-light":"btn-secondary"} onClick={toggleListActive} >{buttonText}</MDBBtn>
                                <MDBBtn className={addTS?"btn-success":"btn-warning"} onClick={()=>toggleTS()}>
                                        {addTS?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                 className="bi bi-clock-fill success" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                            </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                               className="bi bi-clock " viewBox="0 0 16 16">
                                                <path
                                                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path
                                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                        }
                                    </MDBBtn>
                            </MDBBtnGroup>
                        </MDBCol>
                        <MDBCol className="text-center h5 pt-2" >
                            <b>{currentTime}</b>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBContainer>

        </div>
    ): <p>Loading...</p>;
}
