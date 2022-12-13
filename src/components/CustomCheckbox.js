import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";

import Status from "../constants/status";

const statusOptions = [
  { key: 0, text: Status.ACTIVE, icon: "square outline" },
  {
    key: 1,
    text: Status.STARTED,
    icon: "caret square right outline",
  },
  { key: 2, text: Status.DONE, icon: "check square outline" },
];

export default function CustomCheckbox(props) {
  const initialStatus = statusOptions.find(
    (optn) => optn.text === props.initValue
  );

  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  function _updateStatus(currentStatusKey) {
    if (currentStatusKey < 2) {
      const nextStatusKey = currentStatusKey + 1;

      setCurrentStatus(statusOptions[nextStatusKey]);
    }
  }

  return (
    <div onClick={() => _updateStatus(currentStatus.key)}>
      <Popup
        content={currentStatus.text}
        trigger={<Icon name={currentStatus.icon} size="large" />}
        basic
        size="mini"
      />
    </div>
  );
}
