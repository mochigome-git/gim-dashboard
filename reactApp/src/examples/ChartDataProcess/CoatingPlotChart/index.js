import { useEffect, useState } from "react";

export default function CoatingPlotChart(records) {
	const [dataPoints, setPoints] = useState([]);

	useEffect(() => {
		if (records) {
			// Create a map to store the count of d676 for each day
			const countByDay = {};

			// Loop through the nk2_output data and count d676 for each day
			records.forEach((data) => {
				const date = new Date(data.created_at).toDateString(); // Get the date part only
				if (countByDay[date]) {
					countByDay[date]++;
				} else {
					countByDay[date] = 1;
				}
			});

			// Create data points with x and y values
			const dps = Object.keys(countByDay).map((date) => ({
				x: new Date(date).getTime(),
				y: countByDay[date],
			}));

			// Set the data points in the state
			setPoints(dps);
		}
	}, [records]);

	return {
		data: {
			datasets: { data: dataPoints },
		},
	};
}
