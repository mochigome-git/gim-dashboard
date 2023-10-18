import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../lib/realtime";

export default function MachinetDailyChartData() {
	const [dataPoints, setPoints] = useState([]);
	const { machine_tRecords } = useContext(DailyContext);

	useEffect(() => {
		const theRecords = new Promise((resolve) => {
			resolve(machine_tRecords);
		});
		//Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
		theRecords
			.then(
				(data) => {
					var dps = [];
					for (var i = 0; i < data.length; i++) {
						dps.push({
							x: Math.floor(new Date(data[i].insertdate).getTime()),
							y: Number(data[i].total),
						});
					}
					setPoints(dps);
				}
			)
	}, [machine_tRecords]);

	return {
		tFillingdata: {
			datasets: { data: (dataPoints) },
		}
	}
};