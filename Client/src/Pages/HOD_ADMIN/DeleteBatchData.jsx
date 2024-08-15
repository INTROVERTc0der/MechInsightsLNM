import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { DeleteData } from "../../Redux/HODSlice";
import { fetchBatches } from "../../Redux/miscSlice";


const DeleteBatchData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // getting user details
    dispatch(fetchBatches());
  }, []);

  //const allBatches = useSelector((state) => state?.misc?.batches);
 const allBatches=['Y21','Y22','Y23'];
  const [batch,setbatch]=useState('');

  

  // function to handle the user input
  const handleBatchvalue = (event) => {
    const {value}  = event.target;
    setbatch(value);
  };

  // function to login
  const handleDelete = async (event) => {
    event.preventDefault();

    // calling delete action
    const res = await dispatch(DeleteData(batch));

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
    //navigate("/");

    // clearing inputs
    setbatch('');
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleDelete}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold"> Delete DATA </h1>
          

          {/* <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div> */}
          <div className="flex justify-center flex-wrap gap-1">
          {allBatches.map((e, index) => (
                <button onClick={handleBatchvalue}
                    key={index}
                    value={e}
                    className="w-[6rem] border-2 border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                    {e}
                </button>
            ))}
          </div>
          

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            DELETE
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default DeleteBatchData;
