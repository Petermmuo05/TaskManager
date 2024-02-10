import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <div className="absolute flex h-full w-full items-center justify-center gap-5">
        <div className="flex h-[95%] w-[40%] rounded-md bg-black">
          <img src="firststuff.png" alt="image" width="1500px" />
        </div>
        <div className="relative flex h-[95%] w-[50%] items-center justify-center rounded-md border">
          <div className="items-left flex w-2/3 flex-col justify-center gap-4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
