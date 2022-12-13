import React from "react";

import TasksStore from "./store/TasksStore";
import TasksList from "./pages/TasksList";

export default function App() {
  return (
    <TasksStore>
      <TasksList />
    </TasksStore>
  );
}
