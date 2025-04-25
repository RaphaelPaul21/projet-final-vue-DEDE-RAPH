// src/composables/api.js
import { createFetch } from "ofetch";

// import.meta.env refers to environment variables that you set in your .env
// Beware, variables are not imported if they are not prefixed by VITE_
// Documentation: https://vite.dev/guide/env-and-mode

let _api

export function useApi() {
  if (_api) {
    // If the instance already exists, just return it. No need to create a new one.
    return _api
  }

  _api = createFetch({
    defaults: {
      // baseUrl: Allows you to omit the host when doing doing requests:
      // example: await $api("/rest/v3/short-urls")
      baseURL: import.meta.env.VITE_API_HOST,
      // This is an "interceptor". It executes this function everytime a request is fired.
      onRequest({ options }) {
        // Append to the request's options a new header "X-Api-Key", whose value is your API token
        // It is not really safe to set the API token as an environment variable, because everyone will be able to read it.
        // You should instead save it in the local storage, and read the local storage on each request
        options.headers.set('X-Api-Key', import.meta.env.VITE_API_KEY)
      },
      // Another interceptor, that is being called when receiving a response.
      onResponse({ response }) {
        // Here, you could check for http status code (for example 401 = unauthorized, and redirect to a login page)
      }
    }
  })

  return _api
}