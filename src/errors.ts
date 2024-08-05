import Logger from 'js-logger';

function errorMessage(prefix: string, message?: string) {
  let out = prefix;
  if (message) {
    out += ': ' + message;
  }
  return out;
}

export class BeepError extends Error {
  public code: number;
  constructor(message: string, code: number, baseError?: string, log: boolean = true) {
    let errMsg = message;
    if (baseError) {
      errMsg = errorMessage(baseError, message);
    }
    super(errMsg || 'Unknown error.');
    this.code = code || 0;
    if (log) {
      Logger.info(errMsg);
    }
  }
}

export class UserNotFoundError extends BeepError {
  constructor(id: string) {
    super(id, 1, 'UserNotFound');
  }
}

export class InvalidDataError extends BeepError {
  constructor(message?: string) {
    super(message || 'you did something weird', 2, 'InvalidData');
  }
}

export class InvalidTokenError extends BeepError {
  constructor(message?: string) {
    super(message || 'Invalid token.', 3, 'InvalidToken');
  }
}

export class PeerDisconnectedError extends BeepError {
  constructor(id: string) {
    super(id, 4, 'PeerDisconnected');
  }
}

export class NotConnectedError extends BeepError {
  constructor() {
    super("you're not logged in", 5, 'NotConnected');
  }
}

export class EnvironmentError extends BeepError {
  constructor(message: string) {
    super('oops our bad', 6, 'EnvironmentError', false);
    Logger.error('EnvironmentError', message);
  }
}
