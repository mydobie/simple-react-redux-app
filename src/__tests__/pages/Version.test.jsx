/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fs from 'fs';

import Version from '../../pages/Version';

const mockStore = configureStore([thunk]);

describe('Version tests', () => {
  let wrapper = '';
  let store = '';

  beforeAll(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <Version />
      </Provider>
    );

    wrapper.update();
  });
  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData);
    const { version, name } = packageJson;
    expect(wrapper.find('#appNameFromPackageJson').text()).toEqual(name);
    expect(wrapper.find('#appVersionFromPackageJson').text()).toEqual(version);
    expect(wrapper.find('#gitCommitHash').text()).toEqual('foo');
  });

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    expect(wrapper).toMatchSnapshot();
  });
  */
});
