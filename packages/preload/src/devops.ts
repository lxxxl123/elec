import { request } from '@/ahttp'


async function getFirstSessionId(): Promise<string|undefined> {
  return request('http://192.168.26.2:8080/j_spring_security_check', {
    method: 'GET'
  }).then((res) => {
    return res.headers['set-cookie']?.[0]
  })
}

export function doLogin(): Promise<string|undefined> {
  return pickCrumb()
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


export async function pickCrumb(): Promise<string|undefined> {
  const sessionId = await getRealSessionId()
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

