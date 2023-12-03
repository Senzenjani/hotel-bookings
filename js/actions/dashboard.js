
import { districtChartOptions } from "../services/chartsOptions/stackedChart.js"

let nf = new Intl.NumberFormat('en-US');
let dashboardData;

$(function () {

});

export function loadDashboardData() {
    /*$.when(fetchDashboardData()).done(function (data) {
        populateDistrictCases(data);
    });*/
}

function populateDistrictCases(data) {
    districtChartOptions.series = data.series
    districtChartOptions.xaxis.categories = data.categories

    // Calculate the totals
    const totals = {
        totalCases: 0,
        totalConfirmed: 0,
        totalRecovered: 0,
        totalDeceased: 0
    };

    data.series.forEach((item) => {
        const { name, data } = item;
        const total = data.reduce((acc, val) => acc + val, 0);

        totals.totalCases += total;

        if (name === 'confirmed') {
            totals.totalConfirmed = total;
        } else if (name === 'recovered') {
            totals.totalRecovered = total;
        } else if (name === 'deceased') {
            totals.totalDeceased = total;
        }
    });

    $("#totalCases").text(totals.totalCases);
    $("#totalConfirmed").text(totals.totalConfirmed);
    $("#totalRecovered").text(totals.totalRecovered);
    $("#totalDeceased").text(totals.totalDeceased);

    let districtCasesChart = new ApexCharts(
        document.querySelector("#districtCasesChart"),
        districtChartOptions
    )

    districtCasesChart.render();
}