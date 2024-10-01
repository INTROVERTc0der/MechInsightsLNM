import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
  isLoggedIn: false,
  rollNo:localStorage.getItem("rollNo")||"",
  data: localStorage.getItem("data"),
  role: localStorage.getItem("role")|| "student",
};

// // function to handle signup
// export const createAccount = createAsyncThunk("/student/signup", async (data) => {
//   try {
//     let res = axiosInstance.post("/student_user/register", data);

//     toast.promise(res, {
//       loading: "Wait! Creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create account",
//     });

//     // getting response resolved here
//     res = await res;
//     return res.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// function to handle login
export const login = createAsyncThunk("/auth/student/login", async (data) => {
  try {
    let res = axiosInstance.post("/user_student/login", data);
    console.log(res);
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    // getting response resolved here
    res = await res;
    console.log("hehe");
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to handle logout
export const logout = createAsyncThunk("/auth/student/logout", async () => {
  try {
    const res = axiosInstance.post("/user_student/logout");
    console.log("response from backend");
    console.log(res);
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.status;
      },
      error: "Failed to log out",
    });

    // getting response resolved here
    //res = await res;
    console.log(res);
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to fetch user data
export const getStudentData = createAsyncThunk("/auth/student/details", async () => {
  try {
    const storedData = localStorage.getItem('data');
    if (!storedData) {
      console.log("No data found in local storage");
      throw new Error('No data found in localStorage');
    }

    const parsedData = JSON.parse(storedData);
    const id = parsedData["_id"];

    console.log("Making API call with ID:", id);
    
    // Make the request with ID as a URL parameter if that's what your endpoint expects
    const res = await axiosInstance.get(`/user_student/profile/${id}`);

    console.log("API response:", JSON.stringify(res.data, null, 2)); // Log the full object for debugging

    return res.data; // No need to parse again if already an object
  } catch (error) {
    console.error("API call failed:", error.message);
    toast.error(error.message);
    throw error; // Ensure to throw the error so it can be handled by the slice
  }
});


// function to change user password
export const changestudentPassword = createAsyncThunk(
  "/auth/student/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user_student/changepassword", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to handle forget password
export const forgetstudentPassword = createAsyncThunk(
  "/auth/student/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user_student/forgetPassword", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to update user profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      let res = axiosInstance.put(`/user_student/update/${data[0]}`, data[1]);

      toast.promise(res, {
        loading: "Updating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to reset the password
export const resetstudentPassword = createAsyncThunk("/auth/student/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user_student/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const studentauthSlice = createSlice({
  name: "studentauth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.data?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "student");
        state.isLoggedIn = true;
        state.rollNo=action?.payload?.data?.user?.rollNo;
        state.data = action?.payload?.data?.user;
      })
      // for user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role='';
      })
      // for user details
      .addCase(getStudentData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.data?.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.rollNo = action?.payload?.data?.user?.rollNo;
        state.data = action?.payload?.data?.user;

      });
  },
});

export const {} = studentauthSlice.actions;
export default studentauthSlice.reducer;

