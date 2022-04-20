import React, {useEffect, useReducer, useState} from 'react';
// import Iframe from 'react-iframe';
// import {NoteInfo} from "./NoteInfo";
// import {List} from "./List";
import axios from "axios";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertFromRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// THIS IS HOW THE NOTE WILL BE DISPLAYED
export const Note = ( { note, id, editor, appendList=()=>{} } ) => {
    // Keep states from reload
    const [load, reload] = useReducer(
        (load)=>!load
        , true);

    //let navigate = useNavigate();
    // Template for NEW Blank Videos
    const videoTemplate = {ID:0, ext_video_id:"", title:""}
    // ID must stay constant, user cannot modify. The ID is retrieved from video prop or URL params or template

    const { ID } = note || id; // || videoTemplate;

    const getData = async  () => {
        if(editor){
            console.log("Editor is active with data"+videoTemplate)
            setOriginalData(videoTemplate);
            setData(videoTemplate);
        }
        else if(load){
            console.log("Getting note for ID "+ID)
            const response =  await axios.get("video", {params: {ID:ID}});
            setOriginalData(response.data)
            setData(response.data);
        }
    }
    // const [load, reload] = useReducer(
    //     (load)=>!load
    //     , true);
    useEffect(getData,[load]);

    // These are states that manage how video test looks
    // Original data is what is loaded from the DB or a blank template if this is a new video
    const [originalData, setOriginalData] = useState(note);//||videoTemplate);
    // Data is the active state of the form field while editing but before saving to DB
    const [data, setData] = useState(note);
    // Edit is the state of the capability to change the form field contents or leave it as static
    const [edit, toggle] = useReducer((edit)=>!edit, false);

    // // Editor experiments
    // const [editorState, setEditorState] = useState(() =>
    //     EditorState.createEmpty()
    // );
    // useEffect(() => {
    //     console.log(editorState);
    // }, [editorState]);

    // onChangeVideo is the function that writes change to Data (not the DB)
    const onChange = changes => {
        console.log('Changed '+{changes})
        setData(prevState => {return{...prevState, changes}});
        console.log("Changed to "+data)
    }
    // onSaveVideo is the function that writes the Data to DB, and updates originalData
    const onSave = async () => {
        console.log('Saving' + {data} + " -- "+data)
        const response = await axios.post('note', {ID:ID, data } );
        setOriginalData(response.data);
        setData(response.data);
    }
    // append to the a list
    const append = async() => {
            const new_note = await appendList(data)
            console.log("Note || Added to List");
            console.log(new_note);
    }
    // onResetVideo is the function that reverts form field to the most recently *saved* state
    const onReset = () => {
        console.log('Reset')
        setData(originalData);
    }
    // Just some logging
    console.log("NoteInfo");
    console.log("id: "+ID)

    return data ? (
        <>

            <div>
                <label>
                    <textarea
                        aria-rowcount={5}
                        aria-colcount={50}
                        readOnly={edit}
                        defaultValue={data.content}
                        onChange={e => {
                            setData(prevState => {return{...prevState, content: e.target.value }})
                        }} />
                </label>

                {/*{*/}
                {/*<div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>*/}
                {/*    <Editor*/}
                {/*        editorState={editorState}*/}
                {/*        onEditorStateChange={setEditorState}*/}
                {/*            />*/}
                {/*    </div>*/}
                {/*    }*/}

                <button hidden onClick={toggle}>{edit?`Edit`:`Lock`}</button>
                <button hidden onClick={onReset}>Reset</button>
                <button hidden onClick={reload}>Reload</button>
                <button hidden onClick={onSave}>Save</button>
                <button onClick={append}>`->-^`</button>
                {/*<select value={size} onChange={onChangeSize}>*/}
                {/*    <option value="small">Small</option>*/}
                {/*    <option value="medium">Medium</option>*/}
                {/*    <option value="large">Large</option>*/}
                {/*</select>*/}
            </div>

        </>
    ): <p>Loading...</p>;
}