import _ from "lodash";
import React from "react";
import { Search } from "semantic-ui-react";

const initialState = { loading: false, value: "" };

function reducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false };

    default:
      throw new Error();
  }
}

export default function SearchBar(props) {
  const [tasksList, setTasksList] = React.useState(props.data);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { loading, value } = state;
  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          props.onSearchChange({ query: "", result: [] });

          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result) => {
          return (
            re.test(result.id) ||
            re.test(result.title) ||
            re.test(result.notes) ||
            re.test(result.created_at) ||
            re.test(result.started_at) ||
            re.test(result.finished_at)
          );
        };

        const filteredTasks = _.filter(tasksList, isMatch);
        props.onSearchChange({ query: data.value, result: [...filteredTasks] });

        dispatch({
          type: "FINISH_SEARCH",
        });
      }, 300);
    },
    [tasksList]
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  React.useEffect(() => {
    setTasksList(props.data);
  }, [props.data]);

  return (
    <React.Fragment>
      <Search
        loading={loading}
        placeholder="Search..."
        onSearchChange={handleSearchChange}
        value={value}
        showNoResults={false}
      />
    </React.Fragment>
  );
}
