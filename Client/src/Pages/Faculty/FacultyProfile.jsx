
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getfacultyData } from "../../Redux/facultyauthSlice";
import { BsPersonCircle } from "react-icons/bs";

const ProfileFaculty = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // getting user details
    dispatch(getfacultyData());
  }, []);
  const userData = useSelector((state) => state?.facultyauth?.data);



  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
          <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData? (userData): (`Arpit Gupta`)}
          </h3>

          <div className="grid grid-cols-2">
            <p>ID :</p>
            <p>{userData?.role}</p>
            <p>Institute email :</p>
            <p>{userData?.instituteEmail}</p>
            <p>Role :</p>
            <p>{userData?.role}</p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/changepassword"
              }
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/editprofile"
              }
              className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileFaculty;
