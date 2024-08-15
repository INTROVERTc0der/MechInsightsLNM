import React from "react"
import RegistorStudent from "./Pages/Faculty/Registor_Students"
import { Routes,Route } from "react-router-dom"
import Homepage from "./Pages/HomePage"
import NotFound from "./Pages/NotFound";
import ProfileFaculty from "./Pages/Faculty/FacultyProfile"
import SeeResults from "./Pages/Faculty/SeeResults"
import DeleteData from "./Pages/HOD_ADMIN/DeleteBatchData"
import POattainment from "./Pages/HOD_ADMIN/PO_Attainment"
import RegistorFaculty from "./Pages/HOD_ADMIN/RegistorFaculty"
import FillForm from "./Pages/Student/FillForm"
import ProfileStudent from "./Pages/Student/StudentProfile"
import FacultyForgotPassword from "./Pages/Password/FacultyForgetPassword"
import FacultyChangePassword from "./Pages/Password/FacultyChangePassword";
import StudentChangePassword from "./Pages/Password/StudentChangePassword"
import StudentForgetPassword from "./Pages/Password/StudentForgetPassword"
import RequireAuth from "./Components/Auth/RequiredAuth";
import StudentLogin from "./Pages/Student/StudentLogin";
import FacultyLogin from "./Pages/Faculty/FacultyLogin";
import Login from "./Pages/Login";
import StudentLoginAuth from "./Components/Auth/StudentLoginAuth";
import FormList from "./Pages/Student/FormList";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import EnrollStudents_inCourse from "./Pages/Faculty/EnrollStudents_inCourse";
import DistributeForms from "./Pages/Faculty/DistributeForms";
function App() {
 

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<FORM questions={questions} FormName="student satisfaction survey"/>}/> */}
      <Route path="/" element={< Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/login/studentLogin" element={<StudentLogin/>}/>
      <Route path="/login/facultyLogin" element={<FacultyLogin/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/About" element={<About/>}/>
      <Route element={<StudentLoginAuth/>}>
            <Route path="/student/profile" element={<ProfileStudent/>}/>
            <Route path="/student/forgot_password" element={<StudentForgetPassword/>}/>
            <Route path="/student/change_password" element={<StudentChangePassword/>}/>
            <Route path="/student/fillList" element={<FormList/>}/>
            <Route path="/student/fillform" element={<FillForm/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={["Faculty","ADMIN"]}/>}>
            <Route path="/faculty/change_password" element={<FacultyChangePassword/>}/>
            <Route path="/faculty/forgot_password" element={<FacultyForgotPassword/>}/>
            <Route path="/faculty/profile" element={<ProfileFaculty/>}/>
            <Route path="/faculty/enrollStudents" element={<EnrollStudents_inCourse/>}/>
            <Route path="/faculty/results" element={<SeeResults/>}/>
      </Route>
      
      <Route element={<RequireAuth allowedRoles={["Faculty"]}/>}>
      <Route path="/faculty/distribute_forms" element={<DistributeForms/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
        {/* <Route path="/admin/results" element={}/> */}
        <Route path="/admin/delete_data" element={<DeleteData/>}/>
        <Route path="/admin/cal_POattainment" element={<POattainment/>}/>
        <Route path="/admin/registor_faculty" element={<RegistorFaculty/>}/>
      </Route>

      <Route path="*" element={<NotFound/>}></Route>

    </Routes>
    </>
  )
}

export default App
