import React from "react";
import Layout from "../Layout/Layout";
import enhancedDigitalEducation from "../Assets/images/enhancedDigitalEducation.png";

const About = () => {
  return (
    <Layout>
      <div className="pl-20 pt-10 flex flex-col text-white">
        {/* creating the about page main section */}
        <div className="flex items-center gap-5 mx-10">
          {/* out moto section */}
          <section className="w-1/2 space-y-5 mt-12">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              ABOUT US 
            </h1>
            <p className="text-xl text-gray-200">
            A dedicated platform designed to assist educators and institutions in accurately calculating Program Outcome (PO) and Course Outcome (CO) attainment, a crucial component of Outcome-Based Education (OBE).
            </p>
            <h1 className="text-3xl">Our Mission</h1>
         
            <p className="text-xl text-gray-200">
            Our mission is to empower educational institutions by providing a reliable and user-friendly tool that simplifies the process of measuring and analyzing student performance against predefined learning outcomes. We believe that transparent and accurate assessment is key to continuous improvement and excellence in education.
            <br />
            <br />
            <br />
            </p>
          </section>

          {/* our moto image section */}
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
              className="drop-shadow-2xl "
              src={enhancedDigitalEducation}
              alt="aboutMainImage"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
