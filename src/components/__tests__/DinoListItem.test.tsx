/* eslint-disable react/react-in-jsx-scope */

import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import DinoListItem from '../DinoListItem';

// EXAMPLE: Mocking a function sent in as a prop
// eslint-disable-next-line @typescript-eslint/no-empty-function
const mockChangeCheckbox = jest.fn((/* id, checked */) => {});

describe('Loading icon tests', () => {
  afterEach(() => {
    mockChangeCheckbox.mockClear();
  });

  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <DinoListItem
        dinoName='tRex'
        dinoId='4'
        checked={false}
        changeCheckBox={mockChangeCheckbox}
      />
    ).container;
  });

  test('Is accessible', async () => {
    const results = await axe(`<main><ul>${container.innerHTML}</ul></main>`); // NOTE ul is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('When checkbox is clicked, changeCheckBox is called', () => {
    // EXAMPLE: Checking for a React Bootstrap element.
    // In the component it is listed as Form.Check
    // If you are unsure what an element is really called, then look at the snapshot
    expect(container).toMatchSnapshot();

    fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0]);

    expect(mockChangeCheckbox).toHaveBeenCalledTimes(1);
    expect((mockChangeCheckbox.mock.calls[0] as string[])[0]).toBe('4');
    expect((mockChangeCheckbox.mock.calls[0] as boolean[])[1]).toBe(true); // second attribute sent
  });

  // EXAMPLE: A todo/pending test
  test.todo('This a place holder to remind you to write a test later');
});
