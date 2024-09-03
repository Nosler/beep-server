# Messages

## Message Types

- `MessageTypes`: string enum of all message types.
  ```ts
  type MessageTypes = 'NEWID' | 'MATCH' | 'REQUEST' | 'CLICK';
  ```
- `Message`: Base message model.
  ```ts
  interface Message {
    type: MessageType;
  }
  ```
- `NewIdMessage`: For requesting a new id from the server.
  ```ts
  interface NewIdMessage extends Message {
    type: 'NEWID';
  }
  ```
- `LoginMessage`: For authorizing a token.
  ```ts
  interface LoginMessage extends Message {
    type: 'NEWID';
    token: string;
  }
  ```
- `IdMessage`: Assignment of token and id to client.
  ```ts
  interface IdMessage extends Message {
    type: 'NEWID';
    token: string;
    id: string;
  }
  ```
- `RequestMessage`: For requesting a connection from a listener, as a sender.
  ```ts
  interface RequestMessage extends Message {
    type: 'REQUEST';
    peerId: string;
  }
  ```
- `MatchMessage`: Confirms current pending connection. Also used to update sending peers on button change.
  ```ts
  interface MatchMessage extends Message {
    type: 'MATCH';
    peerId: string;
    buttons: string[];
  }
  ```
  - `ClickMessage`: "Clicks" a button for the peer.
  ```ts
  interface ClickMessage extends Message {
    type: 'MATCH';
    peerId: string;
    buttonIndex: number;
  }
  ```

# Timeline

Given users `S` (sender), `L` (listener) and the webserver (`W`). `L` has `L.buttons`, a list of button labels. Assume 'S' has an existing, valid token, and 'L' does not.

1. `S` and `L` independently connect to `W`.
   1. Both users log in.
      - `S` sends `LoginMessage` to `W`, recieves `IDMessage` with `S.id`.
      - `L` sends `NewIdMessage` to `W`, recieves `IDMessage` with `L.id`.
      - Both store their tokens in their configuration file.
   2. `S` and `L` independently communicate their respective IDs.
   - `S` now has `S.id` and `L` has `L.id`
2. `S` sends `RequestMessage` to `W`, with `peerId: L.id`.
   1. `W` adds `S` to `L.pendingQueue`
   2. When it is `S`'s turn:
      1. `w` removes `S` from `L.pendingQueue`
      2. `W` sets `L.pending` to `S.id`.
      3. Sends `RequestMessage` with `peerId: S.id` to `L`.
3. `L` receives `RequestMessage`.
   1. If `L` rejects: // TODO: deny message
4. If `L` accepts, answers with a `MatchMessage` with `buttons: L.buttons` and `peerId: S.id`.
   1. `W` receives `MatchMessage`
