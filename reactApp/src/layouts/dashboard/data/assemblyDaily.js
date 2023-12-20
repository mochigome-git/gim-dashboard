import { useEffect, useState } from "react";
import { useContext } from "react";
import { DailyContext } from "../../../lib/realtime";

export default function AssemblyDaily() {
	const [dataPoints, setPoints] = useState([]);
	const { assembly} = useContext(DailyContext);

	useEffect(() => {
		const theRecords = new Promise((resolve) => {
			resolve(assembly.line1);
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
	}, [assembly.line1]);

	return {
		assemblydata: {
			datasets: { data: (dataPoints) },
		}
	}
};