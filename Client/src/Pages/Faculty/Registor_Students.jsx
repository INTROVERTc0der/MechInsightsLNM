import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axiosInstance from "../../Helper/axiosInstance";
//import { login } from "../Redux/authSlice";

const  RegistorStudents = () => {
   const navigate = useNavigate();
//   const dispatch = useDispatch();

  const [StudentData, setStudentData] = useState(null);

  // function to handle the user input
  const handleUserInput = (event) => {
    event.preventDefault();
    //getting the image
    const uploadedfile=event.target.files[0];

    if(uploadedfile){
        setStudentData(uploadedfile);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!StudentData) {
      toast.error("Please upload a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", StudentData);  // Correctly append the uploaded file
  
    try {
      const response = await axiosInstance.post("/user_hod/register_student", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        navigate("/success-page"); // Replace with your desired route
      } else {
        toast.error("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };
  


  return (
    <Layout>
      <h1 className="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Register <mark className="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">New Students</mark></h1>

      <div className="flex items-center justify-center h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80  shadow-[0_0_10px_black]"
        >
          {/* <h1 className="text-center text-2xl font-bold"> </h1> */}
          
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              Upload the file 
            </label>
            <input
              required
              type="file"
              name="datafile"
              id="datafile"
              placeholder=".xlsx"
              className="bg-transparent px-2 py-1 border"
              //value={loginData.password}
              onChange={handleUserInput}
            />
          </div>


          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit" onSubmit={handleSubmit}
          >
            Register 
          </button>


        </form>
      </div>
    </Layout>
  );
};

export default  RegistorStudents;
