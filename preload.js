const { contextBridge, ipcRenderer } = require('electron');

// Expose the 'selectFile' function to the renderer process
contextBridge.exposeInMainWorld('readAndParseFile', (filePath) => {
  return ipcRenderer.invoke('read-and-parse-file', filePath);
});

contextBridge.exposeInMainWorld('selectFile', async () => {
  return await ipcRenderer.invoke('select-file');
});

// Handle the 'file-selected' event in the preload script
ipcRenderer.on('file-selected', (event, filePath) => {
  // Send the file path to the renderer process
  window.dispatchEvent(new CustomEvent('file-selected', { detail: filePath }));
});
