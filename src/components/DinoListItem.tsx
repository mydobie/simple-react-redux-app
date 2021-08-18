import React, { ReactElement } from 'react';
import { Form } from 'react-bootstrap';

const DinoListItem = ({
  dinoName,
  dinoId,
  checked,
  changeCheckBox,
}: {
  dinoName: string;
  dinoId: string;
  checked: boolean;
  changeCheckBox: (dinoId: string, isChecked: boolean) => void;
}): ReactElement => (
  <li>
    {/* EXAMPLE: Checkbox with label */}
    <Form.Check
      onClick={(e) => {
        changeCheckBox(dinoId, (e.target as HTMLInputElement).checked);
      }}
      id={`cb_${dinoId}`}
      defaultChecked={checked}
      label={dinoName}
    />
  </li>
);

export default DinoListItem;
