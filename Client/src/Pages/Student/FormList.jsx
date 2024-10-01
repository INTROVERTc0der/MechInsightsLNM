import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { fetchformlist } from "../../Redux/miscSlice";
import FillForm from "./FillForm";

const FormList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to fetch form list
    dispatch(fetchformlist());
  }, [dispatch]);

  const formlist = useSelector((state) => state?.misc?.formlist || []);
  console.log("formlist : >>>" + JSON.stringify(formlist));

  // State to hold selected form details (both f_type and description)
  const [formvalue, setformvalue] = useState({ f_type: '', description: '' });

  // Function to handle form selection
  const handleformvalue = (event, selectedForm) => {
    setformvalue({
      f_type: selectedForm.f_type,
      description: selectedForm.description
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formvalue.f_type) {
      toast.error("Please select any one form.");
      return;
    }

    navigate('/student/fillform', { state: { formvalue } });
    //<FillForm f_type={formvalue.f_type} Description={formvalue.description}/>
  };

  return (
    <Layout>
            <h1 class="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Forms You Have To <mark class="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">FILL</mark></h1>

      <div className="flex items-center justify-center h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          {/* <h1 className="text-center text-2xl font-bold">Forms You have to Fill</h1> */}
          
          <div className="flex justify-center flex-wrap gap-1">
            {formlist && Array.isArray(formlist) && formlist.map((e, index) => (
              <button
                onClick={(event) => handleformvalue(event, e)}
                key={index}
                className="w-[10rem] border-2 border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
              >
                {e.f_type}
              </button>
            ))}
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Fill Form
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FormList;
