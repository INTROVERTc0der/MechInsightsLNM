import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchforms, distributeforms } from "../../Redux/distributeSlice";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DistributeForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forms } = useSelector((state) => state?.distribute) || {};
  const [DistributeData, setDistributeData] = useState({
    form_name: "",
    course: "",
    batch: "",
    description: "", // Add description field initialization
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
  
  const [activeForm, setActiveForm] = useState(null);

  const handleDistribution = async (event) => {
    event.preventDefault();

    // Checking for empty fields
    if (!DistributeData.form_name || !DistributeData.course || !DistributeData.batch || !DistributeData.description) {
      toast.error("Please fill all the fields");
      return;
    }

    // Calling distribution action
    const res = await dispatch(distributeforms(DistributeData));

    // Redirect to home page if distribution is successful
    if (res?.payload?.success) {
      navigate("/");
    }

    // Clearing the distribution inputs
    setDistributeData({
      form_name: "",
      course: "",
      batch: "",
      description: "",
    });
  };

  return (
    <Layout>
      <h1 className="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Distribute <mark className="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">FORMS</mark>
      </h1>

      <div className="flex items-center justify-center h-[80vh] mt-20 mb-20">
        <form
          onSubmit={handleDistribution}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Select Any one Form</h1>
          <div className="flex items-center flex-col gap-1">
            {forms?.length > 0 ? (
              forms.map((form, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-[12rem] border-2 border-yellow-500 ${activeForm === form ? 'bg-yellow-500' : 'hover:bg-yellow-500'} transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer`}
                  onClick={() => {
                    setDistributeData({ ...DistributeData, form_name: form });
                    setActiveForm(form);
                  }}
                >
                  {form}
                </button>
              ))
            ) : (
              <p>No forms available</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">Course</label>
            <input
              required
              type="text"
              name="course"
              id="course"
              placeholder="Enter the course name"
              className="bg-transparent px-2 py-1 border"
              value={DistributeData.course || ''} // Provide a fallback value
              onChange={handleDistributionData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="description">Description</label>
            <input
              required
              type="text"
              name="description"
              id="description"
              placeholder="Enter the description about forms"
              className="bg-transparent px-2 py-1 border"
              value={DistributeData.description || ''} // Provide a fallback value
              onChange={handleDistributionData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="batch">Batch</label>
            <input
              required
              type="text"
              name="batch"
              id="batch"
              placeholder="like .. Y21 , Y22 , Y24"
              className="bg-transparent px-2 py-1 border"
              value={DistributeData.batch || ''} // Provide a fallback value
              onChange={handleDistributionData}
            />
          </div>
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Distribute Forms
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default DistributeForms;
