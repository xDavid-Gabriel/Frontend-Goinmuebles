// import useSWR, { SWRConfiguration } from "swr";

// // const fetcher = (...args: [key: string]) =>
// //   fetch(...args).then(res => res.json())

// export const useData = <T>(url: string, config: SWRConfiguration = {}) => {
//   const { data, error } = useSWR<T>(url, config);

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

import useSWR, { SWRConfiguration } from "swr";

const defaultFetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useData = <T>(url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<T>(url, {
    ...config,
    fetcher: config.fetcher || defaultFetcher,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
