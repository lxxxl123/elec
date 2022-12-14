<template>
  <div ref="xterm" />
</template>

<script>
import { Terminal } from 'xterm'
import os from 'os'
import 'xterm/dist/xterm.css'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as attach from 'xterm/lib/addons/attach/attach'
const pty = require('node-pty')
Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
export default {
  name: 'MainPage',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
      const env = process.env
      env.LC_ALL = 'zh_CN.UTF-8'
      env.LANG = 'zh_CN.UTF-8'
      env.LC_CTYPE = 'zh_CN.UTF-8'
      const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: env,
        encoding: null
      })
      const xterm = new Terminal({
        cols: 80,
        rows: 30,
        theme: {
          foreground: 'rgb(254,239,143)',
          background: 'rgb(22,102,47)',
          cursor: 'rgb(254,239,143)'
        }
      })
      xterm.open(this.$refs.xterm)
      xterm.on('data', (data) => {
        console.log(Buffer.from(data))
        console.log('xterm:' + Buffer.from(data).toString())
        ptyProcess.write(Buffer.from(data))
      })
      ptyProcess.on('data', function (data) {
        console.log(data)
        console.log('ptyProcess:' + data.toString())
        xterm.write(data.toString())
      })
      // ptyProcess.write('export LANG=zh_CN.UTF-8\n')
    }
  }
}
</script>

<style scoped>
</style>
