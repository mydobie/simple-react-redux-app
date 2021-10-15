import React, { ReactElement } from 'react';
import { Form } from 'react-bootstrap';

const DinoListItem = ({
  dinoName,
  dinoId,
  checked,
  changeCheckBox,
  testid,
}: {
  dinoName: string;
  dinoId: string;
  checked: boolean;
  // EXAMPLE: Passing a function as a prop (so data bubbles to parent)
  changeCheckBox: (dinoId: string, isChecked: boolean) => void;
  testid?: string;
}): ReactElement => (
  <li data-testid={testid}>
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
