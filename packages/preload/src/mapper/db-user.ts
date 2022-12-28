import { DbService } from '@/mapper/index'
import dayjs from 'dayjs'

interface UserData{
  sessionId: string
  crumb: string
  timeout: number
  datetime?: string
}

class UserDataService extends DbService<UserData> {
  path = 'db-user.db'
  id = 'userData'

  constructor() {
    super()
    this.db = this.init(this.path)
  }

  async getData() {
    const data = await this.read()
    const timeout = data.timeout || 1
    if (timeout < new Date().getTime()) {
      console.log('数据过期')
      return null
    }
    return data
  }

  async writeData(data: UserData) {
    data.timeout = new Date().getTime() + 1000 * 60 * 10
    data.datetime = dayjs(data.timeout).format('YYYY-MM-DD HH:mm:ss')
    await this.write(data)
  }

}

export const userDataService = new UserDataService()
