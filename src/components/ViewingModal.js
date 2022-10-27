import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

export default function ViewingModal(props) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isFormChanged] = React.useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);

  const editModalContentUI = (
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
        <Form.Group widths="equal">
          <Form.Input
            label="Added at"
            placeholder="Oct 25, 2022"
            icon="lock"
            readOnly
          />
          <Form.Input label="Started at" placeholder="Started at" />
          <Form.Input label="Finished at" placeholder="Finished at" />
        </Form.Group>

        <Form.Checkbox label="Important" />
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
          onClick={() => setIsConfirmDeleteOpen(true)}
          negative
        />
      )}
    </Modal.Actions>
  );

  return (
    <>
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
                  placeholder="0001"
                  width={3}
                  readOnly
                />
                <Form.Input
                  label="Title"
                  placeholder="Title"
                  width={13}
                  readOnly
                />
              </Form.Group>

              <Form.TextArea label="Notes" placeholder="Notes" readOnly />

              <Form.Group widths="equal">
                <Form.Input
                  label="Added at"
                  placeholder="Oct 25, 2022"
                  readOnly
                />
                <Form.Input
                  label="Started at"
                  placeholder="Started at"
                  readOnly
                />
                <Form.Input
                  label="Finished at"
                  placeholder="Finished at"
                  readOnly
                />
              </Form.Group>

              <Form.Checkbox label="Important" readOnly />
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
        open={isConfirmDeleteOpen}
        // onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Delete Task</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Are you sure you want to delete task 0001?"
              placeholder="Type 'Yes'"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={() => setIsConfirmDeleteOpen(false)}
          />
          <Button content="Delete" negative disabled />
        </Modal.Actions>
      </Modal>
    </>
  );
}
