import React from "react";
import { Dropdown, Grid } from "semantic-ui-react";

import "./App.scss";
import AddingModal from "./components/AddingModal";
import SearchBar from "./components/SearchBar";
import TasksListView from "./pages/TasksList";
import Status from "./constants/status";
import getTasks from "./store/TasksStore";

const statusOptions = [
  { key: 0, text: Status.IMPORTANT, value: Status.IMPORTANT },
  { key: 1, text: Status.ACTIVE, value: Status.ACTIVE },
  { key: 2, text: Status.STARTED, value: Status.STARTED },
  { key: 3, text: Status.DONE, value: Status.DONE },
];

export default function App() {
  const tasksListData = getTasks();

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

    // console.log(statusValue);

    if (statusValue === "") {
      tasks = [...tasksListData];
    } else if (statusValue === Status.IMPORTANT) {
      tasks = tasks.filter((task) => task.important);
    } else if (statusValue !== Status.IMPORTANT) {
      tasks = tasks.filter((task) => task.status === statusValue);
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

  // console.log(JSON.stringify(searchState.current.result, null, 2));

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
