import Highcharts from "highcharts/highstock";

function configs(datasets, ownerState, ymin, ymax, navigator) {

	const darkMode = ownerState?.darkMode ?? true;
	const color = darkMode ? "#ffffff6c" : "#000";
	const color2 = darkMode ? "#ffffff" : "#000";
	const darkModeColors = ['#BB86FC', '#fc86e8', '#86d1fc', '#86fca9', '#cdfc86', '#fcfa86', '#86fcf8', '#76ff54', '#547fff', '#ffdb58', '#ff6e6e', '#6e75ff'];
	const series = datasets.datasets.slice(0, 12).map((dataset, index) => ({
		name: dataset.name,
		type: 'line',
		data: dataset.data,
		color: darkModeColors[index],
		tooltip: {
			valueDecimals: 2,
			valueSuffix: '℃',
			shared: true,
		},
		turboThreshold: 15000,
	}));

	return {
		option: {
			title: {
				text: ''
			},
			responsive: false,
			accessibility: {
				enabled: false
			},
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
							style: {
								color: color
							}
						}
						// disabled: { ... }
					}
				},
				inputBoxBorderColor: 'null',
				inputBoxWidth: 70,
				inputBoxHeight: 18,
				inputStyle: {
					color: color,
					fontWeight: 'bold',
					fontSize: '8.5',
				},
				labelStyle: {
					color: color,
					fontWeight: 'bold',
					fontSize: '8.5',
				},
				selected: 6,
				enabled: true
			},
			navigator: {
				enabled: navigator === true ? false : true,
			},
			scrollbar: {
				enabled: false
			},
			yAxis: [{
				min: ymin,
				max: ymax,
				labels: {
					align: 'right',
					x: 0,
					y: 0,
					//format: '{value}℃',
					style: {
						color: color,
					}
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
					style: {
						color: color,
					}
				},
			},
			tooltip: {
				shared: true,
				formatter: function () {
					let tooltipContent = '';
				  
					const midnightDate = new Date(this.x);
					midnightDate.setHours(0, 0, 0, 0);
				  
					if (+this.x !== +midnightDate) {
					  // If there is a valid time, show date and time
					  tooltipContent = `<strong>${Highcharts?.dateFormat('%H:%M:%S', this.x)}</strong><br>`;
					} else {
					  // If no valid time, show date only
					  tooltipContent = `<strong>${Highcharts?.dateFormat('%Y-%m-%d', this.x)}</strong><br>`;
					}
				  
					// Common part for both cases
					this.points.forEach((point) => {
					  tooltipContent += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 2)}</b><br>`;
					});
				  
					return tooltipContent;
				  },
				  
								
				style: {
					minWidth: '200px',
					maxWidth: '350px',
					minHeight: '200px',
					maxHeight: '350px',
					whiteSpace: 'normal'
				},
			},
			legend: {
				itemStyle: {
					color: color2,
				},
				itemHiddenStyle: { "color": "#384554" }
			},
			series,
			plotOptions: {
				series: {
					turboThreshold: 50000,
					marker: {
						lineColor: null,
						lineWidth: 0,
						symbol: 'circle'
					}
				}
			},
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

configs.defaultProps = {
	navigator: true
}

export default configs;
