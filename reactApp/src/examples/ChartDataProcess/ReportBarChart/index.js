// ReportsBarChartData.js
import { useEffect, useState } from "react";

const ReportsBarChartData = (records, xKey, yKey) => {
	const [dataPoints, setPoints] = useState([]);

	useEffect(() => {
		// Process the records to update dataPoints
		var dps = [];
		for (var i = 0; i < records.length; i++) {
			dps.push({
				x: Math.floor(new Date(records[i][xKey]).getTime()),
				y: Number(records[i][yKey]),
			});
		}
		setPoints(dps);
	}, [records, xKey, yKey]);

	const data = {
		data: { 
			datasets: { data: dataPoints }, 
		},
	};

	return data;
};

export default ReportsBarChartData;
