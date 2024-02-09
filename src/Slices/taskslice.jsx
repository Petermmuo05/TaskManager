import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: [],
  stickylist: [],
  selected: null,
  menuopen: true,
  isLoading: true,
  lists: [],
  assignments: [],
  schedule: [],
  studyschedule: [],
  yesterdaystudy: {},
  todaystudy: {},
  studyloader: true,
  classesloader: true,
  cgpalist: [],
  cgpaloader: true,
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selecttask(state, action) {
      state.selected = action.payload;
    },
    displaymenu(state, action) {
      state.menuopen = action.payload;
    },
    loadingdata(state) {
      state.isLoading = true;
    },
    dataloaded(state) {
      state.isLoading = false;
    },

    loaddata(state, action) {
      if (action.payload.type === "tasks") {
        state.tasklist = action.payload.data;
      } else if (action.payload.type === "sticky") {
        state.stickylist = action.payload.data;
      } else if (action.payload.type === "lists") {
        state.lists = action.payload.data;
      } else if (action.payload.type === "assignments") {
        state.assignments = action.payload.data;
      } else if (action.payload.type === "schedule") {
        state.schedule = action.payload.data;
        state.classesloader = false;
      } else if (action.payload.type === "studyschedule") {
        state.studyschedule = action.payload.data;
        state.studyloader = false;
      } else if (action.payload.type === "CGPA") {
        state.cgpalist = action.payload.data;
        state.cgpaloader = false;
      }
      state.isLoading = false;
    },
    adddata(state, action) {
      if (action.payload.type === "tasks") {
        state.tasklist = [...state.tasklist, action.payload.data];
        state.selected = null;
      } else if (action.payload.type === "sticky") {
        state.stickylist = [...state.stickylist, action.payload.data];
      } else if (action.payload.type === "lists") {
        state.lists = [...state.lists, action.payload.data];
      } else if (action.payload.type === "assignments") {
        state.assignments = [...state.assignments, action.payload.data];
      } else if (action.payload.type === "CGPA") {
        state.cgpalist = [...state.cgpalist, action.payload.data];
      }
      state.isLoading = false;
    },
    removetask(state, action) {
      state.isLoading = false;
      console.log(action.payload.id);
      console.log("removing task");
      console.log(action.payload.type);
      state.selected = null;
      if (action.payload.type === "tasks") {
        state.tasklist = state.tasklist.filter(
          (task) => task.id !== action.payload.id,
        );
      } else if (action.payload.type === "sticky") {
        state.stickylist = state.stickylist.filter((sticky) => {
          console.log(sticky.id, action.payload.id);
          return sticky.id !== action.payload.id;
        });
        console.log(state.stickylist);
      } else if (action.payload.type === "assignments") {
        state.assignments = state.assignments.filter(
          (assignment) => assignment.id !== action.payload.id,
        );
      } else {
        console.log("INVALID TYPE");
        throw Error("Invalid type");
      }
    },

    updatedata(state, action) {
      state.isLoading = false;
      console.log(action.payload);
      if (action.payload.type === "tasks") {
        state.tasklist = state.tasklist.map((task) => {
          return task.id === action.payload.id ? action.payload.data : task;
        });
        state.selected = null;
      } else if (action.payload.type === "sticky") {
        state.stickylist = state.stickylist.map((sticky) => {
          return sticky.id === action.payload.id ? action.payload.data : sticky;
        });
      } else if (action.payload.type === "assignments") {
        state.assignments = state.assignments.map((assignment) => {
          return assignment.id === action.payload.id
            ? action.payload.data
            : assignment;
        });
      } else if (action.payload.type === "schedule") {
        state.schedule = state.schedule.map((item) => {
          return item.id === action.payload.id ? action.payload.data : item;
        });
      } else if (action.payload.type === "studyschedule") {
        state.studyschedule = state.studyschedule.map((item) => {
          return item.id === action.payload.id ? action.payload.data : item;
        });
      } else if (action.payload.type === "CGPA") {
        state.cgpalist = state.cgpalist.map((item) => {
          return item.id === action.payload.id ? action.payload.data : item;
        });
      }
    },
    settasklist(state, action) {
      state.tasklist = action.payload;
    },
    settodaystudy(state, action) {
      state.todaystudy = action.payload;
    },
    setyesterdaystudy(state, action) {
      state.yesterdaystudy = action.payload;
    },
  },
});
export const {
  selecttask,
  displaymenu,
  settasklist,
  dataloaded,
  settodaystudy,
  setyesterdaystudy,
} = taskSlice.actions;
export default taskSlice.reducer;

export function gettasks(type) {
  return async function (dispatch) {
    try {
      dispatch({ type: "task/loadingdata" });
      const res = await fetch(`http://localhost:9000/${type}`);
      const data = await res.json();
      console.log(data);
      console.log("Loader of data");
      dispatch({ type: "task/loaddata", payload: { data, type } });
      console.log("Loading data complete");
    } catch (e) {
      dispatch({ type: "task/loadingfailed" });
    }
  };
}
export function settasks(newtask, id, type) {
  return async function (dispatch) {
    try {
      console.log("trying to new tasks");
      console.log(newtask);
      console.log(JSON.stringify(newtask));
      const res = await fetch(`http://localhost:9000/${type}/${id}`, {
        method: "PUT",
        body: JSON.stringify(newtask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("The data from the update");
      console.log(data);
      dispatch({ type: "task/updatedata", payload: { data, id, type } });
      console.log("posted data completely");
    } catch (e) {
      dispatch({ type: "task/loadingfailed" });
      throw Error(`Failed to update ${type}.`);
    }
  };
}

export function addtasks(newtask, type) {
  const url = `http://localhost:9000/${type}`;
  return async function (dispatch) {
    try {
      console.log("trying to add task to tasklist");
      dispatch({ type: "task/loadingdata" });
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newtask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      //let the type determine the array in which the data will be stored. Pass type as an argument in the payload
      dispatch({ type: "task/adddata", payload: { data, type } });
      console.log("posted data completely");
    } catch (e) {
      dispatch({ type: "task/loadingfailed" });
    }
  };
}

export function deletedata(type, id) {
  return async function (dispatch) {
    dispatch({ type: "task/loadingdata" });
    await fetch(`http://localhost:9000/${type}/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "task/removetask", payload: { type, id } });
  };
}
