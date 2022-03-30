import React, {useEffect, useState} from 'react'

// THIS IS A TEMPLATE FOR ITERATING THROUGH A LIST
export const ListSource = ({getList = ()=>{}, resourceName, children }) => {
    const [list, setList] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getList();
            setList(data);
        })();
    }, [getList]);

    return (
        <>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { [resourceName]: list });
                }
                return child;
            })}
        </>
    );

}