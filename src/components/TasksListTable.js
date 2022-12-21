import React from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";

import CustomCheckbox from "./CustomCheckbox";
import ViewingModal from "./ViewingModal";
import Status from "../constants/status";
import { dateTimeNow } from "../utils/dateAndTime";

export default function TasksListTable(props) {
  const [selectedTask, setSelectedTask] = React.useState({});
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

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

  function _handleStatusReset(task) {
    const { id, status } = task;

    const updatedList = (currentList) =>
      currentList.map((tsk) => {
        if (tsk.id === id) {
          const newTask =
            status === Status.STARTED
              ? { ...tsk, status: Status.ACTIVE, started_at: "" }
              : { ...tsk, status: Status.STARTED, finished_at: "" };

          setSelectedTask({ ...newTask });
          return newTask;
        }

        return tsk;
      });

    props.setTasks(updatedList);
  }

  React.useEffect(() => {
    if (!_.isEmpty(selectedTask)) {
      setIsViewModalOpen(true);
    }
  }, [selectedTask]);

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
          {props.tasks.map((task) => {
            // TODO: Room for enhancement.
            if (task.id && task.status) {
              return (
                <Table.Row key={task.id} warning={task.important}>
                  <Table.Cell
                    content={
                      <CustomCheckbox
                        status={task.status}
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
        task={selectedTask}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onTaskUpdate={_handleTaskUpdate}
        onTaskDelete={_handleTaskDelete}
        onStatusReset={_handleStatusReset}
      />
    </React.Fragment>
  );
}
