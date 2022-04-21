import React, { useState, useEffect } from 'react';
import axios from 'axios';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


// PLEASE RE-USE THIS CODE FOR EDITABLE ITEMS
export const withEditableResource = (Component, resourcePath, resourceName) => {
    return props => {
        const [originalData, setOriginalData] = useState([resourceName]);
        const [data, setData] = useState([resourceName]);


        useEffect(() => {
            (async () => {
                const response = await axios.get(resourcePath);
                setOriginalData(response.data);
                setData(response.data);
            })();
        }, []);

        const onChange = changes => {
            console.log('Changed '+{changes})
            setData({ ...data, ...changes });
        }

        const onSave = async () => {
            console.log('Saved')
            const response = await axios.post(resourcePath, { [resourceName]: data });
            setOriginalData(response.data);
            setData(response.data);
        }

        const onReset = () => {
            console.log('Reset')
            setData(originalData);
        }

        const resourceProps = {
            [resourceName]: data,
            [`onChange${capitalize(resourceName)}`]: onChange,
            [`onSave${capitalize(resourceName)}`]: onSave,
            [`onReset${capitalize(resourceName)}`]: onReset,
        }

        return <Component {...props} {...resourceProps} />
    }
}