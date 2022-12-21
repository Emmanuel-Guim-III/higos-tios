import _ from "lodash";
import React from "react";
import { Button, Modal, Form, Grid, Popup } from "semantic-ui-react";
import Status from "../constants/status";

const Field = {
  TITLE: "title",
  NOTES: "notes",
  STARTED_AT: "started_at",
  FINISHED_AT: "finished_at",
  IMPORTANT: "important",
};

export default function ViewingModal(props) {
  const [task, setTask] = React.useState(props.task);
  const [confirmDeleteField, setConfirmDeleteField] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isFormChanged, setIsFormChanged] = React.useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

  function _handleChange(field, value) {
    setTask({ ...task, [field]: value });
  }

  function _resetTime(status) {
    status === Status.STARTED
      ? setTask({ ...task, started_at: "", status: Status.ACTIVE })
      : setTask({ ...task, finished_at: "", status: Status.STARTED });
  }

  React.useEffect(() => {
    setIsEditMode(false);

    setTask(props.task);
  }, [props.task]);

  React.useEffect(() => {
    if (JSON.stringify(task) === JSON.stringify(props.task)) {
      setIsFormChanged(false);
    } else {
      setIsFormChanged(true);
    }
  }, [task]);

  const editModalContentUI = (
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Input
            label="Ticket Number"
            defaultValue={task.id}
            width={3}
            icon="lock"
            readOnly
          />
          <Form.Input
            label="Title"
            defaultValue={task.title}
            width={13}
            onChange={(e) => _handleChange(Field.TITLE, e.target.value)}
          />
        </Form.Group>
        <Form.TextArea
          label="Notes"
          defaultValue={task.notes}
          onChange={(e) => _handleChange(Field.NOTES, e.target.value)}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Added at"
            defaultValue={task.created_at}
            icon="lock"
            readOnly
          />
          <Form.Input
            label="Started at"
            value={task.started_at}
            onChange={(e) => _handleChange(Field.STARTED_AT, e.target.value)}
            readOnly
          />
          <Form.Input
            label="Finished at"
            value={task.finished_at}
            onChange={(e) => _handleChange(Field.FINISHED_AT, e.target.value)}
            readOnly
          />
        </Form.Group>

        <Form.Checkbox
          label="Important"
          checked={task.important}
          onClick={() => _handleChange(Field.IMPORTANT, !task.important)}
        />
        {task.status !== Status.ACTIVE ? (
          <Grid>
            <Grid.Column textAlign="center">
              <Popup
                content={
                  task.status === Status.STARTED
                    ? 'Reset "Started at" field'
                    : 'Reset "Finished at" field'
                }
                trigger={
                  <Button
                    content={
                      task.status === Status.STARTED
                        ? "Started at"
                        : "Finished at"
                    }
                    icon="undo"
                    basic
                    color="red"
                    onClick={() => _resetTime(task.status)}
                  />
                }
                basic
                size="mini"
              />
            </Grid.Column>
          </Grid>
        ) : (
          <></>
        )}
      </Form>
    </Modal.Content>
  );

  const editModalActionsUI = (
    <Modal.Actions>
      <Button
        content="Back to View"
        icon="eye"
        labelPosition="left"
        onClick={() => setIsEditMode(false)}
      />

      {isFormChanged ? (
        <Button
          content="Save"
          labelPosition="left"
          icon="save"
          onClick={() => {
            props.onTaskUpdate(task);
            props.onClose();
          }}
          positive
        />
      ) : (
        <Button
          content="Delete"
          labelPosition="left"
          icon="trash"
          onClick={() => setIsConfirmModalOpen(true)}
          negative
        />
      )}
    </Modal.Actions>
  );

  return (
    <React.Fragment>
      <Modal
        size="small"
        style={{ color: "red" }}
        onClose={() => {
          props.onClose();
        }}
        open={!_.isEmpty(task)}
      >
        <Modal.Header>{isEditMode ? "Edit " : ""}Task</Modal.Header>

        {isEditMode ? (
          editModalContentUI
        ) : (
          <Modal.Content>
            <Form>
              <Form.Group>
                <Form.Input
                  label="Ticket Number"
                  defaultValue={task.id}
                  width={3}
                  readOnly
                />
                <Form.Input
                  label="Title"
                  defaultValue={task.title}
                  width={13}
                  readOnly
                />
              </Form.Group>

              <Form.TextArea label="Notes" defaultValue={task.notes} readOnly />

              <Form.Group widths="equal">
                <Form.Input
                  label="Added at"
                  defaultValue={task.created_at}
                  readOnly
                />
                <Form.Input
                  label="Started at"
                  value={task.started_at}
                  readOnly
                />
                <Form.Input
                  label="Finished at"
                  value={task.finished_at}
                  readOnly
                />
              </Form.Group>

              <Form.Checkbox
                label="Important"
                readOnly
                checked={task.important}
              />
            </Form>
          </Modal.Content>
        )}

        {isEditMode ? (
          editModalActionsUI
        ) : (
          <Modal.Actions>
            <Button content="Close" onClick={() => props.onClose()} />
            <Button
              content="Edit Task"
              labelPosition="left"
              icon="edit"
              onClick={() => setIsEditMode(true)}
              primary
            />
          </Modal.Actions>
        )}
      </Modal>

      <Modal
        size="tiny"
        open={isConfirmModalOpen}
        // onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Delete Task</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Are you sure you want to delete task 0001?"
              placeholder="Type 'Yes'"
              onChange={(e) => {
                setConfirmDeleteField(e.target.value);
              }}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={() => setIsConfirmModalOpen(false)}
          />
          <Button
            content="Delete"
            negative
            disabled={confirmDeleteField !== "Yes"}
            onClick={() => {
              props.onTaskDelete(task.id);
              setIsConfirmModalOpen(false);
              props.onClose();
            }}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}
