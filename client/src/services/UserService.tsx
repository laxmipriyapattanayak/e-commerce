import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = 'http://51.20.192.141:4000';

export const registerUser = async ( newUser:object ) => {
    const response = await axios.post(`${baseURL}/api/users/register`,newUser);
    return response.data;
};

export const activateUser = async ( token:object ) => {
    const response = await axios.post(`${baseURL}/api/users/activate`, token, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    return response.data;
};

export const loginUser = async ( user:object ) => {
    const response = await axios.post(`${baseURL}/api/users/login`, user, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    return response.data;
};
export const logoutUser = async ( ) => {
    const response = await axios.post(`${baseURL}/api/users/logout`);
    return response.data;
};

export const getRefreshToken = async ( ) => {
    const response = await axios.get(`${baseURL}/api/users/refresh-token`);
    return response.data;
};

export const getUserProfileDetails = async (id: string) => {
  const response = await axios.get(`${baseURL}/api/users/profile/${id}`);
  return response.data;
};

export const getAllUsers = async () => {    
  const response = await axios.get(`${baseURL}/api/admin/dashboard`);
  return response.data;
}

export const forgotPassword = async (forgotForm:any) => {    
  const response = await axios.post(`${baseURL}/api/users/forget-password`,forgotForm ,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
}

export const resetPassword = async ( token:object ) => {
  const response = await axios.post(`${baseURL}/api/users/reset-password`, token, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  return response.data;
};

export const updateBanUser = async (id:string) => {    
  const response = await axios.get(`${baseURL}/api/admin/banuser/${id}`);
  return response.data;
}
export const updateUnbanUser = async (id:string) => {    
  const response = await axios.get(`${baseURL}/api/admin/unbanuser/${id}`);
  return response.data;
}