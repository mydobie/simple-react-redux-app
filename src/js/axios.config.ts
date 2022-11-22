import { Method } from 'axios';

/* ************ API CALLS ************* */
export const sampleAPI = {
  method: (): Method => 'get',
  url: (): string =>
    process.env.REACT_APP_USE_MOCKS === 'true'
      ? `/__fixtures__/SAMPLE_FIXTURE.json` // NOTE: `__fixtures__` is the  `/public/__fixtures__` directory.
      : `http://the_real_url_for_the_api.com`,
};

export const dinoAPI = {
  method: (): Method => 'get',
  url: (numberOfDinos = 5): string =>
    process.env.REACT_APP_USE_MOCKS === 'true'
      ? `/__fixtures__/dinoipsum.json?words=${numberOfDinos}` // NOTE: `__fixtures__` is the  `/public/__fixtures__` directory.
      : `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=${numberOfDinos}`,
};

export const universitiesAPI = {
  method: (): Method => 'get',
  url: (): string =>
    process.env.REACT_APP_USE_MOCKS === 'true'
      ? `/__fixtures__/universities.json`
      : `http://universities.hipolabs.com/search?name=minnesota&country=united+states`,
};

/* ***************** AJAX Finally Helper ***************/
// When set in "mock mode" the application will pause simulating a real ajax call

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

/* ***************** AJAX Finally Helper ***************/
// When set in "mock mode" the application will pause simulating a real ajax call

export const ajaxFinally = async (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  func = () => {},
  timeout = 3000,
  envVariable = 'REACT_APP_USE_MOCKS'
): Promise<void> => {
  if (process.env[envVariable] === 'true') {
    // eslint-disable-next-line no-console
    console.info(
      'Artificially waiting to implement the results of an ajax call. Note: This may cause a "Warning: Can\'t perform a React state update on an unmounted component." error if you navigate too quickly. '
    );
    await sleep(timeout);
  }

  func();
};
