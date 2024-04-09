import { ResourceReturn, createResource } from 'solid-js';

export default function useFetch<T>(method: string = 'GET', url: string, body: any = {}): ResourceReturn<T> {
  async function fetchResource(): Promise<T> {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify(body)
      });

      if(response) {
        const data = await response.json();
        return data as T;
      } else {
        throw new Error('Error: ' + response);
      }
    } catch(e) {
      throw new Error('Error: ' + e);
    }
  }

  const [data, {mutate, refetch}] = createResource(url, fetchResource);

  return [data, {mutate, refetch}];
}