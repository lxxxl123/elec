import { Devops, doLogin } from './devops'
import { Resp } from '@/ahttp'

let de: Devops

export function login() {
  return doLogin().then(res => {
    de = res
    return de
  })
}

export function build(jobName:string, branchName: string): Promise<Resp> {
  if (!de) {
    console.log('未登陆 , 请重新登录')
  }
  return de.build(jobName, branchName)
}
