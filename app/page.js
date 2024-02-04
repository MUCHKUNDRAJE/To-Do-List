"use client";
import React, { useRef, useState } from "react";
import { GoTasklist } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

const page = () => {
  const [first, settitle] = useState("");
  const [dis, setdis] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  const [task, setdask] = useState([]);

  const Submithamd = (e) => {
    e.preventDefault();
    setdask([...task, { first, dis, date, time }]);
    settitle("");
    setdis("");
    setdate("");
    settime("");
  };

  let redertask = (
    <div className="w-60 relative h-72 rounded-[20px] bg-zinc-900 p-5">
      <GoTasklist className="text-3xl text-slate-400 mb-3" />

      <div
        className="h-[100px] whitespace-normal "
        style={{ overflowWrap: "break-word" }}
      >
        <h5 className="h-full text-xl text-slate-400 capitalize">
          No task availabe
        </h5>
      </div>

      <div className="absolute w-full h-12 bottom-0 bg-slate-400 left-0 rounded-b-[20px]"></div>
    </div>
  );

  const ref = useRef(null);

  const deletehander = (i) => {
    let copytask = [...task];
    
    // Add some animation or confirmation logic if needed
    setdask(copytask.filter((_, index) => index !== i));

  };

  



  if (task.length > 0) {
    redertask = task.map((t, i) => {
      return (
        <motion.div
          dragConstraints={ref}
          whileDrag={{ scale: 1.1 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          drag
          className=" cards w-60 relative h-72 rounded-[20px] bg-zinc-900 opacity-80 p-5 transition-scale"
          key={i}
        >
          <motion.button
          whileHover={{
           scale:1.2
          }}
            onClick={()=>{
                   deletehander(i)
            }}
            className="button text-slate-400 absolute right-3 text-xl top-6 "
          >
            <IoMdCloseCircle />
          </motion.button>
          <GoTasklist className="text-3xl text-slate-400 mb-3" />
          <h3 className="text-2xl text-slate-400 font-bold capitalize">
            {t.first}
          </h3>
          <div
            className="h-[100px] whitespace-normal  "
            style={{ overflowWrap: "break-word" }}
          >
            <h5 className="h-full text-xl text-slate-400  capitalize">
              {t.dis}
            </h5>
          </div>
          <div className="w-full text-slate-400  flex items-center justify-between ">
            <h3>{t.date}</h3>
            <h3>{t.time}</h3>
          </div>
          <div className="absolute w-full h-12 bottom-0 bg-slate-400 left-0 rounded-b-[20px] ">
          </div>
          
        </motion.div>
      );
    });
  }

  return (
    <div>
      <>
        <div className="w-full h-screen bg-zinc-800">
          <div className="text-zinc-600 capitalize absolute top-[5%] w-full flex justify-center font-semibold text-xl ">
            document
          </div>
          <h1 className="text-[13vw] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold text-zinc-900 ">
            Docs.
          </h1>

          <div className=" py-2  w-72 h-[340px] rounded bg-zinc-700 absolute bottom-2 right-4 opacity-80 z-[4]">
            <form onSubmit={Submithamd}>
              <input
                className="w-full h-10 rounded bg-zinc-700 px-2 text-slate-200 text-bold   "
                type="text"
                placeholder="Add your Task"
                value={first}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <hr className="mt-[10px]" />
              <textarea
                className="w-full h-40 px-2  mt-3  bg-zinc-700 text-slate-200  text-start"
                type="text"
                placeholder="Add Description"
                value={dis}
                onChange={(e) => {
                  setdis(e.target.value);
                }}
              />
              <hr className="mt-[10px]" />
              <input
                className="mt-2 ml-7 bg-zinc-700 w-[130px] text-white"
                type="date"
                value={date}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
              <input
                className="ml-10 mt-2 text-white   bg-zinc-700"
                type="time"
                value={time}
                onChange={(e) => {
                  settime(e.target.value);
                }}
              />
              <button className="py-2 px-3  bg-zinc-900 text-slate-400 capitalize font-bold rounded-lg mt-2 ml-[35%]">
                Add task
              </button>
            </form>
          </div>

          <div
            ref={ref}
            className="fixed top-0 left-0 z-[3] w-full h-full flex-wrap gap-[20px] p-4  "
          >
            <div className="w-full h-full  flex flex-wrap gap-6">
              {" "}
              {redertask}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default page;
