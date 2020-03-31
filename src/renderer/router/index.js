import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('../components/Chart/ChartPage').default
    },
    {
      path: '/chart',
      name: 'chart-page',
      component: require('../components/Chart/ChartPage').default
    },
    {
      path: '/thermocouple/:id',
      name: 'thermocouple-page',
      component: require('../components/Thermocouple/ThermocouplePage').default
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: require('../components/Settings/SettingsPage').default
    },
    {
      path: '/history',
      name: 'history-page',
      component: require('../components/History/HistoryPage').default
    },
    {
      path: '/about',
      name: 'about-page',
      component: require('../components/About/AboutPage').default
    },
    {
      path: '*',
      component: require('../components/404').default
    },
  ]
})
