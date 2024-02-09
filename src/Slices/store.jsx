import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskslice";

const store=configureStore({reducer:{task:taskReducer}})
export default store