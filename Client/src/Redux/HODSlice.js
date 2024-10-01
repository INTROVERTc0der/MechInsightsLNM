import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Helper/axiosInstance';
import toast from 'react-hot-toast';




export const fetchFormResult= createAsyncThunk('HOD/all_form_result',async()=>{
  try {
    const res= await axiosInstance.get("/user_hod/all_result");
    // await toast.promise(res, {
    //   loading: "Loading...",
    //   success: (data) => {
    //     return data?.data?.message;
    //   },
    //   error: "Failed to fetch form results",
    // });
    // getting response resolved here
      //res = await res;
      console.log(res.data.data);
      return res.data.data;
    
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
} );

export const fetchSeeResult = createAsyncThunk(
  'HOD/fetchSeeResult',
  async (faculty_id, { rejectWithValue }) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/user_faculty/seeResults", { faculty_id }), 
        {
          loading: "Loading...",
          success: (response) => {
            return response?.data?.message || "Success";
          },
          error: "Failed to fetch form results",
        }
      );

      // You already have the resolved response from toast.promise
      console.log(res.data.data);
      return res.data.data;

    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const POattainments= createAsyncThunk('HOD/POattainment',async({batch,year})=>{
  try {
    console.log(batch);
    const res= await axiosInstance.get("/user_hod/POattainments",{
      params: {
        batch: batch,  // assuming 'batch' is the value you want to send
        year: year     // you can also send 'year' if needed
      }
    });
    console.log(res.data);

    // await toast.promise(res, {
    //   loading: "Loading...",
    //   success: (data) => {
    //     return data?.data?.message;
    //   },
    //   error: "Failed to fetch form results",
    // });
    // getting response resolved here
      //res = await res;
      return res.data.psoOutcomes;
    
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
} );


//Asynchronous thunk to fectch faculty forms 
export const DeleteData= createAsyncThunk('HOD/delete_data',async(batch)=>{
  try {
    const res= await axiosInstance.post("/user_hod/deleteResponses",batch);
    // await toast.promise(res, {
    //   loading: "Loading...",
    //   success: (data) => {
    //     return data?.data?.message;
    //   },
    //   error: "Failed to fetch formNames",
    // });
    // getting response resolved here
      //res = await res;
      return res.data;
    
  } catch (error) {
    toast.error(error.message);
    throw error;
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
    throw error;
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
    throw error;
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
        throw error;
    }
  
});


const HODSlice = createSlice({
  name: 'HOD',
  initialState: {
    facultyId: null,
    details: {},
    forms: [],
    courses: [],
    result:[],
    seeresults:[],
    PO_attainment:[],
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
      })
      .addCase(fetchFormResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(fetchFormResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(POattainments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.PO_attainment = action.payload;
      })
      .addCase(POattainments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSeeResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seeresults = action.payload;
      })
      .addCase(fetchSeeResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFacultyId } = HODSlice.actions;

export default HODSlice.reducer;
