import { URL } from 'node:url'
import { IncomingHttpHeaders, RequestOptions } from 'http'
import * as http from 'http'

export class Resp {
  statusCode: number| undefined
  data: any
  headers: IncomingHttpHeaders
  err?: string

  constructor(statusCode: number| undefined, data : any, headers: IncomingHttpHeaders, err?:string) {
    this.statusCode = statusCode
    this.data = data
    this.headers = headers
    err && (this.err = err)
  }

}

export function request(url: string | URL, options: RequestOptions, data: any = null): Promise<Resp> {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      res.setEncoding('utf-8')
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(new Resp(res.statusCode, data, res.headers))
      })
      res.on('error', (err) => {
        reject(new Resp(res.statusCode, data, res.headers, err.message))
      })
    })
    data && req.write(data)
    req.end()
  })
}
