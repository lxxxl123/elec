import { ipcRenderer } from 'electron'

export function openFileDialog(obj: any) {
  return ipcRenderer.invoke('dialog:openFile', obj)

}

