import React, {useEffect, useState} from 'react'

// THIS IS A TEMPLATE FOR ITERATING THROUGH A LIST
export const ListSource = ({getList = ()=> {}, resourceName, children }) => {
    const [list, setList] = useState(null);

    useEffect(() => {
        (  () => {
            const l =  getList();
            setList(l);
            console.log("ListSource || Using Effect, we obtained:");
            console.log(l);
        })();
    }, [getList]);

    console.log('ListSource || List Loaded as:');
    console.log(list);

    return (
        <>
        {React.Children.map( children, child => {
            if (React.isValidElement(child)) {
            console.log("IF, Resource Name:"+resourceName+" "+ child);
                return React.cloneElement(child, { [resourceName]: [list] });
            }

            console.log("Not valid element");
            return child;
        })}
        </>
    );

}