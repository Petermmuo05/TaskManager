function Gen_newtask(prop) {
  const { first, second, handleclick } = prop;
  return (
    <div
      className={
        "hoverbox relative flex w-full flex-row items-start justify-start  rounded-sm px-4 py-2 text-[14px]"
      }
      onClick={handleclick}
    >
      <div className="flex flex-row items-start gap-3 text-[14px]">
        {/* <div className="m-0 inline h-fit py-0 font-bold">{first}</div> */}
        <img src="/addass.png"/>
        <div className="justify-left flex flex-col gap-1">
          <span>{second}</span>
        </div>
      </div>
    </div>
  );
}

export default Gen_newtask;
