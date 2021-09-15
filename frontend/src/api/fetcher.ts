import { Method } from '@/constants/common'

interface RequestInterface<T> {
  url: string,
  method: string,
  body?: T,
  headers?: Headers
}

const baseUrl = 'http://localhost:8081'

const Fetcher = <T>({
  url,
  method = Method.GET,
  body,
  headers = new Headers({
    'Content-Type': 'application/json'
  })
}: RequestInterface<T>): Promise<T> => {
  const bodyStringify = JSON.stringify(body)
  return fetch(
    `${baseUrl}/${url}`,
    {
      method,
      body: bodyStringify,
      headers
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return response.json() as Promise<T>
    })
}

export {
  Fetcher
}
