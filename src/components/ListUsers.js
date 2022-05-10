import { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
const ListUsers = (props) => { 
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [addUser, setAddUser] = useState(false);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/users/all`).then((res)=> {
            // console.log(res.data)
            setUsers(res.data);
        }).catch((err) => console.log(err))
    },[name, props.update])
    const handleChange = (e) => {
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
            const newList = users.filter((user)=> user.name === name);
            setUsers(newList);  
    }

    const userDetail = (user) => {
        props.setUserDetail(user);
        props.setOnDetail(true);
    }
    return(
        <div className="m-3 p-5 flex flex-col border-2">
            <h4 className="w-11/12">LIST USERS</h4>
            <div className='flex'>
                <form className='flex w-full' onSubmit={handleSubmit}><input type="text" className='p-2 border-2 my-3 w-5/6' onChange={handleChange} value={name}></input><button type='submit' className='p-2 px-6 border-2 my-3 mx-3'>Search</button></form>
                <button className='p-2 px-6 border-2 my-3' onClick={()=> setAddUser(true)}>Add</button>
            </div>
            {/* {onUpdate ? <UpdateReqForm req={updateItem} setOnUpdate = {setOnUpdate}/> : <></>} */}
            {addUser? <AddUserForm setAddUser = {setAddUser}/> : <></>}
            <table className="table-fixed text-sm text-left border-2">
            <thead>
                <tr className='bg-slate-300 py-6'>
                    <th>Name</th>
                    <th>Ma NV</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => ( 
                    <tr key={user._id} onClick={()=>userDetail(user)}>
                       <td>{user.name}</td>
                       <td>{user.ma_nv}</td>
                       <td>{user.department}</td>
                       <td>{user.role}</td>
                       <td>{user.status}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            
            {/* <Pagination
        //   activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
        //   onChange={this.handlePageChange.bind(this)}
           /> */}
            
            
        </div>
    );
}

export default ListUsers;