import React from "react";
import { Table } from "semantic-ui-react";
import CustomCheckbox from "../components/CustomCheckbox";
import ViewingModal from "../components/ViewingModal";

export default function TasksListView() {
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  return (
    <>
      <Table basic="very" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Ticket number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
            <Table.HeaderCell>Created at</Table.HeaderCell>
            <Table.HeaderCell>Started at</Table.HeaderCell>
            <Table.HeaderCell>Finished at</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <CustomCheckbox></CustomCheckbox>
            </Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}>
              0001
            </Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}>
              Add an Item form Quantity field - Change type from number to text.
            </Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}></Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}>
              22-Jul-2022
            </Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}>
              22-Jul-2022
            </Table.Cell>
            <Table.Cell onClick={() => setIsViewModalOpen(true)}>
              22-Jul-2022
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <ViewingModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </>
  );
}
