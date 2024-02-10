import { useSelector } from "react-redux";
import Tasklayout from "../Components/Tasklayout";
import Taskbox from "../Components/Taskbox";
import Task from "../Components/Taskstruct";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function Today() {
  const selected = useSelector((store) => store.task.selected);
  const tasklist = useSelector((store) => store.task.tasklist);
  const todaytasks = tasklist.filter((task) => checkiftoday(task.date));
  const len = todaytasks.length;

  function checkiftoday(date) {
    console.log("the date is:");
    console.log(date);
    const newday = new Date(date);
    console.log(newday);

    const todaydays = new Date().toLocaleDateString();
    const datedays = newday.toLocaleDateString();
    console.log(todaydays, datedays, "checkingthedate");
    return datedays === todaydays ? true : false;
  }
  const isMid = useMediaQuery({ query: "(max-width: 660px)" });
  const isMid2 = useMediaQuery({ query: "(max-width: 823px)" });

  return (
    <>
      {!(isMid && selected) && (
        <div
          className={`items-left flex h-full ${isMid2 ? "gap-3" : "gap-3"}  ${
            selected ? "w-3/5" : "w-full"
          } flex-col justify-start p-6 `}
        >
          <div className="flex w-full flex-row items-center justify-start gap-6">
            <div
              className={`p-0 text-[31px] font-bold ${isMid2 ? "text-[25px]" : "text-[31px]"}`}
            >
              Today
            </div>
            <div
              className={`box-stuff flex items-center justify-center rounded-sm border px-3 ${isMid2 ? "text-[22px]" : "text-[26px]"}`}
            >
              {len}
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg p-3 ">
            <Tasklayout tasklist={todaytasks} title="" />
          </div>
        </div>
      )}

      {selected && <Taskbox />}
    </>
  );
}

export default Today;
