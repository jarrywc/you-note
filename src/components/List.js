
import React, {useEffect, useState, useReducer} from "react";
import {Note} from "./Note";
import {MDBBtn, MDBBtnGroup} from "mdb-react-ui-kit";
//import {Link, Outlet} from "react-router-dom";


export const List = ({
        getList = ()=> {},
        resourceName,
        includeEditor,
        itemComponent: ItemComponent,
    }) => {

    const [list, setList] = useState([]);
    const [listActive, setListActive] = useState(true);
    const [buttonText, setButtonText] = useState("Hide List");
    const [load, reload] = useReducer(
        (load)=>!load
        , true);
    const toggleListActive = () => {
        console.log("App Video List changed from "+listActive);
        setListActive(!listActive);
        console.log(" to "+listActive);
        setButtonText(listActive?'Hide List':'Show List')
    }

    useEffect(() => {
        if (load){
        ( async () => {
            const l = await getList();
            setList(l);
            console.log("ListSource || Using Effect, we obtained:");
            console.log(l);
        })();}
    // eslint-disable-next-line
    }, [load]);
    console.log('ListSource || List Loaded as:');
    console.log(list);



    return (
        <>
        
        <div className="move-demo">
            <MDBBtnGroup className="btn-group-sm">
            <MDBBtn className="btn-light" onClick={toggleListActive}>{buttonText}</MDBBtn>
            <MDBBtn className="btn-light" onClick={reload}>Reload</MDBBtn>
            </MDBBtnGroup>
        </div>
        <div className="move-demo2">
            {
                listActive &&
                list.map((item, i) => (
                    <ItemComponent sort={i}{...{ [resourceName]: item }} />
                ))
            }
            {
                includeEditor &&
                <Note id={0} editor={true}/>
            }
            {/*<Outlet />*/}
            </div>
        </>
    )
}
