import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { fetchBatches } from "../../Redux/miscSlice";
import { toast } from "react-hot-toast";
import { POattainments } from "../../Redux/HODSlice";

const POattainment = () => {
  const dispatch = useDispatch();

  let { PO_attainment } = useSelector((state) => state.HOD); // Fetching attainment from Redux state

  const scaleValue = (value) => {
    const scaledValue = ((value - 1) / (3 - 1)) * (100 - 1) + 1;
    return parseFloat(scaledValue.toFixed(2)); // Round to 2 decimal places
  };

  // Applying the scaling function to the array
  PO_attainment = PO_attainment.map(scaleValue);

  const allBatches = ["Y21", "Y22", "Y23", "Y24"];
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const years = [1, 2, 3, 4];

  const titles = [
    "PO  1",
    "PO  2",
    "PO  3",
    "PO  4",
    "PO  5",
    "PO  6",
    "PO  7",
    "PO  8",
    "PO  9",
    "PO 10",
    "PO 11",
    "PO 12",
    "PSO 1",
    "PSO 2",
    "PSO 3",
  ];

  // Handle form state
  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const [attainment, setAttainment] = useState({});
  const [calculationDone, setCalculationDone] = useState(false);

  const handleCalculation = (event) => {
    event.preventDefault();

    // Validation
    if (!batch) {
      toast.error("Please select a batch.");
      return;
    }
    if (!year) {
      toast.error("Please select a year.");
      return;
    }

    // Dispatch PO attainment data based on batch and year
    dispatch(POattainments({ batch, year }));

    setCalculationDone(true);
    toast.success("Calculating attainment values");
  };

  const handleAttainmentChange = (title, value) => {
    setAttainment((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleSubmitAttainment = (event) => {
    event.preventDefault();

    // Validation for attainment values
    for (const title of titles) {
      if (!attainment[title] || isNaN(attainment[title])) {
        toast.error(`Please enter a valid value for ${title}.`);
        return;
      }
    }

    // Here, you can dispatch an action or make an API call to submit the attainment data
    // For example:
    // dispatch(submitAttainment({ batch, year, attainment }));
    // toast.success("Attainment data submitted successfully!");

    console.log("Attainment Data:", { batch, year, attainment });
    toast.success("Attainment data submitted successfully!");

    // Reset form
    setBatch("");
    setYear("");
    setAttainment({});
    setCalculationDone(false);
  };

  // Function to determine the color based on the attainment value
  const getColorClass = (value) => {
    if (value > 70) return "text-green-500";
    if (value >= 40 && value <= 70) return "text-yellow-300";
    return "text-red-500";
  };

  return (
    <Layout>
      <h1 className="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Calculate <mark className="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">PO-PSO</mark> Attainment
      </h1>
      <div className="flex flex-col items-center justify-center gap-3">
        <form
          onSubmit={handleCalculation}
          className="flex flex-col justify-center gap-5 mt-20 mb-5 rounded-lg p-5 text-white w-80 shadow-[0_0_10px_black]"
        >
          <div>
            <label htmlFor="batch" className="block mb-2 text-sm font-medium text-white">
              Pick the Batch:
            </label>
            <select
              id="batch"
              className="w-full border-2 border-black rounded p-2"
              value={batch}
              onChange={handleBatchChange}
            >
              <option value="" disabled>
                Select Batch
              </option>
              {allBatches.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-white">
              Pick the Year of the Selected Batch:
            </label>
            <select
              id="year"
              className="w-full border-2 border-black rounded p-2"
              value={year}
              onChange={handleYearChange}
            >
              <option value="" disabled>
                Select Year
              </option>
              {years.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition duration-300"
            type="submit"
          >
            Calculate PO Attainment
          </button>
        </form>

        {calculationDone && (
          <form
            onSubmit={handleSubmitAttainment}
            className="mt-6 p-6 mb-10 rounded-lg shadow-[0_0_10px_black]"
          >
            <h2 className="text-xl text-center font-semibold text-white mb-4">
              Attainment Values
            </h2>
            <div className="grid grid-cols-8 gap-4 max-w-full max-h-96 overflow-y-auto">
              {titles.map((title, index) => (
                <div key={index}>
                  <label
                    htmlFor={`attainment-${index}`}
                    className={`block mb-1 text-l font-semibold ${getColorClass(PO_attainment[index] || 0)}`} // Apply dynamic class based on attainment value
                  >
                    <span className="text-white">{title} : </span> {PO_attainment[index] || "N/A"}
                  </label>
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default POattainment;
