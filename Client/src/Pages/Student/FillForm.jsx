import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchQuestion } from "../../Redux/miscSlice";
import FORM from "../../Components/Form";

const FillForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const formvalue = location.state.formvalue;

  useEffect(() => {
    // getting form questions
    dispatch(fetchQuestion({f_type:formvalue.f_type}));
  }, [dispatch]);
  
  // const questions = [
  //   'Question 1?',
  //   'Question 2?',
  //   'Question 3?',
  //   'Question 4?',
  //   'Question 5?',
  //   'Question 6?',
  //   'Question 7?',
  //   'Question 8?',
  //   'Question 9?',
  //   'Question 10?',
  //   'Question 11?',
  //   'Question 12?',
  //   'Question 13?',
  //   'Question 14?',
  //   'Question 15?',
  // ];

  const questions = useSelector((state) => state?.misc?.questions);
  console.log("question in fillform.jsx <<<"+questions);
  
  return (
    <>
      <FORM questions={questions} FormName={formvalue.f_type} Description={formvalue.description} f_type={formvalue.f_type} />
    </>
  );
};

export default FillForm;
