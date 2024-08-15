import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Helper/axiosInstance';
import toast from 'react-hot-toast';

//Asynchronous thunk to fetch different batches from the reponse database 
export const fetchBatches= createAsyncThunk('responses/batches',async()=>{
  try {
    const res= await axiosInstance.get("/responses/batches");
    await toast.promise(res,{
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
});
//Asynchronous thunk to fetch forms from response data base based on faculty ID
export const fetchformNames= createAsyncThunk('form/formNames',async(facultyId)=>{
  try {
    const res= await axiosInstance.get(`/responses/formNames/${facultyId}`);
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
});


export const fetchQuestion= createAsyncThunk('form/getquestions',async({f_type})=>{
  try {
    const res= await axiosInstance.get(`/user_student/questions/${f_type}`);
   
    // await toast.promise(res, {
    //   loading: "Loading...",
    //   success: (data) => {
    //     return data?.data?.message;
    //   },
    //   error: "Failed to fetch formNames",
    // });
    // getting response resolved here
      //res = await res;
      console.log("Response data:", JSON.stringify(res.data.data.questions, null, 2));
      return JSON.stringify(res.data.data.questions, null, 2);
  }
   catch (error) {
    toast.error(error.message);
  }
});

export const submitFormResponses = createAsyncThunk('form/submitResponses',
  async ({ f_type, answers }) => {
    try {
      const response = await axiosInstance.post(`/user_student/submitResponses/${f_type}`, {
        answers,
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting form responses:", error);
    }
  }
);

export const fetchformlist= createAsyncThunk('form/getformList',async()=>{
  try {
    console.log("inside a fetchformlist miscSlice ");
    const res= await axiosInstance.get(`/user_student/formList`);
    console.log("response received : ", res.data);
    toast.promise(
      Promise.resolve(), // Just use a resolved promise here
      {
          loading: "Loading...",
          success: "Form list fetched successfully",
          error: "Failed to fetch formNames",
      }
  );
    // getting response resolved here
      //res = await res;
      
      return res.data.data.forms;
  } catch (error) {
    toast.error(error.message);
  }
});
// //Asynchronous thunk to fectch faculty forms 
// export const fetchforms= createAsyncThunk('faculty/form_available',async(facultyId)=>{
//   try {
//     const res= await axiosInstance.get(`/form/formNames/${facultyId}`);
//     await toast.promise(res, {
//       loading: "Loading...",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to fetch formNames",
//     });
//     // getting response resolved here
//       //res = await res;
//       return res.data;
    
//   } catch (error) {
//     toast.error(error.message);
//   }
// } );

// //Asynchronous thunk to distribute forms
// export const distributeforms= createAsyncThunk('faculty/form_distribute',async(data)=>{
//   try {
//     const res= await axiosInstance.post("api/forms_distribution",data);
//     await toast.promise(res, {
//       loading: "Loading...",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to distribute forms please try again",
//     });
//     // getting response resolved here
//       //res = await res;
//       return res.data;
    
//   } catch (error) {
//     toast.error(error.message);
//   }
// } );
// // Asynchronous thunk to fetch faculty details
// export const fetchFacultyDetails = createAsyncThunk('faculty/fetchFacultyDetails', async (facultyId) => {
//   try {
//     const res = await axiosInstance.get(`/api/faculty/${facultyId}`);
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

// // // Asynchronous thunk to fetch forms by facultyId
// // export const fetchForms = createAsyncThunk('faculty/fetchForms', async (facultyId) => {
// //   try {
// //     const res = await axiosInstance.get(`/api/forms?faculty_id=${facultyId}`);
// //     await toast.promise(res, {
// //         loading: "Loading...",
// //         success: (data) => {
// //           return data?.data?.message;
// //         },
// //         error: "Failed to fetch forms in",
// //       });
  
// //       // getting response resolved here
// //       //res = await res;
// //       return res.data;
    
// //   } catch (error) {
// //     toast.error(error.message);
// //   }
// // });

// // Asynchronous thunk to fetch courses by facultyId
// export const fetchCourses = createAsyncThunk('faculty/fetchCourses', async (facultyId) => {
//     try {
//         const res = await axiosInstance.get(`/courses?faculty_id=${facultyId}`);
//         await toast.promise(res, {
//             loading: "Loading...",
//             success: (data) => {
//               return data?.data?.message;
//             },
//             error: "Failed to fetchcourses in",
//           });
      
//           // getting response resolved here
//           //res = await res;
//           return res.data;
//     } catch (error) {
//         toast.error(error.message);
//     }
  
// });

const miscSlice = createSlice({
  name: 'misc',
  initialState: {
    batches:[],
    formNames:[],
    formlist:[],
    questions : [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchFacultyDetails.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchFacultyDetails.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.details = action.payload;
    //   })
    //   .addCase(fetchFacultyDetails.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(fetchforms.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchforms.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.forms = action.payload;
    //   })
    //   .addCase(fetchforms.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(fetchCourses.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchCourses.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.courses = action.payload;
    //   })
    //   .addCase(fetchCourses.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
      // .addCase(fetchformNames.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchformNames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formNames = action.payload;
      })
      .addCase(fetchformNames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(fetchBatches.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(fetchQuestion.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchformlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formlist = action.payload;
      })
      .addCase(fetchformlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = miscSlice.actions;

export default miscSlice.reducer;
