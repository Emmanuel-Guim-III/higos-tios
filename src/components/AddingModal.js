import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

export default function AddingModal() {
  const [isOpen, setIsOpen] = React.useState(false);

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
            <Form.Input label="Title" placeholder="Title" width={13} />
          </Form.Group>

          <Form.TextArea label="Notes" placeholder="Notes" />

          <Form.Checkbox label="Important" />
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button content="Cancel" onClick={() => setIsOpen(false)} />
        <Button
          content="Save"
          labelPosition="left"
          icon="save"
          onClick={() => setIsOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
