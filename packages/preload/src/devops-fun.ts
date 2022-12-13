import { doLogin } from './devops'
const { ipcRenderer } = require('electron')


async function getSessionId() {
  return ipcRenderer.invoke('get-sessionId').then((data:string) => {
    console.log(data)
    data = data.replace(/;.*/, '')
    return data
  })
}


export function login() {
  doLogin().then((res) => {
    console.log(res)
  })
}
