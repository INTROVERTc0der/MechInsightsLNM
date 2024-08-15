import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  data: localStorage.getItem("data") || {},
  role: localStorage.getItem("role") || "faculty",
};

// // function to handle signup
// export const createAccount = createAsyncThunk("/faculty/signup", async (data) => {
//   try {
//     let res = axiosInstance.post("/faculty_user/register", data);

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

//handle student enrollement process
export const EnrollStudents = createAsyncThunk("/auth/faculty/enrollStudent", async (data) => {
  try {
    let res = axiosInstance.post("/user_faculty/enrollStudents", data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to handle login
export const login = createAsyncThunk("/auth/faculty/login", async (data) => {
  try {
    let res = axiosInstance.post("/user_student/login", data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to handle logout
export const logout = createAsyncThunk("/auth/faculty/logout", async () => {
  try {
    let res = axiosInstance.post("/faculty_user/logout");

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to fetch user data
export const getfacultyData = createAsyncThunk("/auth/faculty/details", async () => {
  try {
    const res = await axiosInstance.get("/faculty_user/me");
    return res?.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to change user password
export const changefacultyPassword = createAsyncThunk(
  "/auth/faculty/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/faculty_user/change-password", userPassword);

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
export const forgetfacultyPassword = createAsyncThunk(
  "/auth/faculty/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/faculty_user/reset", { email });

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
      let res = axiosInstance.put(`/student_user/update/${data[0]}`, data[1]);

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
export const resetfacultyPassword = createAsyncThunk("/auth/faculty/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/faculty_user/reset/${data.resetToken}`, {
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

const facultyauthSlice = createSlice({
  name: "facultyauth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.data?.user));
        localStorage.setItem("isLoggedIn", true);
        //console.log("action insidethe login fulfilled "+action?.payload);
        localStorage.setItem("role", action?.payload?.data?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.data?.user;
        state.role = action?.payload?.data?.user?.role;
      })
      // for user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
      })
      // for user details
      .addCase(getfacultyData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.data?.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.data = action?.payload?.data?.user;
        state.role = action?.payload?.data?.user?.role;
      });
  },
});

export const {} = facultyauthSlice.actions;
export default facultyauthSlice.reducer;
