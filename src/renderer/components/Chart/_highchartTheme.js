let theme = {
    time: {
        timezone: 'America/Chicago'
    },
    colors: ['#000099'],
    chart: {
        backgroundColor: '#fff',
        style: {
            fontFamily: 'Consolas, monaco, monospace'
        }
    },
    title: {
        style: {
            fontSize: '17px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yAxis: {
        //minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        },
    },
    // General
    background2: '#F0F0EA'
};


export default theme;