const db = require('../../public/javascripts/firebase')

const Tests = [
  { id: 1, userId_owner: "Tom", userId_recipient: "Coleman" },
  { id: 2, userId_owner: "Sashko", lastName: "Stubailo" }
]

const roomResolver = {
  Query: {
    rooms: async () => {
      const Rooms = [];
      let roomsSnapshot = await db.ref('Rooms').once('value')
      let roomsData = roomsSnapshot.val()
      let arrRoomId = Object.getOwnPropertyNames(roomsData)

      let arrRooms = await Promise.all(arrRoomId.map(async (roomId, index) => {
        let roomSnapshot = await db.ref('Rooms/' + roomId).once('value')
        let roomData = roomSnapshot.val()
        let roomKey = roomSnapshot.key
        roomData['key'] = roomKey
        if (roomData.Chats) {
          const Chats = []
          let arrChatId = Object.getOwnPropertyNames(roomData.Chats)          
          let arrChats = await Promise.all(arrChatId.map(async (chatId, index) => {
            let chatSnapshot = await db.ref(`Rooms/${roomId}/Chats/${chatId}`).once('value')
            let chatData = chatSnapshot.val()
            let chatKey = chatSnapshot.key
            chatData['key'] = chatKey
            Chats.push(chatData)
          }))
          roomData['chats'] = Chats
          Rooms.push(roomData)  

        } else {
          Rooms.push(roomData)
        }
      }))
      // console.log('==length==', Rooms)
      return Rooms
    },
    roomsByUser: async (_, { key }) => {
      const Rooms = [];
      let roomsSnapshot = await db.ref('Rooms').once('value')
      let roomsData = roomsSnapshot.val()
      let arrRoomId = Object.getOwnPropertyNames(roomsData)

      let arrRooms = await Promise.all(arrRoomId.map(async (roomId, index) => {
        let roomSnapshot = await db.ref('Rooms/' + roomId).once('value')
        let roomData = roomSnapshot.val()
        let roomKey = roomSnapshot.key
        roomData['key'] = roomKey
        if (roomData.userId_owner == key || roomData.userId_recipient == key) {
          if (roomData.Chats) {
            const Chats = []
            let arrChatId = Object.getOwnPropertyNames(roomData.Chats)          
            let arrChats = await Promise.all(arrChatId.map(async (chatId, index) => {
              let chatSnapshot = await db.ref(`Rooms/${roomId}/Chats/${chatId}`).once('value')
              let chatData = chatSnapshot.val()
              let chatKey = chatSnapshot.key
              chatData['key'] = chatKey
              Chats.push(chatData)
            }))
            roomData['chats'] = Chats
            Rooms.push(roomData)  
  
          } else {
            Rooms.push(roomData)
          }
        }
      }))
      // console.log('==length==', Rooms)
      return Rooms
    }
  },
  Mutation: {
    addRoom: async (_, { userId_owner, userId_recipient }) => {
      // console.log(userId_owner, userId_recipient)
      let newRoom = {
        userId_owner,
        userId_recipient,
        createdAt: String(new Date()),
        updatedAt: String(new Date())
      }
      let roomSnapshot = await db.ref('Rooms').push(newRoom)
      newRoom['key'] = roomSnapshot.key
      // console.log('check key add room', newRoom)
      return newRoom
    },
    addChat: async (_, { message, userId_sender, room_key }) => {
      // console.log(message, userId_sender, room_key)
      let roomSnapshot = await db.ref('Rooms/' + room_key).once('value')
      let roomData = roomSnapshot.val()
      let roomKey = roomSnapshot.key
      roomData['key'] = roomKey

      let newChat = {
        message,
        userId_sender,
        createdAt: String(new Date()),
        updatedAt: String(new Date())
      }

      if (roomData.Chats) {
        //update
        let roomSnapshot = await db.ref(`Rooms/${room_key}/Chats`).push(newChat)
      } else {
        //add
        let roomSnapshot = await db.ref(`Rooms/${room_key}`).child('Chats').push(newChat)
      }
      return newChat
    }
  }
}

module.exports = roomResolver