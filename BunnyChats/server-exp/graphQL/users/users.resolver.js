const db = require('../../public/javascripts/firebase')

const Tests = [
  { id: 1, first_name: "Tom", lastName: "Coleman" },
  { id: 2, firstName: "Sashko", lastName: "Stubailo" }
]

const userResolver = {
  Query: {
    // users: () => {
    //   const Users = [];
    //   db.ref('Users').on('value', function(snapshot) {
    //     let data = snapshot.val();
    //     let arrDataId = Object.getOwnPropertyNames(data)
        
    //     arrDataId.map((dataId, index) => {
    //       db.ref('Users/' + dataId).on('value', function(snapshot1) {
    //         let eachData = snapshot1.val()
    //         let eachDataKey = snapshot1.key
    //         eachData['key'] = eachDataKey
    //         Users.push(eachData)
    //       })
    //     })
    //     console.log('==>', Users)
    //     return Users
    //   })
    // },
    users: async () => {
      try {
        const Users = [];
        let usersSnapshot = await db.ref('Users').once('value')
        let usersData = usersSnapshot.val()
        let arrDataId = Object.getOwnPropertyNames(usersData)
  
        let arrUsers = await Promise.all(arrDataId.map(async (dataId, index) => {
          let userSnapshot = await db.ref('Users/' + dataId).once('value')
          let userData = userSnapshot.val()
          let userKey = userSnapshot.key
          userData['key'] = userKey
          Users.push(userData)
        }))
        // console.log('==>', Users)
        return Users
      } catch {
      }
    },
    user: async (_, { key }) => {
      try{
        let User = {};
        let userSnapshot = await db.ref('Users/' + key).once('value')
        let userData = userSnapshot.val()
        let userKey = userSnapshot.key
        userData['key'] = userKey
        User = userData
        return User
      } catch {
      }
    },
  },
  Mutation: {
    addUser: async(_, { username, email, password, first_name, last_name }) => {
      try {
        // console.log(username, email, password, first_name, last_name)
        let User = {
          username, email, password, first_name, last_name
        }
        let userSnapshot = await db.ref('Users').push(User)
        User['key'] = userSnapshot.key
        // console.log('oi', userSnapshot)
        return User
      } catch {
      }
    },
    userLogin: async (_, { email, password }) => {
      try {
        // console.log(email, password)
        let User = {};
        let status = false;
        let usersSnapshot = await db.ref('Users').once('value')
        let usersData = usersSnapshot.val()
        let arrDataId = Object.getOwnPropertyNames(usersData)
  
        let arrUsers = await Promise.all(arrDataId.map(async (dataId, index) => {
          let userSnapshot = await db.ref('Users/' + dataId).once('value')
          let userData = userSnapshot.val()
          let userKey = userSnapshot.key
          userData['key'] = userKey
          
          if (userData.email == email && userData.password == password) {
            User = userData
            status = true
          }
        }))
        // console.log('==>', User)  
        return User
      } catch(error) {
        console.log(error)
      }
    }
  }


}

module.exports = userResolver