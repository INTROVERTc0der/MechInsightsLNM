import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axiosInstance from "../../Helper/axiosInstance";

const RegistorFaculty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [FacultyData, setFacultyData] = useState({
    faculty_name: "",
    faculty_email: "",
    role: "",
    post: "",
  });

  // function to handle the user input
  const handleFacultyData = (event) => {
    const { name, value } = event.target;
    setFacultyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { faculty_name, faculty_email, role, post } = FacultyData;
    if (!faculty_name || !faculty_email || !role || !post) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("FacultyName", faculty_name);
    formData.append("FacultyEmail", faculty_email);
    formData.append("role", role);
    formData.append("post", post);

    try {
      const response = await axiosInstance.post("/HOD/RegistorFaculty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Faculty registered successfully!");
        navigate("/success-page");
      } else {
        toast.error("Failed to register faculty.");
      }
    } catch (error) {
      console.error("Error in registering faculty: ", error);
      toast.error("An error occurred while registering faculty");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Register New Faculty</h1>
          
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="faculty_name">
              New Faculty Name:
            </label>
            <input
              required
              type="text"
              name="faculty_name"
              id="faculty_name"
              placeholder="Enter the faculty name"
              className="bg-transparent px-2 py-1 border"
              value={FacultyData.faculty_name}
              onChange={handleFacultyData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="faculty_email">
              Institute Email ID:
            </label>
            <input
              required
              type="text"
              name="faculty_email"
              id="faculty_email"
              placeholder="Enter the faculty email"
              className="bg-transparent px-2 py-1 border"
              value={FacultyData.faculty_email}
              onChange={handleFacultyData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="role">
              Faculty Role:
            </label>
            <input
              required
              type="text"
              name="role"
              id="role"
              placeholder="Enter the role"
              className="bg-transparent px-2 py-1 border"
              value={FacultyData.role}
              onChange={handleFacultyData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="post">
              Faculty Post:
            </label>
            <input
              required
              type="text"
              name="post"
              id="post"
              placeholder="Enter the post"
              className="bg-transparent px-2 py-1 border"
              value={FacultyData.post}
              onChange={handleFacultyData}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegistorFaculty;
