import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Helper/axiosInstance';
import toast from 'react-hot-toast';


//Asynchronous thunk to fectch faculty forms 
export const DeleteData= createAsyncThunk('HOD/delete_data',async(batch)=>{
  try {
    const res= await axiosInstance.get("/HOD/deleteData",batch);
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to fetch formNames",
    });
    // getting response resolved here
      //res = await res;
      return res.data;
    
  } catch (error) {
    toast.error(error.message);
  }
} );

//Asynchronous thunk to distribute forms
export const distributeforms= createAsyncThunk('faculty/form_distribute',async(data)=>{
  try {
    const res= await axiosInstance.post("api/forms_distribution",data);
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to distribute forms please try again",
    });
    // getting response resolved here
      //res = await res;
      return res.data;
    
  } catch (error) {
    toast.error(error.message);
  }
} );
// Asynchronous thunk to fetch faculty details
export const fetchFacultyDetails = createAsyncThunk('faculty/fetchFacultyDetails', async (facultyId) => {
  try {
    const res = await axiosInstance.get(`/api/faculty/${facultyId}`);
    await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to fetch forms in",
      });
  
      // getting response resolved here
      //res = await res;
      return res.data;
    
  } catch (error) {
    toast.error(error.message);
  }
});

// // Asynchronous thunk to fetch forms by facultyId
// export const fetchForms = createAsyncThunk('faculty/fetchForms', async (facultyId) => {
//   try {
//     const res = await axiosInstance.get(`/api/forms?faculty_id=${facultyId}`);
//     await toast.promise(res, {
//         loading: "Loading...",
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: "Failed to fetch forms in",
//       });
  
//       // getting response resolved here
//       //res = await res;
//       return res.data;
    
//   } catch (error) {
//     toast.error(error.message);
//   }
// });

// Asynchronous thunk to fetch courses by facultyId
export const fetchCourses = createAsyncThunk('faculty/fetchCourses', async (facultyId) => {
    try {
        const res = await axiosInstance.get(`/courses?faculty_id=${facultyId}`);
        await toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
              return data?.data?.message;
            },
            error: "Failed to fetchcourses in",
          });
      
          // getting response resolved here
          //res = await res;
          return res.data;
    } catch (error) {
        toast.error(error.message);
    }
  
});


const HODSlice = createSlice({
  name: 'HOD',
  initialState: {
    facultyId: null,
    details: {},
    forms: [],
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFacultyId(state, action) {
      state.facultyId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchFacultyDetails.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchFacultyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchFacultyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(fetchforms.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchforms.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.forms = action.payload;
      // })
      // .addCase(fetchforms.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      // .addCase(fetchCourses.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFacultyId } = HODSlice.actions;

export default HODSlice.reducer;
