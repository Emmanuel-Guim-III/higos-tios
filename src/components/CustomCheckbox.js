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

  const [status, setStatus] = useState(initialStatus);

  function _updateStatus(statusKey) {
    if (statusKey < 2) {
      setStatus(statusOptions[statusKey + 1]);
      props.onClick(statusOptions[statusKey + 1].text);
    }
  }

  return (
    <div onClick={() => _updateStatus(status.key)}>
      <Popup
        content={status.text}
        trigger={<Icon name={status.icon} size="large" />}
        basic
        size="mini"
      />
    </div>
  );
}
