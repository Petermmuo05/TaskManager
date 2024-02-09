import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selecttask, settasklist, settasks } from "../Slices/taskslice";
import { useEffect, useState } from "react";

function Task(prop) {
  const dispatch = useDispatch();
  const tasklist = useSelector((store) => store.task.tasklist);
  const lists = useSelector((store) => store.task.lists);
  const { name, completed, id, date, subtasks, list } = prop.task;
  const { expanded, setexpanded } = prop;
  const standarddate = new Date(date).toLocaleDateString();
  console.log("completed");
  console.log(completed);
  console.log(typeof completed);
  console.log(prop.task);
  console.log(completed === "true" ? true : false);
  const [ischecked, setchecked] = useState(completed === "true" ? true : false);
  useEffect(
    function () {
      console.log("completed was changed");
      setchecked(completed === "true" ? true : false);
    },
    [completed],
  );
  console.log(ischecked);
  function handleclick() {
    dispatch(selecttask(prop.task));
  }
  function getColor(name) {
    const color = lists.filter((list) => list.name === name)[0].color;
    console.log("The color is:");
    console.log(color);
    return color;
  }
  function handleexpanded() {
    expanded === id ? setexpanded(null) : setexpanded(id);
  }
  function handlecheck() {
    console.log("checked the box");
    let newlist = tasklist.map((task) => {
      let newtask = { ...task };
      if (newtask.id === id) {
        newtask.completed = ischecked ? "false" : "true"; //return the string of the opposite of ischecked ie true=> "false"
      }
      return newtask;
    });

    console.log("tasklist, id, newlist");
    console.log(tasklist);
    console.log(id);
    console.log(newlist);
    const value = ischecked ? "false" : "true";
    dispatch(settasks({ ...prop.task, completed: value }, id, "tasks"));
    dispatch(settasklist(newlist));
    setchecked((s) => !s);
  }
  return (
    <div
      className={`relative flex w-full cursor-pointer flex-row items-start justify-between rounded-sm px-4 py-1 text-[14px] ${
        prop.first === "+" ? "border" : "border-b"
      }`}
      onClick={prop.first === "+" ? handleclick : null}
    >
      <div className="flex flex-row items-start gap-3 text-[14px]">
        <div className="m-0 inline h-fit py-0 ">
          {prop.first === "button" ? (
            <input
              type="checkbox"
              className="m-0 bg-black p-0"
              checked={ischecked}
              onChange={() => handlecheck()}
            />
          ) : (
            prop.first
          )}
        </div>
        <div
          className="justify-left flex flex-col gap-1"
          onClick={handleexpanded}
        >
          <span>{name}</span>

          {expanded === id && (
            <div className="flex flex-row ">
              <div className="flex flex-row items-center gap-2 border-r pr-6 text-[12px]">
                <img src="/calendar.png" alt="." width="15px" height="15px" />
                <span>{standarddate}</span>
              </div>

              <div className="flex flex-row items-center gap-2 border-r px-6 text-[12px]">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-[4px] bg-green-100`}
                >
                  {subtasks.length}
                </div>
                <span>Subtasks</span>
              </div>
              <div className="flex flex-row items-center gap-2 px-6 text-[12px]">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-[4px] `}
                  style={{ background: getColor(list) }}
                ></div>
                <span>{list}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <span
        className="font-bold"
        onClick={prop.first === "+" ? null : handleclick}
      >
        <img src="/rightarrow.png" alt="arr" />
      </span>
    </div>
  );
}
export default Task;
