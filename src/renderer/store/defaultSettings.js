const defaultSettings = {
    //---- general settings ----//
    numberThermocouples: 36,
    displayMissingThermocouples: true,
    displaySensorStatus: true,
    postOnUpdate: false,
    postUrl: '',
  
    //---- data logging settings ----//
    enableLogging: false,
    logPath: require('electron').remote.app.getPath('userData') + '\\logs\\',
    logDaysToKeep: 7,
  
    //---- chart settings ----//
    chartHeight: 450,
    chartTitle: 'My Chart Title',
    chartTimespan: 600, //timespan in minutes (600 = 10 hours)
    chartUpdateRate: 60, //update rate in seconds
    chartDisgardPointsAbove: 1100,
    chartDisgardPointsBelow: -10,
    chartYAxisFloor: 0,
    chartYAxisCeiling: 1250,
    
    //---- zw-rec device settings----//
    host: '172.17.1.127',
    clientUsername: 'login',
    clientPassword: '12345678',
    adminUsername: 'admin',
    adminPassword: '00000000',

    //---- Kepware Tags ----//
    kepwareHost: '172.17.2.33',
    kepwareUsername: 'Administrator',
    kepwarePassword:  'kepTech44*',
    kepwareTags: []
}

module.exports = defaultSettings;