import gql from 'graphql-tag'

export const USER_LOGIN = gql `
  mutation userLogin($email: String, $password: String) {
    userLogin(email:$email, password:$password) {
      username
      email
      password
      first_name
      last_name
      key
    }
  }
`

export const ADD_USER = gql `
  mutation addUSER($username:String, $email:String, $password:String, $first_name:String, $last_name:String) {
    addUser(username:$username, email:$email, password:$password, first_name:$first_name, last_name:$last_name) {
      email
      username
      last_name
      first_name
      key
    }
  }
`

export const ROOMS_BY_USER = gql `
query roomsByUser($key: String) {
  roomsByUser(key:$key) {
    userId_owner
    userId_recipient
    createdAt
    updatedAt
    key
    chats {
      message
      userId_sender
      createdAt
      updatedAt
      key
    }
  }
}
`

export const GET_USER = gql `
query user($key: String) {
  user(key:$key) {
    email
    username
    first_name
    last_name
    key
  }
}
`

export const ADD_CHAT = gql `
mutation addChat($message:String, $userId_sender:String, $room_key:String) {
  addChat(message:$message, userId_sender:$userId_sender, room_key:$room_key) {
    message
    userId_sender
  }
}
`

export const GET_USERS = gql `
query users {
  users {
    email
    username
    first_name
    last_name
    key
  }
}
`

export const ADD_ROOM = gql `
mutation addRoom($userId_owner:String, $userId_recipient:String) {
  addRoom(userId_owner:$userId_owner, userId_recipient:$userId_recipient) {
    userId_owner
    userId_recipient
    key
  }
}
`


