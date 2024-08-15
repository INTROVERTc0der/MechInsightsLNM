import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    // error page tailwind component is taken from the given link
    // https://freefrontend.com/tailwind-404-page-templates/

    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      {/* <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            Go Back
          </span>
        </a>
      </button> */}
        <div className="space-x-6 text-white">
            <Link to={"/login/studentlogin"}>
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                STUDENT
              </button>
            </Link>
            <Link to={"/login/facultylogin"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300">
                FACULTY
              </button>
            </Link>
        </div>
    </main>
  );
};

export default Login;
