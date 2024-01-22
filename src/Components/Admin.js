import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';


function Admin() {
    const [responsedata, setResponsedata] = useState([]);
    const redirect = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem("loginemail");
        redirect("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:2000/allusers", {
                })
                if (response.status === 200) {
                    setResponsedata(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log(error);
                } else {
                    console.error("Error: ", error);
                }
            }
        };
        // Call fetchData when the component mounts
        fetchData();
    }, [])

    const deleteuser = async (email) => {
        try {
            const response = await axios.delete(`http://localhost:2000/deleteUser/${email}`)
            if (response.status === 200) {
                setResponsedata(prevData => prevData.filter(user => user.Email !== email));
            }
        } catch (error) {
            console.log("Error is", error);
        }

    }
    return (
        <>

            <div class="container-fluid">
                <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className='btn-logout'>
                    <h2>Welcome To Admin Panel</h2>
                    <button className='c-logout' onClick={handleLogout}>LogOut</button>
                </div>

            </div>

            <div class="container-fluid">

                <div class="card shadow border-0 mb-7">
                    <div class="card-header">
                        <h5 class="mb-0">User List</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-dark">
                                <tr>
                                    <th>S.No.</th>
                                    <th>User_ID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>User_Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(responsedata) &&
                                    responsedata.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.id}</td>
                                            <td>{data.Email}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.type}</td>
                                            {/* <td>
                                                <button onClick={deleteuser.bind(null, data.Email)}>Delete</button>
                                            </td> */}
                                            <td >
                                                <button type="button"
                                                    class="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={deleteuser.bind(null, data.Email)}>
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;

