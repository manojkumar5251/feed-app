import app from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.database()
    this.storage = app.storage()
  }

  pushToDB = (path, value) =>
    new Promise((reslove, reject) => {
      let { key } = this.db.ref(path).push()
      this.db
        .ref(path + key)
        .update(value)
        .then(res => reslove(key))
        .catch(err => reject(err))
    })

  uploadFile = file =>
    new Promise((reslove, reject) => {
      console.log(file.type)
      let path = `${file.type.slice(0, file.type.indexOf("/"))}/${file.name}`
      this.storage
        .ref(path)
        .put(file)
        .then(res =>
          res.ref
            .getDownloadURL()
            .then(url =>
              reslove({ type: file.type.slice(0, file.type.indexOf("/")), url })
            )
        )
        .catch(err => reject(err))
    })
}

export default Firebase
