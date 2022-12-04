import tasksListData from "../models/local_data/tasksList.json";
import Status from "../constants/status";

export default function getTasks() {
  const tasksList = tasksListData.map((task) => {
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

  // INSPECT "tasksList"
  // console.log(JSON.stringify(tasksList, null, 2));

  return tasksList;
}
