# Validator KPI Monitoring Dashboard

The Validator KPI Monitoring Dashboard is a simple web-based tool designed to provide an easy and intuitive way to monitor kpis for Ethereum 2.0 validators. It fetches and displays various metrics related to validator performance, including balance changes, rewards, penalties, and other crucial metrics that are vital for validators in the Ethereum 2.0 Proof of Stake ecosystem. All of this is using beaconcha.in free API.

![validator-performance-dashboard](https://github.com/mickymultani/validator-performance-dashboard/assets/42827572/93bcb08d-0cb4-4491-b30b-8b66c484bd37)


## Features

- **Real-time Data**: Dynamically fetches the latest validator metrics from the beaconcha.in API.
- **Interactive Charts**: Visualizes balance history and income details over time through chart.js charts
- **Key Metrics Summary**: Displays a summary of essential validator performance 

## Usage

1. **Enter Validator Index**: Users can input the validator index in the provided field to fetch and display the metrics specific to that validator.
2. **Fetch Metrics**: Click the "Fetch Metrics" button to update the dashboard with the latest data for the entered validator index. Better to set a default in the js.
3. **View Charts and Metrics**: Observe the balance history and income detail charts, along with a summary of key metrics, all updated in real-time.

## Setup

To set up the Validator KPI Monitoring Dashboard on your local environment, follow these steps:

1. **Clone the Repository**
```
git clone https://github.com/mickymultani/validator-performance-dashboard.git

```

2. **Open the Dashboard**

Navigate to the project directory and open the `index.html` file in your preferred web browser. *I tested this on Firefox only*

3. **Enter a Validator Index**

Use the input field at the top of the dashboard to enter a validator index for which you want to monitor performance metrics.

## Contributions

Contributions to the Validator KPI Monitoring Dashboard are welcome!

## License

This project is licensed under the MIT License.

## Acknowledgments

- Beacon Chain API for providing the data!


