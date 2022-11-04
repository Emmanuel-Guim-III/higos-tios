import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

export default function ViewingModal(props) {
  const [task, setTask] = React.useState({ ...props.task });
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isFormChanged, setIsFormChanged] = React.useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [confirmModalField, setConfirmModalField] = React.useState("");

  React.useEffect(() => {
    setTask({ ...props.task });
  }, [props.task]);

  React.useEffect(() => {
    if (JSON.stringify(task) === JSON.stringify(props.task)) {
      setIsFormChanged(false);
    } else {
      setIsFormChanged(true);
    }
  }, [task, props.task]);

  function handleChange(event, field) {
    const value = event.target.value;
    const updatedTask = { ...task };

    updatedTask[field] = value;
    setTask((task) => ({
      ...task,
      ...updatedTask,
    }));
  }

  const editModalContentUI = (
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Input
            label="Ticket Numbersss"
            value={task.id}
            width={3}
            icon="lock"
            readOnly
          />
          <Form.Input
            label="Title"
            defaultValue={task.title}
            width={13}
            onChange={(event) => handleChange(event, "title")}
          />
        </Form.Group>
        <Form.TextArea
          label="Notes"
          defaultValue={task.notes}
          onChange={(event) => handleChange(event, "notes")}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Added at"
            value={task.created_at}
            icon="lock"
            readOnly
          />
          <Form.Input
            label="Started at"
            defaultValue={task.started_at}
            onChange={(event) => handleChange(event, "started_at")}
          />
          <Form.Input
            label="Finished at"
            defaultValue={task.finished_at}
            onChange={(event) => handleChange(event, "finished_at")}
          />
        </Form.Group>

        <Form.Checkbox
          label="Important"
          checked={task.important}
          onClick={() => console.log("clicked checkbox")}
        />
      </Form>
    </Modal.Content>
  );

  const editModalActionsUI = (
    <Modal.Actions>
      <Button content="Cancel" onClick={() => setIsEditMode(false)} />

      {isFormChanged ? (
        <Button
          content="Save"
          labelPosition="left"
          icon="save"
          onClick={() => props.onClose(false)}
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
        onClose={() => {
          props.onClose(false);
          setIsEditMode(false);
        }}
        open={props.isOpen}
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
                  value={props.task.id}
                  width={3}
                  readOnly
                />
                <Form.Input
                  label="Title"
                  defaultValue={props.task.title}
                  width={13}
                  readOnly
                />
              </Form.Group>

              <Form.TextArea
                label="Notes"
                defaultValue={props.task.notes}
                readOnly
              />

              <Form.Group widths="equal">
                <Form.Input
                  label="Added at"
                  value={props.task.created_at}
                  readOnly
                />
                <Form.Input
                  label="Started at"
                  defaultValue={props.task.started_at}
                  readOnly
                />
                <Form.Input
                  label="Finished at"
                  defaultValue={props.task.finished_at}
                  readOnly
                />
              </Form.Group>

              <Form.Checkbox
                label="Important"
                readOnly
                checked={props.task.important}
              />
            </Form>
          </Modal.Content>
        )}

        {isEditMode ? (
          editModalActionsUI
        ) : (
          <Modal.Actions>
            <Button content="Close" onClick={() => props.onClose(false)} />
            <Button
              content="Edit"
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
              onChange={(event) => {
                const value = event.target.value;
                setConfirmModalField(value);
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
            disabled={confirmModalField !== "Yes"}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}
