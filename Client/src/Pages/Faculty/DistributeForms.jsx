import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchforms,distributeforms } from "../../Redux/distributeSlice";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";


    const DistributeForms=()=>{

        const dispatch=useDispatch();

        const [DistributeData,setDistributeData]=useState({
            form_name:"",
            faculty_id:useSelector((state) => state?.facultyauth?.data?._id),
            course:"",
            batch:"",
        });


        
        useEffect(() => {
            (async () => {
              await dispatch(fetchforms);
            })();
          }, [])
          const {forms}=useSelector((state)=>state?.distribute?.forms);

        //const forms=['intership','workshop','extra curricular','workshop 2'];
    

        const handleDistributiondatat=(event)=>{
            const{name,value}=event.target;
            setDistributeData({
                ...DistributeData,
                [name]:value,
            })
        }

        const handleDistribution=async(event)=>{
            event.preventDefault();

            //checking the empty fields
            if(!DistributeData.form_name || !DistributeData.course || !DistributeData.faculty_id || !DistributeData.batch){
                toast.error("please fill all the fields");
                return;
            }

            //calling distribution action
            const res=await dispatch(distributeforms(DistributeData));

            // redirect to home page if true
            if (res?.payload?.success) navigate("/");

            // clearing the login inputs
            setDistributeData({
                form_name:"",
                faculty_id:"",
                course:"",
                batch:"",
            });
        }

    
    return (
        <Layout>
        <div className="flex items-center justify-center h-[100vh]">
          <form
            onSubmit={handleDistribution}
            className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-bold ">Distributing Forms </h1>
            <div className="flex justify-center flex-wrap gap-1">
            {forms.map((e, index) => (
                <button
                    key={index}
                    className="w-[6rem] border-2 border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                    {e}
                </button>
            ))}
            
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="email">
                Course
              </label>
              <input
                required
                type="text"
                name="course"
                id="course"
                placeholder="Enter the course name"
                className="bg-transparent px-2 py-1 border"
                value={DistributeData.course}
                onChange={handleDistributiondatat}
              />
            </div>
  
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="email">
                Batch
              </label>
              <input
                required
                type="text"
                name="batch"
                id="batch"
                placeholder="like .. Y21 , Y22 , Y24"
                className="bg-transparent px-2 py-1 border"
                value={DistributeData.batch}
                onChange={handleDistributiondatat}
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
    )
}

export default DistributeForms;