import React, { ReactElement } from 'react';
// import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/ban-types
type SampleComponentProps = {};

// eslint-disable-next-line no-empty-pattern
const SampleComponent = ({}: SampleComponentProps): ReactElement => {
  // const dispatch = useDispatch();

  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  return <>Sample Component Content</>;
};

export default SampleComponent;
