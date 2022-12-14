import { dialog, ipcMain, app } from 'electron'
async function handleFileOpen(obj: any) {
  const { canceled, filePaths } = await dialog.showOpenDialog(obj)
  if (canceled) {

  } else {
    return filePaths[0]
  }
}

export function buildIpc() {
  ipcMain.handle('dialog:openFile', handleFileOpen)
}
