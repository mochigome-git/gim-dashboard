function configs(datasets, ownerState, ymax) {

	const darkMode = ownerState?.darkMode ?? true;
	const color = darkMode ? "#ffffff6c" : "#000";

	const commonStyle = {
		color: color,
		fontWeight: 'bold',
		fontSize: 8.5,
	};

	return {
		option: {
			responsive: false,
			credits: {
				enabled: false
			},
			chart: {
				backgroundColor: {
					linearGradient: null,
					stops: [
						[0, '#1b1b1b'],
						[1, '#414148']
					]
				},
			},
			navigation: {
				buttonOptions: {
					enabled: true
				},
			},
			rangeSelector: {
				dropdown: 'always',
				verticalAlign: 'bottom',
				buttonSpacing: 0.5,
				buttonTheme: { // styles for the buttons
					fill: 'none',
					stroke: 'none',
					'stroke-width': 0,
					width: 18,
					r: 8,
					style: {
						color: '#ffffff',
						fontWeight: 'bold',
						fontSize: '8.5',
					},
					states: {
						hover: {
							style: {
								color: '#00000046'
							}
						},
						select: {
							fill: '#ffffff10',
							style: commonStyle,
						}
						// disabled: { ... }
					}
				},
				inputBoxBorderColor: 'null',
				inputBoxWidth: 70,
				inputBoxHeight: 18,
				inputStyle: commonStyle,
				labelStyle: commonStyle,
				selected: 1,
				enabled: true
			},
			navigator: {
				enabled: false
			},
			scrollbar: {
				enabled: false
			},
			yAxis: [{
				max: ymax,
				labels: {
					align: 'right',
					x: 0,
					y: 0,
					//format: '{value}',
					style: commonStyle,
				},
				lineWidth: 0.5,
				lineColor: 'none',
				opposite: false,
				resize: {
					enabled: false
				},
				title: {
					text: '',
					style: {
						color: '#ffffff',
					}
				},
				gridLineColor: 'null',
				gridLineWidth: 0.5
			}],
			xAxis: {
				tickLength: 0,
				type: 'datetime',
				offset: 0,
				lineWidth: 0.5,
				lineColor: 'null',
				opposite: false,
				resize: {
					enabled: false
				},
				labels: {
					style: commonStyle,
				}
			},
			series: [{
				name: '個',
				type: 'line',
				data: datasets?.datasets.data.slice().reverse(), // Slice creates a shallow copy.
				color: '#BB86FC',
				tooltip: {
					valueDecimals: 2,
				},

			}]
		},
		containerprops: {
			style: {
				height: "100%",
				width: "100%",
				maxWidth: "100%",
				margin: "auto",
				display: "inline-flex",
				position: "absolute"
			}
		},
	};
}

export default configs;
