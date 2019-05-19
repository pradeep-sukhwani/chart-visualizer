import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


class GraphData extends React.Component {
    constructor(props) {
        super(props);
        console.log(localStorage.getItem('data'));
        console.log(this.getLocalStorageData());

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {
                xAxis: {
                    title: {
                        text: 'DATE'
                    },
                    categories: this.getLocalStorageData()[0],
                },
                yAxis: {
                    title: {
                        text: 'REVENUE'
                    },
                },
                series: '',
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                mouseOver: this.setHoverData.bind(this)
                            }
                        }
                    }
                }
            },
            hoverData: null
        };
    }

    formatDate(date){
        return new Date(date.slice(0,4) + "-" + date.slice(4,6) + "-" + date.slice(6,8)).toDateString();
    }

    getLocalStorageData(){
        if (!localStorage.getItem('data')){
            return []
        }
        let data = localStorage.getItem('data').split("\n");
        let date = [];
        let dates = [];
        let countries = [];
        let gameRevenueData = [];
        let gameDauData = [];
        let countryRevenueData = [];
        let countryDauData = [];
        let gameID = [];
        for (let i=0; i<data.length; i++){
            let currentData = data[i];
            let currentArr = currentData.split(",");

            // Countries
            if (!countries || countries.indexOf(currentArr[2]) === -1) {
                countries.push(currentArr[2])
            }

            // Game ID
            if (!gameID || gameID.indexOf(currentArr[1]) === -1) {
                gameID.push(currentArr[1])
            }
            date.push(this.formatDate(currentArr[0]));
            // Dates

            // Country Revenue Data
            if (countryRevenueData['name'] === currentArr[2]){
                countryRevenueData['data'].push(currentArr[3]);
            } else {
                countryRevenueData.push({'name': currentArr[2], 'data': [parseInt(currentArr[3])]});
            }

            // Country DAU Data
            if (countryDauData['name'] === currentArr[2]){
                countryDauData['data'].push(currentArr[4]);
            } else {
                countryDauData.push({'name': currentArr[2], 'data': [parseInt(currentArr[4])]});
            }

            // Game Revenue Data
            if (gameRevenueData['name'] === currentArr[1]){
                gameRevenueData['data'].push(currentArr[3]);
            } else {
                gameRevenueData.push({'name': currentArr[1], 'data': [parseInt(currentArr[3])]});
            }

            // Game DAU Data
            if (gameDauData['name'] === currentArr[1]){
                gameDauData['data'].push(currentArr[4]);
            } else {
                gameDauData.push({'name': currentArr[1], 'data': [parseInt(currentArr[4])]});
            }
        }
        return [date, countries, countryRevenueData, countryDauData, gameRevenueData, gameDauData, gameID]
    }

    setHoverData = (e) => {
        // The chart is not updated because `chartOptions` has not changed.
        this.setState({hoverData: e.target.category})
    }

    countryRevenueSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                yAxis: {
                    title: {
                        text: 'REVENUE'
                    },
                    categories: this.getLocalStorageData()[0]
                },
                series: this.getLocalStorageData()[2],
            }
        });
    };

    countryDauSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                yAxis: {
                    title: {
                        text: 'DAU'
                    },
                    categories: this.getLocalStorageData()[0]
                },
                series: this.getLocalStorageData()[3],
            }
        });
    };

    gameRevenueSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                yAxis: {
                    title: {
                        text: 'REVENUE'
                    },
                    categories: this.getLocalStorageData()[6]
                },
                series: this.getLocalStorageData()[4],
            }
        });
    };

    gameDauSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                yAxis: {
                    title: {
                        text: 'DAU'
                    },
                    categories: this.getLocalStorageData()[6]
                },
                series: this.getLocalStorageData()[5],
            }
        });
    };

    render() {
        const {chartOptions} = this.state;
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        )
    }
}

export default GraphData
