import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
// import Homepage from "./Pages/Homepage";
// import Login from "./Pages/Login";
import Applayout from "./Applayout";
import List from "./Pages/List";
// import Layout from "./Layout";
import Upcoming from "./Pages/Upcoming";
import Today from "./Pages/Today";
// import Sticky from "./Pages/Sticky";
// import List from "./Pages/List";
// import Dashboard from "./Pages/Dashboard";
// import Assignment from "./Pages/Assignment";
// import Tasks from "./Pages/Tasks";
// import Classes from "./Pages/Classes";
// import Study from "./Pages/Study";
// import Cgpa from "./Pages/Cgpa";

const router = createBrowserRouter([
  // {
  //   element: <Layout />,
  //   children: [
  //     { path: "/", element: <Homepage /> },
  //     { path: "/login", element: <Login /> },
  //   ],
  // },
  {
    path: "/app",

    element: <Applayout />,
    children: [
      { path: "upcoming", element: <Upcoming />, children: [] },
    //   { path: "dashboard", element: <Dashboard /> },
    //   { path: "assignments", element: <Assignment /> },
      { path: "Today", element: <Today /> },
    //   { path: "sticky", element: <Sticky /> },
    //   { path: "tasks", element: <Tasks /> },
    //   { path: "classes", element: <Classes /> },
    //   { path: "cgpa", element: <Cgpa /> },
    //   { path: "study", element: <Study /> },
      { path: "list/:name", element: <List /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
