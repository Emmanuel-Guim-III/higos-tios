import _ from "lodash";
import React from "react";
import { Search } from "semantic-ui-react";
import tasksListData from "../models/local_data/tasksList.json";

const source = removeImportantProp(tasksListData);

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

function removeImportantProp(taskList) {
  const result = taskList.map((task) => {
    delete task.important;

    return task;
  });

  return result;
}

export default function SearchBar() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => {
        return (
          re.test(result.title) ||
          re.test(result.notes) ||
          re.test(result.created_at) ||
          re.test(result.started_at) ||
          re.test(result.finished_at)
        );
      };

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      loading={loading}
      placeholder="Search..."
      onResultSelect={(e, data) =>
        dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
      }
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
}
