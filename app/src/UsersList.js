import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList(){
    const [status, setstatus] = useState()
    const [dataList, setDataList] = useState([]);

    const getUsersList = () => {
    axios
    .get("http://localhost:5000/api/users")
    .then(res => {
        setDataList(res.data.users);
        setstatus(res.status)
        console.log(status)
    })
    .catch(err => console.log(err.response));
    };

    useEffect(() => {
    getUsersList();
    }, []);
    return(
        <div>
            {dataList.map(item => {
                return(
                <p>{item.username}</p>
                )
            })}
        </div>
    )
}

export default UsersList;