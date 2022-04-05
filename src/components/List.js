import {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";

export const List = ({
        getList = ()=> {},
        selectItem = () => {},
        resourceName,
        itemComponent: ItemComponent,
    }) => {

    const [list, setList] = useState([]);
    const [listActive, setListActive] = useState(false);

    const toggleListActive = () => {
        console.log("App Video List changed from "+listActive);
        setListActive(!listActive);
        console.log(" to "+listActive);
    }

    useEffect(() => {
        ( async () => {
            const l = await getList();
            setList(l);
            console.log("ListSource || Using Effect, we obtained:");
            console.log(l);
        })();
    }, []);
    console.log('ListSource || List Loaded as:');
    console.log(list);

    return (
        <>
            <Link to="/videos" onClick={toggleListActive}>Change State</Link>
            {list.map((item, i) => (
                <ItemComponent sort={i} select={selectItem} {...{ [resourceName]: item }} />
            ))}
            <Outlet />
        </>
    )
}