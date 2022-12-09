const {app, BrowserWindow, dialog, Menu, ipcMain} = require('electron')
const path = require('path')
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}


app.whenReady().then(() => {

    //创建一个窗口
    const mainWindow = new BrowserWindow({
        resizable: true,
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, //开启后才能使用contextBridge
            preload: require('path').join(__dirname, 'preload.cjs')
        }
    })
    mainWindow.webContents.openDevTools({mode: 'right'})

    ipcMain.handle('dialog:openFile', handleFileOpen)

    ipcMain.on('set-title',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title)
    })

    //窗口加载html文件
    mainWindow.loadFile('./src/main.html')
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


try {
    require('electron-reloader')(module)
} catch (_) {
}
