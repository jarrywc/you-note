import {useEffect, useState, useReducer} from "react";
import {Note} from "./Note";
import {NoteInfo} from "./NoteInfo";
//import {Link, Outlet} from "react-router-dom";


export const NoteList = ({
        getList = ()=> {},
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

            {
                listActive &&
                list.map((note, i) => (
                    <NoteInfo key={note.location_index }{...{ ['note']: note }} />
                ))
            }
            {
                includeEditor &&
                <Note id={0} editor={true}/>
            }
            {/*<Outlet />*/}
        </>
    )
}