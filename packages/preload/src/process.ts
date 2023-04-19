import { exec as exeCmd } from 'child_process'
import * as iconv from 'iconv-lite'
// @ts-ignore
import shell from 'shelljs'
import { join } from 'path'

// 子进程名称
const encoding = 'gbk'
const binaryEncoding = 'binary'


function transfer(data: string) {
  return iconv.decode(Buffer.from(data, binaryEncoding), encoding)
}

export function runCmd(cmd: string, path: string, callback: (data: string) => void): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const workerProcess = exeCmd(cmd, { cwd: path, encoding: 'binary' })

    workerProcess.stdout?.on('data', function(data: string) {
      callback(transfer(data))
    })

    workerProcess.stderr?.on('data', function(data: string) {
      callback(transfer(data))
    })

    workerProcess.on('close', function(code: string) {
      resolve(true)
    })
  })
}

let bashPath: string

export function runSh(cmd: string, path: string, callback: (data: string) => void): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    if(!bashPath) {
      const gitPath = shell.which('git')?.stdout || ''
      bashPath = join(gitPath, '../../bin/bash.exe')
      console.log(bashPath)
    }

    const workerProcess = shell.exec(cmd, { cwd: path, encoding: 'binary', async: true, shell: bashPath })

    workerProcess.stdout?.on('data', function(data: string) {
      callback(transfer(data))
    })

    workerProcess.stderr?.on('data', function(data: string) {
      callback(transfer(data))
    })

    workerProcess.on('close', function(code: string) {
      resolve(true)
    })
  })
}
