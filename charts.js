// consensus income details
const ctxIncomeDetail = document.getElementById('incomeDetail').getContext('2d');
let chartIncomeDetail;

const fetchDataAndUpdateChartIncomeDetail = async (validatorIndex) => {
    try {
        const response = await fetch(`https://beaconcha.in/api/v1/validator/${validatorIndex}/incomedetailhistory`);
        const responseData = await response.json();
        const incomeData = responseData.data.map(item => ({
            epoch: `Epoch ${item.epoch}`,
            attestation_source_reward: item.income.attestation_source_reward,
            attestation_target_reward: item.income.attestation_target_reward,
            attestation_head_reward: item.income.attestation_head_reward
        })).reverse();
        updateChartIncomeDetail(incomeData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const updateChartIncomeDetail = (incomeData) => {
    const data = {
        labels: incomeData.map(item => item.epoch),
        label: 'Consensus Income History',
        datasets: [{
            label: 'Attestation Source Reward',
            data: incomeData.map(item => item.attestation_source_reward),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            stack: 'stacked'
        }, {
            label: 'Attestation Target Reward',
            data: incomeData.map(item => item.attestation_target_reward),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            stack: 'stacked'
        }, {
            label: 'Attestation Head Reward',
            data: incomeData.map(item => item.attestation_head_reward),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            stack: 'stacked'
        }]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        },
        plugins: {
            title: {
                display: true,
                text: 'Consensus Income History', 
                font: { size: 24 }
            }
        }
        
    };
    if (chartIncomeDetail) {
        chartIncomeDetail.destroy();
    }
    chartIncomeDetail = new Chart(ctxIncomeDetail, {
        type: 'bar',
        data: data,
        options: options
    });
};

// balance history chart
const ctxIncomeChart = document.getElementById('incomeChart').getContext('2d');
let chartIncomeChart;

const fetchDataAndUpdateChartIncomeChart = async (validatorIndex) => {
    try {
        const response = await fetch(`https://beaconcha.in/api/v1/validator/stats/${validatorIndex}`);
        const responseData = await response.json();
        const incomeData = responseData.data.map(item => item.end_balance).reverse();
        const labels = responseData.data.map(item => {
            const date = new Date(item.day_end);
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        }).reverse();
        updateChartIncomeChart(incomeData, labels);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const updateChartIncomeChart = (incomeData, labels) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Balance',
            data: incomeData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { reverse: false },
            y: { beginAtZero: false, min: 32000000000 }// just to see the bars better
        },
        plugins: {
            title: {
                display: true,
                text: 'Balance History',
                font: { size: 24 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let balance = context.parsed.y;
                        let tooltipLabel = `${labels[context.dataIndex]}: ${balance}`;
                        return tooltipLabel;
                    }
                }
            }
        }
    };
    if (chartIncomeChart) {
        chartIncomeChart.destroy();
    }
    chartIncomeChart = new Chart(ctxIncomeChart, {
        type: 'bar',
        data: data,
        options: options
    });
};

// Fetch and display validator metrics
const summaryElement = document.getElementById('validatorMetricsSummary');
const fetchAndDisplayValidatorMetrics = async (validatorIndex) => {
    try {
        const response = await fetch(`https://beaconcha.in/api/v1/validator/stats/${validatorIndex}`);
        const responseData = await response.json();
        const metrics = {
            attester_slashings: 0,
            missed_attestations: 0,
            missed_blocks: 0,
            missed_sync: 0,
            orphaned_attestations: 0,
            orphaned_blocks: 0,
            orphaned_sync: 0,
            participated_sync: 0,
            proposed_blocks: 0,
            proposer_slashings: 0
        };

        // calculate totals for each metric
        responseData.data.forEach(item => {
            metrics.attester_slashings += item.attester_slashings;
            metrics.missed_attestations += item.missed_attestations;
            metrics.missed_blocks += item.missed_blocks;
            metrics.missed_sync += item.missed_sync;
            metrics.orphaned_attestations += item.orphaned_attestations;
            metrics.orphaned_blocks += item.orphaned_blocks;
            metrics.orphaned_sync += item.orphaned_sync;
            metrics.participated_sync += item.participated_sync;
            metrics.proposed_blocks += item.proposed_blocks;
            metrics.proposer_slashings += item.proposer_slashings;
        });

        // Display metrics
        let gridHtml = `<h2>KPI Summary for Validator Index: ${validatorIndex}</h2><div class="metrics-grid">`;

        Object.keys(metrics).forEach(key => {
            gridHtml += `
    <div class="metric-card">
        <h3>${key.replace(/_/g, ' ').toUpperCase()}</h3>
        <p>${metrics[key]}</p>
    </div>`;
        });

        gridHtml += `</div>`;

        summaryElement.innerHTML = gridHtml;

    } catch (error) {
        console.error('Error fetching validator metrics:', error);
    }
};

function updateValidatorMetrics() {
    const validatorIndex = document.getElementById('validatorIndexInput').value;
    if (validatorIndex) {
        fetchDataAndUpdateChartIncomeDetail(validatorIndex);
        fetchDataAndUpdateChartIncomeChart(validatorIndex);
        fetchAndDisplayValidatorMetrics(validatorIndex);
    } else {
        console.error('Validator index is required');
    }
}

// Fetch and display metrics on dashboard load
fetchAndDisplayValidatorMetrics();

// Fetch and update data for both charts
fetchDataAndUpdateChartIncomeDetail();
fetchDataAndUpdateChartIncomeChart();

// Set intervals to update charts every minute (free api limits!)
setInterval(fetchDataAndUpdateChartIncomeDetail, 60000);
setInterval(fetchDataAndUpdateChartIncomeChart, 60000);
