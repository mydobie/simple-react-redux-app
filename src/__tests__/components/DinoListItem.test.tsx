/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */

// @ts-ignore
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import DinoListItem from '../../components/DinoListItem';

// EXAMPLE: Mocking a function sent in as a prop
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
});
