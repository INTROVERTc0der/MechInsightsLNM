import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchforms, distributeforms } from "../../Redux/distributeSlice";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forms } = useSelector((state) => state?.distribute) || {};
  const [newformData,setnewformData] = useState({
    Question1: "",
    Question2: "",
    Question3: "",
    Question4: "",
    Question5: "",
    Question6: "",
    Question7: "",
    Question8: "",
    Question9: "",
    Question10: "",
    Question11: "",
    Question12: "",
    Question13: "",
    Question14: "",
    Question15: "",
    formName: "",
  });

  useEffect(() => {
    dispatch(fetchforms());
  }, [dispatch]);

  const handleDistributionData = (event) => {
    const { name, value } = event.target;
    setDistributeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  return (
    <Layout>
      <h1 className="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Create <mark className="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">NEW FORM</mark>
      </h1>

      <div className="flex items-center justify-center h-[80vh] mt-20 mb-20">
        <form
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Fill all the Questions</h1>
          
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">New Form Name :</label>
            <input
              required
              type="text"
              placeholder="Enter the new Form Name"
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">Question 1 :</label>
            <input
              required
              type="text"
              placeholder="Enter the question"
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">Question 2 :</label>
            <input
              required
              type="text"
              placeholder="Enter the question"
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">Question 3 :</label>
            <input
              required
              type="text"
              placeholder="Enter the question"
              className="bg-transparent px-2 py-1 border"
            />
          </div>


          
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Form
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateForm;
