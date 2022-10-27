import React from "react";
import { Dropdown, Grid } from "semantic-ui-react";

import "./App.scss";
import AddingModal from "./components/AddingModal";
import SearchBar from "./components/SearchBar";
import TasksListView from "./pages/TasksList";

function App() {
  const statusOptions = [
    { key: "important", text: "Important", value: "Important" },
    { key: "active", text: "Active", value: "Active" },
    { key: "started", text: "Started", value: "Started" },
    { key: "done", text: "Done", value: "Done" },
  ];

  return (
    <div className="app">
      <Grid>
        <Grid.Column width={8}>
          <SearchBar />
        </Grid.Column>

        <Grid.Column width={8} textAlign="right">
          <Dropdown
            button
            className="icon"
            labeled
            icon="filter"
            text="Filter"
            multiple
            options={statusOptions}
          />
        </Grid.Column>

        <Grid.Row>
          <TasksListView />
        </Grid.Row>
      </Grid>

      <AddingModal />
    </div>
  );
}

export default App;
