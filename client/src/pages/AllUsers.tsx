import React,{useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import {  updateBanUser, updateUnbanUser } from 'services/UserService';
import { getAllUsers } from 'services/UserService'

const AllUsers = () => {
 
    const [users, setUsers] = useState([{
        _id: '',
        name: '',
        email: '',
        phone: 0,
        isBanned: 0
      }]);
    
    const fetchAllUsers = async () => {
        try {
            const result = await getAllUsers();
            setUsers(result.user);
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
 
   useEffect(() => {
        fetchAllUsers()
    },[])

    console.log(users);

    const handleBanUnban = async (userId:string) =>{
        try {
            const user = users.find((user) => user._id === userId);

            if (user) {
                const updatedUsers = users.map((user) =>
                  user._id === userId ? { ...user, isBanned: user.isBanned === 0 ? 1 : 0 } : user
                );
                setUsers(updatedUsers);
                user.isBanned === 0 ? updateBanUser(userId) : updateUnbanUser(userId);

                toast.success(`User ${user.isBanned === 0 ? 'banned' : 'unbanned'} successfully.`);
            }
            
                        

        } catch (error) {
            toast.error('Failed to ban/unban user.');
        }
       }

  return (
    <div >
        <table>
            <tr>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>action</th>
            </tr>
            {users && users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td> {user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                        <button onClick={() => handleBanUnban(user._id)}>{user.isBanned ? 'Unban' : 'Ban'}</button>
                    </td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default AllUsers