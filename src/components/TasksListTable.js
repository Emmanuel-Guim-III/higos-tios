import React from "react";
import { Table } from "semantic-ui-react";

import CustomCheckbox from "./CustomCheckbox";
import ViewingModal from "./ViewingModal";
import usePrevious from "../utils/usePrevious";
import Status from "../constants/status";
import { dateTimeNow } from "../utils/dateAndTime";

export default function TasksListTable(props) {
  const [tasksList, setTasksList] = React.useState([...props.tasks]);
  const [selectedTask, setSelectedTask] = React.useState({});
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  const prevSelectedTask = usePrevious(selectedTask);

  function _handleTaskStatusUpdate(taskId, status) {
    const updatedList = (currentList) =>
      currentList.map((tsk) => {
        if (tsk.id === taskId) {
          const newTask =
            status === Status.STARTED
              ? { ...tsk, status: status, started_at: dateTimeNow() }
              : { ...tsk, status: status, finished_at: dateTimeNow() };

          return newTask;
        }

        return tsk;
      });

    props.setTasks(updatedList);
  }

  function _handleTaskUpdate(task) {
    const updatedList = (currentList) =>
      currentList.map((tsk) => {
        if (tsk.id === task.id) {
          return { ...task };
        }

        return tsk;
      });

    props.setTasks(updatedList);
  }

  function _handleTaskDelete(taskId) {
    const updatedList = (currentList) =>
      currentList.filter((tsk) => {
        return tsk.id !== taskId;
      });

    props.setTasks(updatedList);
  }

  React.useEffect(() => {
    setTasksList([...props.tasks]);
  }, [props.tasks]);

  React.useEffect(() => {
    if (prevSelectedTask && selectedTask !== prevSelectedTask) {
      setIsViewModalOpen(true);
    }
  }, [selectedTask, prevSelectedTask]);

  return (
    <React.Fragment>
      <Table basic="very" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell content="" />
            <Table.HeaderCell content="Ticket number" />
            <Table.HeaderCell content="Title" />
            <Table.HeaderCell content="Notes" />
            <Table.HeaderCell content="Created at" />
            <Table.HeaderCell content="Started at" />
            <Table.HeaderCell content="Finished at" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasksList.map((task) => {
            // TODO: Room for enhancement.
            if (task.id && task.status) {
              return (
                <Table.Row key={task.id} warning={task.important}>
                  <Table.Cell
                    content={
                      <CustomCheckbox
                        initValue={task.status}
                        onClick={(status) => {
                          _handleTaskStatusUpdate(task.id, status);
                        }}
                      />
                    }
                  />
                  <Table.Cell
                    content={task.id}
                    onClick={() => {
                      setSelectedTask({ ...task });
                    }}
                  />
                  <Table.Cell
                    content={task.title}
                    onClick={() => setSelectedTask({ ...task })}
                  />
                  <Table.Cell
                    content={task.notes}
                    onClick={() => setSelectedTask({ ...task })}
                  />
                  <Table.Cell
                    content={task.created_at}
                    onClick={() => setSelectedTask({ ...task })}
                  />
                  <Table.Cell
                    content={task.started_at}
                    onClick={() => setSelectedTask({ ...task })}
                  />
                  <Table.Cell
                    content={task.finished_at}
                    onClick={() => setSelectedTask({ ...task })}
                  />
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>

      <ViewingModal
        task={{ ...selectedTask }}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onTaskUpdate={_handleTaskUpdate}
        onTaskDelete={_handleTaskDelete}
      />
    </React.Fragment>
  );
}
