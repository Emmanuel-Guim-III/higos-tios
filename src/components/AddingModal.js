import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

export default function AddingModal(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isImportant, setIsImportant] = React.useState(false);

  function _handleSubmitForm() {
    const form = { title, notes, isImportant };

    props.onSubmit(form);
    setIsOpen(false);
  }

  return (
    <Modal
      size="small"
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      trigger={
        <Button
          className="button button--position-br"
          icon="add"
          content="Add New Task"
          circular
        />
      }
    >
      <Modal.Header>New Task</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              label="Ticket Number"
              placeholder="0001"
              width={3}
              icon="lock"
              readOnly
            />
            <Form.Input
              label="Title"
              placeholder="Title"
              width={13}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.TextArea
            label="Notes"
            placeholder="Notes"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />

          <Form.Checkbox
            label="Important"
            onChange={(e, data) => setIsImportant(data.checked)}
          />
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button content="Cancel" onClick={() => setIsOpen(false)} />
        <Button
          content="Save"
          labelPosition="left"
          icon="save"
          onClick={() => _handleSubmitForm()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
