import { contextBridge } from 'electron'

import { ipcRenderer } from 'electron'


// Custom APIs for renderer
const api = {
  RequestMainProcess: async (req) => {
    console.log("data:" +JSON.stringify(req))
   const res = await ipcRenderer.invoke('request-handle', req);
    return res;
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
  //  contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
 // window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
