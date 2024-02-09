import { useSelector } from "react-redux";
import Task from "./Taskstruct";
import Newtask from "./NewTask";

function Tasklayout(prop) {
  const { tasklist } = prop; //task list to be edited later
  console.log(prop.title);
  const { expanded, setexpanded } = prop;
  return (
    <div className="w-full">
      <h1 className="mb-1 text-[19px] font-bold">{prop.title}</h1>
      <Newtask first="+" second="Add New Task" />
      {tasklist.map((task) => (
        <Task
          first="button"
          key={task.id}
          task={task}
          third=">"
          expanded={expanded}
          setexpanded={setexpanded}
        />
      ))}
    </div>
  );
}

export default Tasklayout;
