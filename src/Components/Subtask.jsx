function Subtask(prop) {
  const { title, completed, id } = prop.subtask;
  return (
    <div className="flex w-full cursor-pointer flex-row items-center justify-between gap-2 border-t px-5 py-1 text-sm">
      <div className="flex flex-row justify-start gap-2 ">
        {" "}
        <input
          type="checkbox"
          className="m-0 bg-black p-0"
          checked={completed}
          onChange={()=>prop.handlecheck(id)}
        />
        <div>{title}</div>
      </div>

      <div className="">x</div>
    </div>
  );
}

export default Subtask;
