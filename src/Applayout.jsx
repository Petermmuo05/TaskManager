import { Navigate, Outlet, useNavigate } from "react-router";
// import Tasklayout from "./Components/Tasklayout";
// import Upcoming from "./Pages/Upcoming";
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addtasks,
  dataloaded,
  displaymenu,
  gettasks,
  settodaystudy,
  setyesterdaystudy,
} from "./Slices/taskslice";
import { checkifinweek, checkiftoday } from "./Components/Filtercomponents";
import { useMediaQuery } from "react-responsive";

function Applayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.task.studyschedule);
  const todaystudy = useSelector((store) => store.task.todaystudy);
  const yesterdaystudy = useSelector((store) => store.task.yesterdaystudy);
  const loader = useSelector((store) => store.task.studyloader);
  const [time, setTime] = useState(0);

  useEffect(
    function () {
      dispatch(gettasks("tasks"));
      dispatch(gettasks("lists"));
      dispatch(dataloaded());
      navigate("/app/upcoming");
    },
    [navigate, dispatch]
  );

  const menuopen = useSelector((store) => store.task.menuopen);
  const isLoading = useSelector((store) => store.task.isLoading);
  const task = useSelector((store) => store.task);

  console.log(task);
  const lists = task.lists;
  const [listname, setlistname] = useState("");
  const [color, setcolor] = useState("blue");
  const [isaddlist, setaddlist] = useState(false);

  const todaylen = task.tasklist.filter((tasks) =>
    checkiftoday(tasks.date)
  ).length;
  const upcominglen = task.tasklist.filter((tasks) =>
    checkifinweek(tasks.date)
  ).length;

  function getUID() {
    return Date.now().toString(36);
  }
  function getlength(name) {
    const list = task.tasklist.filter((task) => task.list === name);
    const len = list.length;
    console.log(list, len);
    return len;
  }
  function handlenewlist() {
    const id = getUID();
    const newlist = { name: listname, color, id };
    if (listname) {
      dispatch(addtasks(newlist, "lists"));
    }
  }
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const intDateFormat = new Intl.DateTimeFormat("en-ZA", options);
  const Today_date = intDateFormat.format(date); // Tuesday, 22 November 2022

  //mediaqueries
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isMid = useMediaQuery({ query: "(max-width: 660px)" });
  const isMid2 = useMediaQuery({ query: "(max-width: 823px)" });

  function handlemenuclose() {
    isMid2 && dispatch(displaymenu(false));
  }

  console.log(isLoading);
  console.log(task);
  return !isLoading ? (
    <div>
      <div
        className={`absolute flex h-full w-full items-center  justify-evenly bg-gray-50`}
      >
        {menuopen ? (
          <div
            className={`sidebar relative flex h-[100%]   ${isMid2 ? "w-[90%]" : "w-[21%]"} flex-col gap-6 border bg-white p-3`}
          >
            <div className="flex flex-row items-center justify-between">
              <span className="text-[24px] font-bold">
                {isMid2 ? "Task Manager" : "Menu"}
              </span>
              {isMid2 ? (
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-col justify-end">
                    <span className="text-[12px] font-bold">Sarah Collins</span>
                    <span className="text-[8px]">College Student</span>
                  </div>
                  <div className="roundedimg">
                    <img src="/animeprofile.jpg" />
                  </div>
                </div>
              ) : (
                <img
                  src="/menu.png"
                  alt="menu"
                  onClick={() => dispatch(displaymenu(false))}
                />
              )}
            </div>
            <hr />

            <div className="items-left flex w-full flex-col justify-center">
              <h1 className="text-[11px] font-bold">TASKS</h1>
              <NavLink to="Upcoming" onClick={() => handlemenuclose()}>
                <Item
                  type=""
                  first="/doublearrow.png"
                  second="Upcoming"
                  third={upcominglen}
                />
              </NavLink>
              <NavLink to="Today" onClick={() => handlemenuclose()}>
                <Item
                  type=""
                  first="/menuimg.png"
                  second="Today"
                  third={todaylen}
                />
              </NavLink>
            </div>
            <hr />
            <div className="items-left flex w-full flex-col justify-center">
              <h1 className="text-[11px] font-bold">LISTS</h1>
              {task.lists.map((list) => (
                <NavLink
                  to={`list/${list.name}`}
                  key={list.id}
                  onClick={() => handlemenuclose()}
                >
                  <Item
                    type="list"
                    first={list.color}
                    second={list.name}
                    third={getlength(list.name)}
                  />
                </NavLink>
              ))}

              <div onClick={() => setaddlist(true)}>
                <Item first="/add.png" second="Add New List" third={null} />
              </div>
            </div>
            {isaddlist && (
              <div className="items-left relative flex w-[96%] flex-col justify-center gap-5 rounded-lg border px-3 py-6 pb-10 ">
                <div
                  className="absolute right-3 top-7 "
                  onClick={() => {
                    setaddlist(false);
                    handlenewlist();
                  }}
                >
                  <img src="/add.png" alt="plus" />
                </div>
                <div
                  className="absolute right-3 top-[120px] "
                  onClick={() => {
                    setaddlist(false);
                  }}
                >
                  <img src="/close.png" alt="plus" />
                </div>
                <div className="flex flex-row items-center justify-start gap-3 rounded-sm border px-2 py-1">
                  <div
                    className={`block h-4 w-4 rounded-[4px]`}
                    style={{ backgroundColor: color }}
                  ></div>
                  <input
                    type="text"
                    placeholder="List Name"
                    className="nofocus bg-gray-100"
                    value={listname}
                    onChange={(e) => setlistname(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Colorbox value="red" color={color} setcolor={setcolor} />
                  <Colorbox value="blue" color={color} setcolor={setcolor} />
                  <Colorbox value="yellow" color={color} setcolor={setcolor} />
                  <Colorbox value="green" color={color} setcolor={setcolor} />
                  <Colorbox value="violet" color={color} setcolor={setcolor} />
                  <Colorbox value="orange" color={color} setcolor={setcolor} />
                  <Colorbox value="gray" color={color} setcolor={setcolor} />
                  <Colorbox value="black" color={color} setcolor={setcolor} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex h-[95%] w-[5%] flex-col items-center justify-start ">
            <img
              src="/menu.png"
              alt="menu"
              width="25px"
              height="10px"
              onClick={() => dispatch(displaymenu(true))}
            />
          </div>
        )}
        {!(menuopen && isMid2) && (
          <div
            className={`items-left h-[100%] w-[79%] flex-col ${
              menuopen ? "w-[76%]" : "w-[90%]"
            } justify-between rounded-md bg-blue-50`}
          >
            <div className="flex h-[7%] w-full flex-row items-center justify-between text-black bg-gray-300 px-6">
              <span
                className={`${isMid ? "text-[16px]" : "text-[20px]"} font-bold text-[#034B61]`}
              >
                Task Manager
              </span>
              <div className="flex flex-row items-center gap-4">
                {!isMid && (
                  <>
                    <div className="flex flex-row items-center gap-2 ">
                      <div>
                        <img src="/calendar.png" />
                      </div>
                      <span className="text-[13px]">{Today_date}</span>
                    </div>
                    <div className="mr-4 flex">
                      <img src="/notifications.png" />
                    </div>
                  </>
                )}

                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-col justify-end">
                    <span className="text-[12px] font-bold">Sarah Collins</span>
                    <span className="text-[8px]">College Student</span>
                  </div>
                  <div className="roundedimg">
                    <img src="/animeprofile.jpg" />
                  </div>
                </div>
              </div>
            </div>
            {!isLoading && (
              <div className="flex h-[93%] w-full">
                <Outlet />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
function Item(prop) {
  return (
    <div className="container relative flex h-8 w-full flex-row items-center justify-between rounded-lg px-2 text-[14px] ">
      <div className="relative left-2 flex flex-row items-center gap-3 text-[14px] ">
        {prop.type !== "list" ? (
          <img src={prop.first} width="15px" height="18px" alt="c" />
        ) : (
          <div
            className={`block h-4 w-4 rounded-[4px]`}
            style={{ backgroundColor: prop.first }}
          ></div>
        )}
        <span>{prop.second}</span>
      </div>
      {prop.third !== null && (
        <div
          className={`lenbox bg- flex h-5 w-7 items-center justify-center rounded-[4px] bg-gray-200 text-[12px]`}
        >
          {prop.third}
        </div>
      )}
    </div>
  );
}
function Colorbox(prop) {
  const { value, color, setcolor } = prop;
  return (
    <div className={`p-2 ${color === value ? "border" : ""}`}>
      <div
        className={`block h-4 w-4 rounded-[4px]`}
        style={{ backgroundColor: value }}
        onClick={() => setcolor(value)}
      ></div>
    </div>
  );
}
//background-color: rgb(249 115 22 / var(--tw-bg-opacity)),background-color: rgb(229 231 235 / var(--tw-bg-opacity)),background-color: rgb(234 179 8 / var(--tw-bg-opacity))
export default Applayout;
