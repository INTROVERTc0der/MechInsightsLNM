import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";
import { getStudentData } from "../../Redux/studentauthSlice";

const ProfileStudent = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user details
    dispatch(getStudentData());

    // Get user data from local storage
    const data = localStorage.getItem('data');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, [dispatch]);

  return (
    <Layout>
      <h1 class="text-center pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Who am <mark class="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">I ?</mark> </h1>
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
          <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData ? userData.name : "Loading..."}
          </h3>

          <div className="grid grid-cols-2">
            <p>Roll No. :</p>
            <p>{userData ? userData.rollNo : "Loading..."}</p>
            <p>Institute email :</p>
            <p>{userData ? userData.instituteEmail : "Loading..."}</p>
            <p>Batch :</p>
            <p>{userData ? userData.batch : "Loading..."}</p>
            <p>Role :</p>
            <p>STUDENT</p>
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/student/change_password"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileStudent;
