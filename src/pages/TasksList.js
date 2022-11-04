import React from "react";
import { Table } from "semantic-ui-react";

import CustomCheckbox from "../components/CustomCheckbox";
import ViewingModal from "../components/ViewingModal";
import taskListData from "../logic/TasksControl";
import usePrevious from "../utils/usePrevious";

export default function TasksListView() {
  const [tasksList] = React.useState(taskListData);
  const [selectedTask, setSelectedTask] = React.useState({});
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  const prevSelectedTask = usePrevious({ ...selectedTask });

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
            // checkboxValue = null;

            return (
              <Table.Row key={task.id} warning={task.important}>
                <Table.Cell content={<CustomCheckbox value={""} />} />
                <Table.Cell
                  content={task.id}
                  onClick={() => {
                    console.log("🤢");
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
          })}
        </Table.Body>
      </Table>

      <ViewingModal
        task={{ ...selectedTask }}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </React.Fragment>
  );
}
