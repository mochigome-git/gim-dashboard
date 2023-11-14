import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../lib/realtime";

export default function AssemblyDaily() {
	const [dataPoints, setPoints] = useState([]);
	const { rewinding_1 } = useContext(DailyContext);

	useEffect(() => {
		const theRecords = new Promise((resolve) => {
			resolve(rewinding_1);
		});
		//Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
		theRecords
			.then(
				(data) => {
					var dps = [];
					for (var i = 0; i < data.length; i++) {
						dps.push({
							x: Math.floor(new Date(data[i].created_at).getTime()),
							y: Number(data[i].total_count),
						});
					}
					setPoints(dps);
				}
			)
	}, [rewinding_1]);

	return {
		rewinding_1data: {
			datasets: { data: (dataPoints) },
		}
	}
};