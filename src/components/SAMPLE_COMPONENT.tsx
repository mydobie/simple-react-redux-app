import React, { ReactElement } from 'react';
import {} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// *** Import selectors ***

// *** Import reducers ***

// *** Import components ***

// *** Main component ***

//** Main component prop type */
// eslint-disable-next-line @typescript-eslint/ban-types
type SampleComponentType = {};

// *** Main component ***
// eslint-disable-next-line no-empty-pattern
const SampleComponent = ({}: SampleComponentType): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const dispatch = useDispatch();

  // *** Selectors ***
  // const items: SampleItemType[] = useGetItems();

  // *** State (useState) ***
  //  const [myMessage, setMyMessage] = React.useState('');

  // *** On component load ***
  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  return (
    <div data-testid='componentContent'>
      {/* Component content */}

      {/* End component content */}
    </div>
  );
};

export default SampleComponent;
