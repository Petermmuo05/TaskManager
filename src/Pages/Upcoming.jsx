import { useSelector } from "react-redux";
import Tasklayout from "../Components/Tasklayout";
import Taskbox from "../Components/Taskbox";
import {
  checkifinweek,
  checkiftoday,
  checkiftomorrow,
} from "../Components/Filtercomponents";
import { useMediaQuery } from "react-responsive";

function Upcoming() {
  const selected = useSelector((store) => store.task.selected);
  const tasklist = useSelector((store) => store.task.tasklist);
  const len = tasklist.filter((tasks) => checkifinweek(tasks.date)).length;
  const isMid = useMediaQuery({ query: "(max-width: 660px)" });

  return (
    <>
      {!(isMid && selected) && (
        <div
          className={`items-left flex h-full ${
            selected ? "w-3/5" : "w-full"
          } flex-col justify-between p-5`}
        >
          <div className="flex w-full flex-row items-center justify-start gap-6">
            <div className="p-0 text-[31px] font-bold">Upcoming</div>
            <div className="box-stuff flex items-center justify-center rounded-sm border px-3 text-[26px]">
              {len}
            </div>
          </div>{" "}
          <div
            className={`align-center flex ${isMid ? "h-[38%]" : "h-[45%]"} w-full justify-center rounded-lg border p-3`}
          >
            <Tasklayout
              title="Today"
              tasklist={tasklist.filter((tasks) => checkiftoday(tasks.date))}
            />
          </div>
          <div
            className={`align-center flex  ${isMid ? "h-[53%]" : "h-[42%]"} w-full flex-row items-start justify-between ${isMid ? "flex-col" : "flex-row"}`}
          >
            <div
              className={`h-full  rounded-lg border  ${isMid ? "w-[100%]" : "w-[49%]"} p-3`}
            >
              <Tasklayout
                title="Tomorrow"
                tasklist={tasklist.filter((tasks) =>
                  checkiftomorrow(tasks.date)
                )}
              />
            </div>
            <div
              className={`h-full  rounded-lg border  ${isMid ? "w-[100%]" : "w-[49%]"} p-3`}
            >
              <Tasklayout
                title="This Week"
                tasklist={tasklist
                  .filter((tasks) => checkifinweek(tasks.date))
                  .slice(0, 5)}
              />
            </div>
          </div>
        </div>
      )}

      {selected && <Taskbox />}
    </>
  );
}

export default Upcoming;
