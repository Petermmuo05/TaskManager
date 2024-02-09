import Newtask from "./NewTask";
import Subtask from "./Subtask";

function Subtasklayout() {
  return (
    <div className="flex flex-col items-center justify-center ">
    <div
      className={"relative flex w-full flex-row items-start justify-start rounded-sm px-4 py-2 text-[14px] border"}
    >
      <div className="flex flex-row items-start gap-3 text-[14px]">
        <div className="m-0 inline h-fit py-0 font-bold">+</div>
        <div className="justify-left flex flex-col gap-1">
            {}
          <span>Add New Subtask</span>
        </div>
      </div>
      
    </div>
      <Subtask subtask={{ title: "Subtask", ischecked: true }} />
    </div>
  );
}

export default Subtasklayout;
