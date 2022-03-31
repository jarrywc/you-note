import React, {useEffect, useState} from 'react'

// THIS IS A TEMPLATE FOR ITERATING THROUGH A LIST
export const ListSource = ({getList = ()=>{}, resourceName, children }) => {
    const [listLoaded, setListLoaded] = useState([]);

    useEffect(() => {
        ( async () => {
            const list =  getList();
            setListLoaded(list);
            console.log(list)
        })();
    }, []);

    return (
        <>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { [resourceName]: listLoaded });
                }
                return child;
            })}
        </>
    );

}