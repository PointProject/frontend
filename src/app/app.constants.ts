export enum ServerStatus {
  UNAUTHORIZED = 500
}

export enum AuthenticationEvents {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export enum ObserveType {
  RESPONSE = 'response',
  BODY = 'body',
  EVENTS = 'events'
}

export enum ResponseType {
  TEXT = 'text',
  ARRAY_BUFFER = 'arraybuffer',
  BLOB = 'blob',
  JSON = 'json'
}

export const REQUEST_OPTIONS: any = {
  OBSERVE: {
    RESPONSE: {observe: ObserveType.RESPONSE},
    BODY: {observe: ObserveType.BODY},
    EVENTS: {observe: ObserveType.EVENTS}
  },
  RESPONSE_TYPE: {
    TEXT: {responseType: ResponseType.TEXT},
    ARRAY_BUFFER: {responseType: ResponseType.ARRAY_BUFFER},
    BLOB: {responseType: ResponseType.BLOB},
    JSON: {responseType: ResponseType.JSON}
  }
};
