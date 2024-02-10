import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <h1 className="text-4xl font-bold ">Productive Mind</h1>
      <p className="text-sm">
        With only the features you need, Task manager is customized for
        individuals seeking a stress free way to stay focused on their goals,
        projects and tasks.
      </p>
      <div className="flex w-full items-center justify-center rounded-lg bg-green-300 p-2">
        <Link to="/app">Get Started</Link>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/app">Already have an account? Sign in</Link>
      </div>
    </>
  );
}

export default Homepage;
