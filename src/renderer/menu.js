const { remote, shell } = require('electron')
const openAboutWindow = require('about-window').default;
const { Menu } = remote
const fs = require('fs');



var createMenu = function(router, store){
  const isMac = process.platform === 'darwin'
  const menuTemplate = [
    
    // File
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
  
    // Application
    {
      label: 'Application',
      submenu: [
        {
          label: 'Chart',
          click: async () => {
            router.replace({name:'chart-page'}).catch( ()=>{} );
          }
        },
        {
          label: 'History',
          click: async () => {
            router.replace({name:'history-page'}).catch( ()=>{} );
          }
        },
        {
          label: 'Settings',
          click: async () => {
            router.replace({name:'settings-page'}).catch( ()=>{} );
          }
        },    


        { type: 'separator' },
        
        {
          label: 'Reload Application',
          click: async () => {
            remote.getCurrentWindow().reload();
          }
        },
        {
          label: 'Open Log directory',
          click: async () => {
            shell.openItem(store.state.Settings.logPath)
          }
        },
        {
          label: 'Clear Chart Data',
          click: async () => {
            store.dispatch("App/remove_all_chart_data")
          }
        }, 
        {
          label: 'Clear Log Data',
          click: async () => {
            fs.unlinkSync(store.state.Settings.logPath + 'tc-data.log');
            fs.unlinkSync(store.state.Settings.logPath + 'kp-data.log');
          }
        },  

      ]
    },  


  
    // Window
    {
      label: 'Window',
      submenu: [
        { role: 'togglefullscreen' },
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
  
    // About
    {
      role: 'help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            router.replace({name:'about-page'}).catch( ()=>{} );
          }
        } ,
        {
          label: 'Open Dev Tools',
          click: () => {
            remote.getCurrentWebContents().toggleDevTools();
          }
        }      
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

export default createMenu;