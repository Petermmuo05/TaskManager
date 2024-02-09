function EditSticky(prop) {
  const { setname, setdescription, description, name, handlesubmit, handledelete } = prop;

  function handlechange(e, setter) {
    const value = e.target.value;
    setter(value); //using the usestate setter function passed as an argument
  }
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <h1 className="flex w-full items-center justify-start text-lg font-bold">
        New Sticky:
      </h1>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => handlechange(e, setname)}
        className="nofocus mb-1 h-10 w-full rounded-lg border bg-gray-100 px-2 "
      />
      <textarea
        id="description"
        name="story"
        rows="10"
        cols="33"
        placeholder="Description"
        value={description}
        onChange={(e) => handlechange(e, setdescription)}
        className="mb-2 w-full rounded-lg border bg-gray-100 p-2"
      ></textarea>
      <div
        className="absolute bottom-4 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-[50%] bg-gray-500 text-white"
        onClick={handlesubmit}
      >
        +
      </div>
      <div
        className="absolute top-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-[50%] bg-red-500 text-white"
        onClick={handledelete}
      >
        X
      </div>
    </div>
  );
}

export default EditSticky;
