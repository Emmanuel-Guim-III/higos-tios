import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";

export default function CustomCheckbox() {
  const [checkboxOptions, setCheckboxOptions] = useState([
    { status: "Todo", icon: "square outline", isSelected: true },
    {
      status: "Started",
      icon: "caret square right outline",
      isSelected: false,
    },
    { status: "Done", icon: "check square outline", isSelected: false },
  ]);

  function _updateStatus(currentStatus) {
    const currentStatusIdx = checkboxOptions.findIndex(
      (checkbox) => checkbox.status === currentStatus
    );

    const updatedStatusIdx = (currentStatusIdx + 1) % 3;

    const clearedCheckbox = checkboxOptions.map((checkbox) => {
      return { ...checkbox, isSelected: false };
    });

    clearedCheckbox[updatedStatusIdx].isSelected = true;

    setCheckboxOptions(clearedCheckbox);
  }

  const checkbox = checkboxOptions.filter((cb) => cb.isSelected)[0];

  return (
    <div
      className="custom-checkbox"
      onClick={() => _updateStatus(checkbox.status)}
    >
      <Popup
        content={checkbox.status}
        trigger={<Icon name={checkbox.icon} size="large" />}
        basic
        size="mini"
      />
    </div>
  );
}
