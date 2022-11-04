// To parse this data:
//
//   const Convert = require("./file");
//
//   const tasksList = Convert.toTasksList(json);

// Converts JSON strings to/from your types
function toTasksList(json) {
  return JSON.parse(json);
}

function tasksListToJson(value) {
  return JSON.stringify(value);
}

export default {
  tasksListToJson: tasksListToJson,
  toTasksList: toTasksList,
};
