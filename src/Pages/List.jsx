import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Tasklayout from "../Components/Tasklayout";
import Taskbox from "../Components/Taskbox";
import { useState } from "react";

// function List() {
//     const {name}=useParams()
//     return (
//         <div>

//         </div>
//     )
// }

// export default List
function List() {
  const selected = useSelector((store) => store.task.selected);
  const tasklist = useSelector((store) => store.task.tasklist);
  const { name } = useParams();
  const tasksinlist = tasklist.filter((task) => task.list === name);
  const len = tasksinlist.length;
  const [expanded, setexpanded] = useState(null);

  return (
    <>
      <div
        className={`items-left flex h-full gap-6  ${
          selected ? "w-3/5" : "w-full"
        } flex-col justify-start p-6 `}
      >
        <div className="flex w-full flex-row items-center justify-start gap-6 ">
          <div className="p-0 text-[28px] font-bold">{name}</div>
          <div className="box-stuff flex items-center justify-center rounded-sm border px-3 text-[26px]">
            {len}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-lg p-3 ">
          <Tasklayout
            tasklist={tasksinlist}
            title=""
            expanded={expanded}
            setexpanded={setexpanded}
          />
        </div>
      </div>
      {selected && <Taskbox />}
    </>
  );
}

export default List;
