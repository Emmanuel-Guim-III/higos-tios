import React from "react";
import { Grid, Search } from "semantic-ui-react";

export default function SearchBar() {
  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          //   loading={loading}
          loading={false}
          placeholder="Search"
          //   onResultSelect={
          //     (e, data) =>
          //     dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
          //   }
          //   onSearchChange={handleSearchChange}
          //   results={results}
          //   value={value}
          value={""}
        />
      </Grid.Column>
    </Grid>
  );
}
