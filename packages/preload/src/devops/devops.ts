import { request, Resp } from '@/ahttp'
import { userDataService } from '@/mapper/db-user'

export class Devops {
  sessionId:string
  crumb:string
  private jobSeq:string|undefined

  constructor() {
    this.sessionId = ''
    this.crumb = ''
    this.jobSeq = ''
  }

  async doLogin(username : string, password: string) {
    const sessionId = await getRealSessionId(username, password)
    if (!sessionId) {
      throw new Error('登录失败1')
    }
    const crumb = await pickCrumb(sessionId)
    if (!crumb) {
      throw new Error('登录失败2')
    }
    return { sessionId, crumb }
  }

  /**
   * 先读json登录失败再手动登录
   * @param username
   * @param password
   */
  async login(username = 'dev', password = 'dev0407@'):Promise<Devops> {
    const userData = await userDataService.getData()
    if (userData) {
      console.log('已登录无需重复登录 , 登录信息 = ')
      console.log(userData)
      this.sessionId = userData.sessionId
      this.crumb = userData.crumb
    } else{
      const { sessionId, crumb } = await this.doLogin(username, password)
      this.sessionId = sessionId
      this.crumb = crumb
      await userDataService.writeData({
        sessionId, crumb, timeout: 0
      })
    }
    return this
  }

  build(jobName = 'qms-platform-build', brandName:string) {
    console.log(this.sessionId)
    const url = `http://192.168.26.2:8080/job/QMS/job/${jobName}/build?delay=0sec`
    console.log(url)
    return request(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': this.sessionId,
      }
    }
    , `name=branch&value=${brandName}&statusCode=303&redirectTo=.&Jenkins-Crumb=${this.crumb}&json=%7B%22parameter%22%3A+%7B%22name%22%3A+%22branch%22%2C+%22value%22%3A+%22${brandName}%22%7D%2C+%22statusCode%22%3A+%22303%22%2C+%22redirectTo%22%3A+%22.%22%2C+%22Jenkins-Crumb%22%3A+%22${this.crumb}%22%7D&Submit=%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BA`
    )
  }

  trigger(jobName: string) {
    return request(`http://192.168.26.2:8080/job/QMS/job/${jobName}/build?delay=0sec`, {
      method: 'post',
      headers: {
        'Cookie': this.sessionId,
        'Jenkins-Crumb': this.crumb
      }
    })
  }

  getProcess(jobName: string): Promise<Boolean> {
    return request(`http://192.168.26.2:8080/job/QMS/job/${jobName}/buildHistory/ajax`, {
      method: 'get',
      headers: {
        'Cookie': this.sessionId,
        'Jenkins-Crumb': this.crumb
      }
    }).then(res => {
      const html:string = res.data
      if(html.indexOf('pending—Waiting for next available executor') > -1 || html.indexOf('预计剩余时间') > -1) {
        if (!this.jobSeq) {
          this.jobSeq = new RegExp(`${jobName}/(\\d+)/console`).exec(html)?.[1]
        }
        return true
      }
      return false
    })
  }


  getConsole(jobName: string): Promise<string> {
    return request(`http://192.168.26.2:8080/job/QMS/job/${jobName}/${this.jobSeq}/console`, {
      method: 'get',
      headers: {
        'Cookie': this.sessionId,
        'Jenkins-Crumb': this.crumb
      }
    }).then(res => {
      this.jobSeq = ''
      return subAfter(cleanHtmlTag(res.data), 'Started by user ')
    })
  }
}

function subAfter(str: string, find: string) {
  let i: number
  if ((i = str.indexOf(find)) > -1) {
    return str.substring(i)
  }
  return str
}

function cleanHtmlTag(html:string): string {
  return html.replace(/(<[^<]*?>)|(<[\s]*?\/[^<]*?>)|(<[^<]*?\/\s*?>)/g, '')
}


function getFirstSessionId(): Promise<string|undefined> {
  return request('http://192.168.26.2:8080/j_spring_security_check', {
    method: 'GET'
  }).then((res) => {
    return res.headers['set-cookie']?.[0]
  })
}


async function getRealSessionId(username = 'dev', password = 'dev0407@'): Promise<string|undefined> {
  const sessionId = await getFirstSessionId()
  console.log(`first sessionid = ${sessionId}`)
  const params = new URLSearchParams()
  params.append('j_username', username)
  params.append('j_password', password)
  params.append('Submit', '登录')
  const postData = params.toString()
  return request('http://192.168.26.2:8080/j_spring_security_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
      'Cookie': sessionId,
      'Content-Length': postData.length
    }
  }, postData).then(res => {
    return res.headers['set-cookie']?.[0]
  })
}


async function pickCrumb(sessionId:string): Promise<string|undefined> {
  console.log(`real sessionId = ${sessionId}`)
  return request('http://192.168.26.2:8080', {
    method: 'GET',
    headers: {
      'Cookie': sessionId,
    }
  }).then((res) => {
    return /data-crumb-value="(\w+)"/.exec(res.data)?.[1]
  })
}


export function doLogin(): Promise<Devops> {
  return new Devops().login()
}

