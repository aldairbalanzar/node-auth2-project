import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';

function UsersList(){
    const [message, setMessage] = useState()
    const [dataList, setDataList] = useState([]);

    const getUsersList = () => {
    axiosWithAuth()
    .get("http://localhost:5000/api/users")
    .then(res => {
        setDataList(res.data);
        setMessage(res.message)
        console.log('res: ', res)
    })
    .catch(err => {
            console.log('err: ', err.response);
            setMessage(err.response.data.message)
        })
    };

    useEffect(() => {
    getUsersList();
    }, []);
    return(
        <div>
            <p>{message}</p>
            {dataList.map(item => {
                return(
                <p>{item.username}</p>
                )
            })}
        </div>
    )
}

export default UsersList;