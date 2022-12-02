import React from "react";
import { Dropdown, Grid } from "semantic-ui-react";

import "./App.scss";
import AddingModal from "./components/AddingModal";
import SearchBar from "./components/SearchBar";
import TasksListView from "./pages/TasksList";
import tasksListData from "./models/local_data/tasksList.json";
import status from "./constants/status";

const statusOptions = [
  { key: status.IMPORTANT, text: status.IMPORTANT, value: status.IMPORTANT },
  { key: status.ACTIVE, text: status.ACTIVE, value: status.ACTIVE },
  { key: status.STARTED, text: status.STARTED, value: status.STARTED },
  { key: status.DONE, text: status.DONE, value: status.DONE },
];

export default function App() {
  const [tasksList, setTasksList] = React.useState([...tasksListData]);
  const dropdownState = React.useRef({
    selectedStatus: "",
    result: [...tasksListData],
  });
  const searchState = React.useRef({ query: "", result: [...tasksListData] });

  function filterListByStatus(statusValue) {
    let tasks = [...tasksListData];
    const { result } = searchState.current;

    if (result.length > 0) {
      tasks = result;
    }

    switch (statusValue) {
      case status.IMPORTANT:
        tasks = tasks.filter((task) => task.important);
        break;

      case status.ACTIVE:
        tasks = tasks.filter((task) => {
          return (
            task.created_at !== "" &&
            task.started_at === "" &&
            task.finished_at === ""
          );
        });
        break;

      case status.STARTED:
        tasks = tasks.filter((task) => {
          return (
            task.created_at !== "" &&
            task.started_at !== "" &&
            task.finished_at === ""
          );
        });
        break;

      case status.DONE:
        tasks = tasks.filter((task) => {
          return (
            task.created_at !== "" &&
            task.started_at !== "" &&
            task.finished_at !== ""
          );
        });
        break;

      default:
        tasks = [...tasksListData];
    }

    dropdownState.current.result = [...tasks];
    dropdownState.current.selectedStatus = statusValue;

    setTasksList([...tasks]);
  }

  function handleSearchChange(state) {
    const { query, result } = state;

    const filterByQuery = (list) => {
      if (query.length === 0) {
        return list;
      }

      if (result.length > 0) {
        return [...result];
      } else {
        return [];
      }
    };

    const searchStateResult = filterByQuery([...tasksListData]);
    searchState.current.query = query;
    searchState.current.result = [...searchStateResult];

    const tasksFilteredByStatus = dropdownState.current.result;
    const tasks = filterByQuery(tasksFilteredByStatus);

    setTasksList([...tasks]);
  }

  console.log(JSON.stringify(searchState.current.result, null, 2));

  return (
    <div className="app">
      <Grid>
        <Grid.Column width={8}>
          <SearchBar
            data={tasksListData}
            onSearchChange={(state) => handleSearchChange(state)}
          />
        </Grid.Column>

        <Grid.Column width={8} textAlign="right">
          <Dropdown
            className="icon"
            button
            labeled
            clearable
            icon="filter"
            placeholder="Filter"
            options={statusOptions}
            onChange={(e, data) => filterListByStatus(data.value)}
          />
        </Grid.Column>

        <Grid.Row>
          <TasksListView data={tasksList} />
        </Grid.Row>
      </Grid>

      <AddingModal />
    </div>
  );
}
