import { useDispatch, useSelector } from "react-redux";
import {
  addtasks,
  deletedata,
  selecttask,
  settasks,
} from "../Slices/taskslice";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Subtasklayout from "./Subtasklayout";
import Subtask from "./Subtask";
import { useMediaQuery } from "react-responsive";

function Taskbox() {
  const dispatch = useDispatch();
  const selectedtask = useSelector((store) => store.task.selected);
  const {
    name: sname,
    description: sdescription,
    list: slist,
    subtasks: ssubtasks,
  } = selectedtask;
  const tasklist = useSelector((store) => store.task.tasklist);
  const lists = useSelector((store) => store.task.lists);
  const [name, setname] = useState(sname);
  const [description, setdescription] = useState(sdescription);
  const [list, setlist] = useState(slist || "personal");
  const [date, setdate] = useState(new Date());
  const [validdate, setvaliddate] = useState(true);
  const [subtasks, setsubtasks] = useState(ssubtasks);
  const [isaddsubtasks, setisaddsubtasks] = useState(false);
  const [tasktitle, settasktitle] = useState("");

  function handleClick() {
    dispatch(selecttask(null));
  }
  function handlechange(e, setter) {
    const value = e.target.value;
    setter(value); //using the usestate setter function passed as an argument
  }
  function getUID() {
    return Date.now().toString(36);
  }
  function handletaskchanges() {
    console.log("updating list");
    const newtask =
      selectedtask === "new task"
        ? {
            name,
            list,
            description,
            date,
            subtasks: [],
            completed: "false",
            tags: "",
            id: getUID(),
          }
        : { ...selectedtask, name, list, description, date, subtasks };
    console.log("The seconds from the standard chosen date is:");
    console.log(date.getTime());
    validdate
      ? selectedtask === "new task"
        ? dispatch(addtasks(newtask, "tasks"))
        : dispatch(settasks(newtask, selectedtask.id, "tasks"))
      : alert("Select a future date");
  }

  function deletesubtask(subtask_id) {
    const newsubtasks = subtasks.filter((task) => task.id !== subtask_id);
    console.log("deleting subtask");
    setsubtasks(newsubtasks);
  }

  function checksubtask(subtask_id) {
    const newsubtasks = subtasks.map((task) => {
      const update =
        task.id === subtask_id ? { ...task, completed: !task.completed } : task;
      return update;
    });
    console.log("checking subtask");
    setsubtasks(newsubtasks);
  }
  function addsubtasks(title) {
    const id = getUID();
    const newsubtask = { title, completed: false, id };
    console.log("adding new subtask");
    console.log(newsubtask);
    console.log("adding new subtask");
    setsubtasks([...subtasks, newsubtask]);
  }

  function checkdate(date) {
    const end = date.getTime();
    const current = new Date().getTime();
    if (end < current) {
      setvaliddate(false);
    } else {
      setvaliddate(true);
    }
  }
  function handledelete() {
    const id = selectedtask.id;
    dispatch(deletedata("tasks", id));
  }
  function handleaddsubtasks() {
    console.log("calling handle function ");
    if (isaddsubtasks) {
      addsubtasks(tasktitle);
      setisaddsubtasks(false);
      settasktitle("");
    } else {
      console.log("subtask is false");

      setisaddsubtasks(true);
    }
  }

  const isMid = useMediaQuery({ query: "(max-width: 660px)" });
  const isMid2 = useMediaQuery({ query: "(max-width: 823px)" });

  return (
    <div
      className={`flex h-full  ${isMid2 ? "w-[100%]" : "w-[39%]"} flex-col items-center justify-between rounded-xl bg-gray-100 px-5 py-3`}
    >
      <div className="items-left flex w-full flex-col justify-center gap-2">
        <div className="m-1 flex w-full flex-row items-center justify-between text-xl font-bold">
          <span>Task:</span>
          <span onClick={handleClick}>x</span>
        </div>
        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => handlechange(e, setname)}
          className="nofocus mb-1 h-10 w-full rounded-lg border bg-gray-100 px-2 "
        />
        <textarea
          id="description"
          name="story"
          rows="6"
          cols="33"
          placeholder="Description"
          value={description}
          onChange={(e) => handlechange(e, setdescription)}
          className="mb-2 w-full rounded-lg border bg-gray-100 p-2"
        ></textarea>
        <div className="justify-left flex flex-row items-center">
          <span className="flex w-24 "> List</span>
          <select
            name="list"
            id="list"
            className="rounded-lg border bg-gray-100 p-1"
            value={list}
            onChange={(e) => handlechange(e, setlist)}
          >
            {lists.map((list) => (
              <option value={list.name} key={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <div className="justify-left flex flex-row items-center ">
          <span className="flex w-24 "> Due date</span>
          <DatePicker
            selected={date}
            onChange={(date) => {
              checkdate(date);
              setdate(date);
            }}
          />
          {!validdate && (
            <div className=" ml-1 flex h-5 w-5 items-center justify-center rounded-[50%] bg-red-500 text-white">
              ?
            </div>
          )}
        </div>
        <div className="justify-left flex flex-row items-center">
          <span className="flex w-24 "> Tags</span>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="rounded-md bg-green-200 px-3 py-1">Tag 1</div>
            <div className="rounded-md bg-blue-200 px-3 py-1">+ Add Tag</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Subtasks:</h1>
        <div className="flex flex-col items-center justify-center ">
          <div
            className={
              "relative flex w-full flex-row items-start justify-start rounded-sm border px-4 py-2 text-[14px]"
            }
          >
            <div className="flex flex-row items-start gap-3 text-[14px]">
              <div
                className="m-0 inline h-fit py-0 font-bold"
                onClick={() => {
                  handleaddsubtasks();
                }}
              >
                +
              </div>
              <div className="justify-left flex flex-col gap-1">
                {isaddsubtasks ? (
                  <input
                    type="text"
                    value={tasktitle}
                    onChange={(e) => settasktitle(e.target.value)}
                    placeholder="Enter title"
                    className="rounded-sm border bg-gray-100 px-2"
                  />
                ) : (
                  <span>Add New Subtask</span>
                )}
              </div>
              {isaddsubtasks && (
                <div
                  className="absolute right-4 flex cursor-pointer items-center justify-center"
                  onClick={() => setisaddsubtasks(false)}
                >
                  x
                </div>
              )}
            </div>
          </div>
          {subtasks &&
            subtasks.map((task) => (
              <div
                key={task.id}
                className="flex w-full cursor-pointer flex-row items-center justify-between gap-2 border-t px-5 py-1 text-sm"
              >
                <div className="flex flex-row justify-start gap-2 ">
                  {" "}
                  <input
                    type="checkbox"
                    className="m-0 bg-black p-0"
                    checked={task.completed}
                    onChange={() => checksubtask(task.id)}
                  />
                  <div>{task.title}</div>
                </div>

                <div
                  className="flex h-5 w-5 items-center justify-center rounded-[50%] bg-red-100"
                  onClick={() => deletesubtask(task.id)}
                >
                  x
                </div>
              </div>
            ))}
        </div>
        <div className="flex h-24 w-full flex-col items-center justify-center pl-3"></div>
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div
          className="flex h-12 w-[46%] items-center justify-center rounded-lg border text-lg font-bold"
          onClick={handledelete}
        >
          Delete Task
        </div>
        <div
          className="flex h-12 w-[46%] items-center justify-center rounded-lg bg-yellow-400 text-lg font-bold"
          onClick={handletaskchanges}
        >
          Save Changes
        </div>
      </div>
    </div>
  );
}
export default Taskbox;
