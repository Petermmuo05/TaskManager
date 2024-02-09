import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtasks } from "../Slices/taskslice";
import EditSticky from "./EditSticky";

function NewSticky(prop) {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const dispatch = useDispatch();
  const handleclick = prop.onClick;

  function getUID() {
    return Date.now().toString(36);
  }

  //   function handletaskchanges() {
  //     console.log("updating list");
  //   }
  function handlesubmit() {
    const id = getUID();
    const stickydata = { name, description, id };
    handleclick();
    dispatch(addtasks(stickydata, "sticky", id));
  }

  return (
    <EditSticky
      handlesubmit={handlesubmit}
      setdescription={setdescription}
      setname={setname}
      name={name}
      description={description}
      handledelete={handleclick}
    />
  );
}

export default NewSticky;
// <div className="relative flex h-full w-full flex-col items-center justify-start">
//   <h1 className="flex w-full items-center justify-start text-lg font-bold">
//     New Sticky:
//   </h1>
//   <input
//     type="text"
//     placeholder="Title"
//     value={name}
//     onChange={(e) => handlechange(e, setname)}
//     className="nofocus mb-1 h-10 w-full rounded-lg border bg-gray-100 px-2 "
//   />
//   <textarea
//     id="description"
//     name="story"
//     rows="10"
//     cols="33"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => handlechange(e, setdescription)}
//     className="mb-2 w-full rounded-lg border bg-gray-100 p-2"
//   ></textarea>
//   <div
//     className="absolute bottom-4 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-[50%] bg-gray-500 text-white"
//     onClick={handlesubmit}
//   >
//     +
//   </div>
// </div>
