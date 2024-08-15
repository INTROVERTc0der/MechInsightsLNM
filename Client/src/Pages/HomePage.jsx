import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/images/homePage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/studentauthSlice";

const Homepage = () => {
  //const isLoggedIn = useSelector((state) => state?.studentauth?.isLoggedIn);
  const isLoggedIn=localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();  // Move useDispatch to top level
  const navigate = useNavigate(); // useNavigate for navigation
  console.log("isLoggedIn:", isLoggedIn);

  const handleLogout = async (event) => {
    event.preventDefault();

    // Calling logout action
    const res = await dispatch(logout());
    console.log(res);

    // Check if res.payload is defined before accessing its properties
    if (res.payload && res.payload.status === 'log out success') {
      navigate('/');
    } else {
      console.error('Logout failed:', res.payload);
    }
  };
  return (
    <Layout>
      <div className="relative h-[90vh] overflow-hidden">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="https://lnmiit.ac.in/wp-content/uploads/2024/02/lnmiit_view.mp4"
          autoPlay
          loop
          muted
        ></video>

        <div className="pt-10  text-black flex items-center justify-center gap-10 mx-16 h-full">
          {/* for platform details */}
          <div className=" space-y-6">
            {/* <h1 className="text-5xl font-semibold">
            MechInsights{" "}
              <span className="text-yellow-500 text-5xl font-bold">LNM</span>
            </h1> */}
    


    <h1 className="text-2xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-7xl lg:text-7xl dark:text-white">
  <mark className="text-2xl md:text-7xl lg:text-7xl px-2 py-2 text-black bg-blue-600 rounded dark:bg-yellow-500">
    <span className="underline underline-offset-3 decoration-8 decoration-black dark:decoration-black"></span>MechInsights
  </mark>
  <span> </span>
  <mark className="text-2xl md:text-7xl lg:text-7xl px-2 text-white bg-black rounded dark:bg-black">LNM</mark>
</h1>
   
            {/* <h1 class="mb-4 text-7xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-yellow-500"><mark class="px-2 text-black bg-blue-600 rounded dark:bg-yellow-500">MechInsights</mark> <span class="underline underline-offset-3 decoration-8 decoration-black dark:yellow-500">LNM</span></h1> */}

            {/* <p className="text-xl text-gray-200">
              Learning outcomes are statements that describe the knowledge or skills
              students should acquire by the end of a particular assignment, class, course, or program.
            </p> */}

            {/* for buttons */}
            {!isLoggedIn ? (
              <div className="pt-[5rem] flex items-center justify-center space-x-6">
                <Link to="/login">
                  <button className="  px-5 py-3 rounded-md font-semibold text-lg cursor-pointer border border-black border-2  hover:bg-yellow-600 transition-all ease-in-out duration-300">
                    <h3 className="font-bold">LOGIN</h3>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-x-6">
                <Link onClick={handleLogout}>
                <button type="button" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                  Logout
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* right section for image */}
          {/* <div className="w-1/2 flex items-center justify-center">
            <img src={homePageMainImage} alt="home page images" />
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
