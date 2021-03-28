import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const DinoListItem = (props) => {
  const { dinoName, dinoId, checked, changeCheckBox } = props;
  return (
    <li>
      {/* EXAMPLE: Checkbox with label */}
      <Form.Check
        onClick={(e) => {
          changeCheckBox(dinoId, e.target.checked);
        }}
        id={`cb_${dinoId}`}
        defaultChecked={checked}
        label={dinoName}
      />
    </li>
  );
};

DinoListItem.propTypes = {
  dinoName: PropTypes.string,
  dinoId: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  changeCheckBox: PropTypes.func,
};
DinoListItem.defaultProps = {
  dinoName: '',
  checked: false,
  changeCheckBox: () => {},
};

export default DinoListItem;
