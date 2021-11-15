import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// EXAMPLE: Custom hook
export const useGetVersion = (
  getVersionsConfig: AxiosRequestConfig | null = null
): { [key: string]: string } => {
  const [version, setVersion] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    const getVersions = async () => {
      try {
        const axiosConfig = getVersionsConfig || {
          url: '/versions.json',
          method: 'get',
        };
        axiosConfig.cancelToken = source.token;

        const response: AxiosResponse<{ [key: string]: string }> = await axios(
          axiosConfig
        );

        if (response.data) {
          setVersion(response.data);
        } else {
          throw Error('Uncaught Error');
        }
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.error('Error finding versions file');
      }
    };
    getVersions();

    return function cleanup() {
      source.cancel('Operation canceled by the user.');
    };
  }, [getVersionsConfig]);

  return version;
};
