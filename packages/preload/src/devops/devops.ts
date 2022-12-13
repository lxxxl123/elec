import { request } from '@/ahttp'


export class Devops {
  sessionId:string
  crumb:string

  constructor() {
    this.sessionId = ''
    this.crumb = ''
  }

  async login(username = 'dev', password = 'dev0407@'):Promise<Devops> {
    const sessionId = await getRealSessionId(username, password)
    if (!sessionId) {
      throw new Error('登录失败1')
    }
    this.sessionId = sessionId
    const crumb = await pickCrumb(sessionId)
    if (!crumb) {
      throw new Error('登录失败2')
    }
    this.crumb = crumb
    return this
  }

  build(jobName = 'qms-platform-build', brandName:string) {
    return request(`http://192.168.26.2:8080/${jobName}/job/QMS/job/${jobName}/build?delay=0sec`, {
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
}


async function getFirstSessionId(): Promise<string|undefined> {
  return request('http://192.168.26.2:8080/j_spring_security_check', {
    method: 'GET'
  }).then((res) => {
    return res.headers['set-cookie']?.[0]
  })
}

export function doLogin(): Promise<Devops> {
  const de = new Devops()
  return de.login()
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


export async function pickCrumb(sessionId:string): Promise<string|undefined> {
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

