const { remote } = require('electron')
const openAboutWindow = require('about-window').default;
const { Menu } = remote




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