import { useDispatch } from "react-redux";
import { selecttask } from "../Slices/taskslice";

function Newtask(prop) {
  const dispatch = useDispatch();
  function handleclick() {
    dispatch(selecttask("new task"));
  }
  return (
    <div
      className={"relative flex w-full flex-row items-start justify-start rounded-sm px-4 py-2 text-[14px] border"}
      onClick={handleclick}
    >
      <div className="flex flex-row items-start gap-3 text-[14px]">
        <div className="m-0 inline h-fit py-0 font-bold">{prop.first}</div>
        <div className="justify-left flex flex-col gap-1">
          <span>{prop.second}</span>
        </div>
      </div>
      
    </div>
  );
}

export default Newtask;
