import React from "react";
import { Container, Dropdown, Grid } from "semantic-ui-react";
import { TasksContext } from "../store/TasksStore";

import "../App.scss";
import AddingModal from "../components/AddingModal";
import SearchBar from "../components/SearchBar";
import TasksListTable from "../components/TasksListTable";
import Status from "../constants/status";

const statusOptions = [
  { key: 0, text: Status.IMPORTANT, value: Status.IMPORTANT },
  { key: 1, text: Status.ACTIVE, value: Status.ACTIVE },
  { key: 2, text: Status.STARTED, value: Status.STARTED },
  { key: 3, text: Status.DONE, value: Status.DONE },
];

export default function TasksList() {
  const [tasksStore] = React.useContext(TasksContext);
  const [tasksList, setTasksList] = React.useState([...tasksStore]);

  const searchState = React.useRef({ query: "", result: [...tasksList] });

  const dropdownState = React.useRef({
    selectedStatus: "",
    result: [...tasksList],
  });

  function filterListByStatus(statusValue) {
    let tasks = [...tasksStore];
    const { result } = searchState.current;

    if (statusValue === "") {
      tasks = result.length > 0 ? [...tasksList] : [...tasksStore];
    }
    //
    else if (statusValue === Status.IMPORTANT) {
      tasks = tasks.filter((task) => task.important);
    }
    //
    else {
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

    const searchStateResult = filterByQuery([...tasksList]);
    searchState.current.query = query;
    searchState.current.result = [...searchStateResult];

    const tasksFilteredByStatus = dropdownState.current.result;
    const tasks = filterByQuery(tasksFilteredByStatus);

    setTasksList([...tasks]);
  }

  return (
    <Container className="tasks-list">
      <Grid>
        <Grid.Column width={8}>
          <SearchBar
            data={tasksStore}
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
          <TasksListTable data={tasksList} />
        </Grid.Row>
      </Grid>

      <AddingModal />
    </Container>
  );
}
