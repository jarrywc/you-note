import {useEffect, useState} from "react";

export const List = ({
        getList = ()=> {},
        resourceName,
        itemComponent: ItemComponent,
    }) => {

    const [list, setList] = useState([]);

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
            {list.map((item, i) => (
                <ItemComponent sort={i} {...{ [resourceName]: item }} />
            ))}
        </>
    )
}