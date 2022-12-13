import { ChildProcess, exec } from 'child_process'
// @ts-ignore
import iconv from 'iconv-lite'

// 子进程名称
let workerProcess
const encoding = 'gbk'
const binaryEncoding = 'binary'


function transfer(data: string) {
  return iconv.decode(Buffer.from(data, binaryEncoding), encoding)
}

export function runExec(cmd: string, path: string, callback: (data:string) => void) {
  workerProcess = exec(cmd, { cwd: path, encoding: 'binary' })

  workerProcess.stdout?.on('data', function(data: string) {
    callback(transfer(data))
  })

  workerProcess.stderr?.on('data', function(data: string) {
    callback(transfer(data))
  })

  workerProcess.on('close', function(code: string) {
  })
}
