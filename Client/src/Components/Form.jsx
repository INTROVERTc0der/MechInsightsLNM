    // import React, { useState } from "react";
    // //import { toast } from "react-hot-toast";
    // import { useDispatch } from "react-redux";
    // //import { Link, useNavigate } from "react-router-dom";
    // //import Layout from "../../Layout/Layout";
    // import Layout from "../Layout/Layout";
    // //import { login } from "../../Redux/studentauthSlice";



    // const FORM = ({questions,FormName}) => {
    // //const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const [answers, setAnswers] = useState(Array(15).fill(null));

    // // function to handle the user input
    // const handleUserInput = (index, value) => {
    //     const updatedAnswers = [...answers];
    // updatedAnswers[index] = value;
    // setAnswers(updatedAnswers)
    // };
    
    // const handleSubmit = (event) => {
    //     // const { name, value } = event.target;
    //     // setLoginData({
    //     //   ...loginData,
    //     //   [name]: value,
    //     // });
    //     event.preventdefault();
    //     console.log(answers);
    // };

    // //   // function to login
    // //   const handleLogin = async (event) => {
    // //     event.preventDefault();

    // //     // checking the empty fields
    // //     if (!loginData.email || !loginData.password) {
    // //       toast.error("Please fill all the fields");
    // //       return;
    // //     }

    // //     // calling login action
    // //     const res = await dispatch(login(loginData));

    // //     // redirect to home page if true
    // //     if (res?.payload?.success) navigate("/");
    // //     //navigate("/");

    // //     // clearing the login inputs
    // //     setLoginData({
    // //       email: "",
    // //       password: "",
    // //     });
    // //   };

    // return (
    //     <Layout>
    //     <div className="flex items-center justify-center h-[200vh]">
    //         <form
    //         onSubmit={handleSubmit}
    //         className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 h-[200rem] shadow-[0_0_10px_black]"
    //         >
    //         <h1 className="text-center text-2xl font-bold">{FormName} </h1>
    //         {
    //             questions.map((question,index)=>(
    //                 <div key ={index} className="flex flex-col gap-1">
    //                 <label className="text-lg font-semibold" >
    //                 question {index+1} : {question}
    //                 </label>
    //                 <label htmlFor="">
    //                 <input
    //                     required
    //                     type="radio"
    //                     name={`question-${index}`}
    //                     value="3"
    //                     checked={answers[index]==='3'}
    //                     onChange={()=>handleUserInput(index, "3")}
    //                     //placeholder="Enter your email"
    //                     //className="bg-transparent px-2 py-1 border"
    //                     //value={loginData.email}
    //                     //onChange={handleUserInput}
    //             />
    //             Extremely Satisfied
    //             </label>
    //             <label htmlFor="">
    //             <input
    //             required
    //             type="radio"
    //             name={`question-${index}`}
    //             value="2"
    //             checked={answers[index]==='2'}
    //             //placeholder="Enter your email"
    //             //className="bg-transparent px-2 py-1 border"
    //             //value={loginData.email}
    //             onChange={()=>handleUserInput(index, "2")}
    //             />
    //             Satisfied
    //             </label>
    //             <label htmlFor="">
    //             <input
    //             required
    //             type="radio"
    //             name={`question-${index}`}
    //             checked={answers[index]==='1'}
    //             value="1"
    //             //placeholder="Enter your email"
    //             //className="bg-transparent px-2 py-1 border"
    //             //value={loginData.email}
    //             onChange={()=>handleUserInput(index,"1")}
    //             />
    //             Not Satisfied
    //             </label>
    //         </div>

    //             ))
    //         }
    //         <button
    //             className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
    //             type="submit"
    //         >
    //             Submit
    //         </button>
    //         </form>
    //     </div>
    //     </Layout>
    // );
    // };

    // export default FORM;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import { submitFormResponses } from "../Redux/miscSlice";
import { Navigate, useNavigate } from "react-router-dom";

const FORM = ({ questions=[], FormName,Description,f_type }) => {

  if (typeof questions === "string") {
    try {
      questions = JSON.parse(questions);
    } catch (error) {
      console.error("Failed to parse `questions` as JSON. Error:", error);
      questions = []; // Fallback to an empty array if parsing fails
    }
  }

  if (!Array.isArray(questions)) {
    console.error("The `questions` prop must be an array. Received:", questions);
    return <div>Error: Invalid `questions` data.</div>;
  }
  const navigate = useNavigate();
const dispatch = useDispatch();
console.log("hey in form >> and the question are : "+ questions);
const [answers, setAnswers] = useState(Array(15).fill(null));

  // function to handle the user input
  const handleUserInput = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answers);
    // You can dispatch an action with the answers here
    dispatch(submitFormResponses({ f_type, answers }));
    // .then((result) => {
    //   if (result.meta.requestStatus === 'fulfilled') {
    //     console.log("Form submitted successfully:", result.payload);
    //     // Optionally show a success message or navigate to another page
    //   } else {
    //     console.error("Failed to submit form:", result.payload);
    //     // Optionally show an error message
    //   }
    //});
    navigate('/student/fillList');

  };

  return (
    <Layout>
      <div className=" pt-10 pb-10 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-full max-w-md  overflow-y-auto shadow-[0_0_10px_black]"
        >
            {/* flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-full max-w-md h-screen overflow-y-auto shadow-[0_0_10px_black] */}
          <h1 className="text-center text-2xl font-bold">{FormName}</h1>
          <h3 className="text-center text-2xl font-bold">{Description}</h3>
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-lg font-semibold">
                Question {index + 1}: {question}
              </label>
              <label>
                <input
                  required
                  type="radio"
                  name={`question-${index}`}
                  value="3"
                  checked={answers[index] === "3"}
                  onChange={(e) => handleUserInput(index, e.target.value)}
                />
                Extremely Satisfied
              </label>
              <label>
                <input
                  required
                  type="radio"
                  name={`question-${index}`}
                  value="2"
                  checked={answers[index] === "2"}
                  onChange={(e) => handleUserInput(index, e.target.value)}
                />
                Satisfied
              </label>
              <label>
                <input
                  required
                  type="radio"
                  name={`question-${index}`}
                  value="1"
                  checked={answers[index] === "1"}
                  onChange={(e) => handleUserInput(index, e.target.value)}
                />
                Not Satisfied
              </label>
            </div>
          ))}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FORM;

    