import tasksListData from "../models/local_data/tasksList.json";
import Status from "../constants/status";
import React from "react";

export const TasksContext = React.createContext();

const TasksStore = ({ children }) => {
  const [tasksList, setTasksList] = React.useState(tasksListData);

  function _setStatusForEachTask(list) {
    const result = list.map((task) => {
      if (
        task.created_at !== "" &&
        task.started_at === "" &&
        task.finished_at === ""
      ) {
        task.status = Status.ACTIVE;
      } else if (
        task.created_at !== "" &&
        task.started_at !== "" &&
        task.finished_at === ""
      ) {
        task.status = Status.STARTED;
      } else if (
        task.created_at !== "" &&
        task.started_at !== "" &&
        task.finished_at !== ""
      ) {
        task.status = Status.DONE;
      } else {
        console.log('ERROR: Unknown "status"');
      }

      return task;
    });

    return result;
  }
  React.useEffect(() => {
    const tasksWithStatus = _setStatusForEachTask(tasksListData);
    setTasksList([...tasksWithStatus]);
  }, [...tasksListData]);

  return (
    <TasksContext.Provider value={[tasksList, setTasksList]}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksStore;
