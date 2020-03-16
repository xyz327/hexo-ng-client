import { app, BrowserWindow, screen, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { autoUpdater } from "electron-updater"
let win: BrowserWindow = null;

// 限制只可以打开一个应用, 4.x的文档
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
      win.show()
    }
  })
  // 创建 myWindow, 加载应用的其余部分, etc...
  // app.on('ready', () => {
  // })
}

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');


function initIpcEvent(browserWindow: BrowserWindow): void {
  // 
  ipcMain.on('open-directory-dialog', evet => {
    dialog.showOpenDialog(browserWindow, {
      properties: ['openDirectory']
    }).then(dir => {
      if (dir) {
        evet.sender.send('selected-directory', dir);
      }
    }).catch(err => {
      evet.sender.send('selected-directory-error', err);
    })
  });
}

//logger.transports.file.level = 'info';
//autoUpdater.logger = logger;
function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}
function initAutoUpdater(browserWindow: BrowserWindow): void {
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
    //autoUpdater.quitAndInstall();
  })

}
function createWindow(show: boolean = true): BrowserWindow {
  // 开始检查是否有新版本
  autoUpdater.checkForUpdatesAndNotify();
  //autoUpdater.checkForUpdates();
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    show,
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      // 允许加载本地资源
      webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  // 安装devtools插件
  //installExtension('elgalmkoelokbchhkhacckoklkejnhcd')
  //  .then((name) => console.log(`Added Extension:  ${name}`))
  //  .catch((err) => console.log('An error occurred: ', err));

  if (serve) {
    win.webContents.openDevTools();
  }
  // 初始化 electron ipc主线程和渲染线程的交互
  initIpcEvent(win);

  initAutoUpdater(win);
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}
function createWindowWithLoading() {
  let main = null
  let loading = new BrowserWindow({ show: false, frame: false })

  loading.once('show', () => {
    main = createWindow(false);
    main.webContents.once('dom-ready', () => {
      console.log('main loaded')
      main.show()
      loading.hide()
      loading.close()
    })
  })
  if (serve) {
    loading.webContents.openDevTools();
    loading.loadURL('http://localhost:4200/loading.html');
  } else {
    loading.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/loading.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  loading.show()

}
try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
