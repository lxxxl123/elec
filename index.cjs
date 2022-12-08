const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.whenReady().then(() => {

    //创建一个窗口
    const mainWindow = new BrowserWindow({
        resizable: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: require('path').join(__dirname, 'preload.cjs')
        }
    })

    //窗口加载html文件
    mainWindow.loadFile('./src/main.html')
})

try {
    require('electron-reloader')(module)
} catch (_) {
}
