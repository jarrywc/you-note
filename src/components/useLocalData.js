import {useEffect, useState} from "react";

export const useLocalData = getLocalData => {
    const [state, setState] = useState([]);
    useEffect(() => {
        ( async () => {
            const data = await getLocalData();
            setState(data);
            console.log(state)
        })();
    }, [getLocalData]);
    return state
}