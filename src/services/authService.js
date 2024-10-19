import axios from 'axios';

const API_URL = 'https://broker-6dgs.onrender.com/api/';

export const registerUser = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User Register successfully:', { formData, response: response.data });
      return response.data;
    } catch (error) {
      console.error('Error in Register user:', { formData, error: error.message });
      throw error; 
    }
  };
  
export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}user/login`,user,{
      withCredentials: true});
    console.log('user Logged in Successfully:', { response: response});
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', { error: error.message });
    throw error;
  }
};

export const logoutUser= async (setIsLoggedIn) => {
  try {
    const response = await axios.post(`${API_URL}user/logoutuser`,{},{
      withCredentials: true,
    });
    console.log(`logged out successfully:`, { response: response.data });
    setIsLoggedIn(false);
    return response.data;
  } catch (error) {
    console.error(`Error in logging out:`, { error: error.message });
    throw error;
  }
};
export const verifyemail= async (email) => {
    console.log(email)
    try {
      const response = await axios.post(`${API_URL}user/forgotpassword/verifyemail`,{email});
      console.log(response)
      return response;
    }catch (error) {
     return error.message;
    }
  };
export const sendOtp= async (email) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/sendotp`,{email},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}
export const validateOtp= async (email,otp) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/validateotp`,{email,otp},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}
export const changePassword= async (email,newPassword,confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/changepassword`,{email,newPassword,confirmPassword},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}

export const isUserLoggedIn= async (setIsLoggedIn,setUser) => {
  try {
    const response = await axios.get(
      `${API_URL}user/loggedIn`,
      {
        withCredentials: true,
      }
    );
    console.log('response from api check',response)
    console.log(response.data.user)
    if (response.status === 200) { 
      setIsLoggedIn(true);
      setUser(response.data.user);
    } else {
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.log("Error checking login status: " + err.message);
  }
};
