const NeDB = require('nedb')

export class DbService<T> {

  db: any

  path = 'db.json'

  file = ''

  id = ''


  init(path:string) {
    this.file = path
    console.log(this.file)
    return new NeDB({
      autoload: true,
      filename: this.file,
    })
  }

  constructor() {
  }

  async read(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: this.id }, (err: any, doc: T) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
    })
  }

  async write(obj: T) {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: this.id }, { $set: obj }, { upsert: true }, (err: any, numAffected: number, affectedDocuments: T) => {
        if (err) {
          reject(err)
        }
        resolve(affectedDocuments)
      })
    })
  }

}


