import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { useEffect } from "react";
import { fetchSeeResult } from "../../Redux/HODSlice";

// const seeresults = [{
//     "Name": "Internship 1",
//     "Batch": "Y21",
//     "Year": 2,
//     "Total Forms distributed": 40,
//     "Total Forms Filled": 23,
//     "average_array%": [56, 67, 32, 54, 67, 78, 56, 87, 98, 89, 43, 89, 90, 67, 87]
// }, {
//     "Name": "Internship 2",
//     "Batch": "Y21",
//     "Year": 2,
//     "Total Forms distributed": 40,
//     "Total Forms Filled": 23,
//     "average_array%": [65, 73, 41, 59, 72, 81, 62, 91, 99, 85, 47, 85, 94, 72, 88]
// }];

const SeeResult = () => {
    const dispatch = useDispatch();

  const { seeresults } = useSelector((state) => state.HOD);
  
    const faculty_id=localStorage.getItem("_id");
    useEffect(()=>{
        dispatch(fetchSeeResult(faculty_id));
    },[dispatch,faculty_id])

    const titles = [
        "PO 1 : ",
        "PO 2 : ",
        "PO 3 : ",
        "PO 4 : ",
        "PO 5 : ",
        "PO 6 : ",
        "PO 7 : ",
        "PO 8 : ",
        "PO 9 : ",
        "PO 10 : ",
        "PO 11 : ",
        "PO 12 : ",
        "PSO 1 : ",
        "PSO 2 : ",
        "PSO 3 : ",
    ];

    return (
        <Layout>
            <div className="text-center pt-10">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">FORMS <mark className="px-2 text-white bg-black-600 rounded dark:bg-yellow-500">STATS</mark></h1>
                <div className="flex flex-col items-center justify-center pb-10 space-y-10">
                {
                    seeresults.map((res, resIndex) => (
                        <div key={resIndex} className="flex flex-col justify-center gap-1 rounded-lg p-4 mt-10 mb-10 ml-20 mr-20 text-white shadow-[0_0_10px_black]">
                            <h1 className="flex items-center justify-center text-4xl text-yellow-500 font-bold">{res.Name}</h1>
                            <br />
                            <div className="flex justify-around font-semibold">
                            <span>BATCH : {res.Batch}</span>
                            <span>SEMESTER : {res.Semester}</span>
                            </div>
                            
                            <div className="flex justify-around font-semibold">
                            <span>Total Forms distributed : {res["Total Forms distributed"]}</span>
                            <span>Total Forms Filled : {res["Total Forms Filled"]}</span>
                            </div>
                            
                            <br />
                            <label className="flex items-center justify-center text-xl font-semibold">AVERAGE CORRESPONDING TO EACH PO AND PSO</label>
                            <br />
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                {
                                    titles.map((title, index) => (
                                        <div key={index}>
                                            <span className="font-bold">{title}</span>
                                            <span style={{ color: res["average_array%"][index] > 70 ? 'green' : 'red' }}>
                                                {res["average_array%"][index]}%
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                </div>
                
            </div>
        </Layout>
    );
};

export default SeeResult;
