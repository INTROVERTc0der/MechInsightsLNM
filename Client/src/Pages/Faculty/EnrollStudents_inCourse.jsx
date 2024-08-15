import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import Layout from "../../Layout/Layout";
import { EnrollStudents } from "../../Redux/facultyauthSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EnrollStudents_inCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const facultyId = useSelector((state) => state?.facultyauth?.data?._id);
  const data = JSON.parse(localStorage.getItem("data"));
  const facultyId = data._id;
  const [EnrollementData, setEnrollementData] = useState({
    file: null,
    faculty_id: facultyId,
    course: "",
    batch: "",
  });

  const handleEnrollFile = (event) => {
    const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const data = new Uint8Array(e.target.result);
    //   const workbook = XLSX.read(data, { type: 'array' });
    //   const firstSheetName = workbook.SheetNames[0];
    //   const worksheet = workbook.Sheets[firstSheetName];
    //   const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setEnrollementData((prevState) => ({
        ...prevState,
        file,
      }));
    //};
    //reader.readAsArrayBuffer(file);
  };

  const handleEnrollementData = (e) => {
    const { name, value } = e.target;
    setEnrollementData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEnrollement = async (event) => {
    event.preventDefault();

    console.log("course"+EnrollementData.course );
    console.log("faculty id"+ facultyId); 
    console.log("batch"+EnrollementData.batch);

    // Checking the empty fields
    if (!EnrollementData.file || !EnrollementData.course || !facultyId || !EnrollementData.batch) {
      toast.error("Please fill all the fields");
      return;
    }

      // Create FormData object
      const formData = new FormData();
  formData.append('file', EnrollementData.file);
  formData.append('faculty_id', facultyId);
  formData.append('course', EnrollementData.course);
  formData.append('batch', EnrollementData.batch);

    // Calling Enrollement action
    const res = await dispatch(EnrollStudents(formData));

    // Redirect to home page if true
    if (res?.payload?.success) navigate("/");

    setEnrollementData({
      file: null,
      faculty_id: facultyId,
      course: "",
      batch: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleEnrollement}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold"> Enroll Students To A Course </h1>
          
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="file">
              Upload Student details file
            </label>
            <input
              required
              type="file"
              name="file"
              id="file"
              placeholder="Upload the .xlsx file"
              className="bg-transparent px-2 py-1 border"
              onChange={handleEnrollFile}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="course">
              Course
            </label>
            <input
              required
              type="text"
              name="course"
              id="course"
              placeholder="Enter the course name"
              className="bg-transparent px-2 py-1 border"
              value={EnrollementData.course}
              onChange={handleEnrollementData}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="batch">
              Batch
            </label>
            <input
              required
              type="text"
              name="batch"
              id="batch"
              placeholder="like ...Y20 , Y21 , Y22 , Y23"
              className="bg-transparent px-2 py-1 border"
              value={EnrollementData.batch}
              onChange={handleEnrollementData}
            />
          </div>
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Enroll Students 
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EnrollStudents_inCourse;
