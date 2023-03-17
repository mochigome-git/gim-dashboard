import { useEffect, useState } from "react";
import CanvasJSReact from './lib/canvasjs.stock.react';
import { supabase } from "./lib/supabase";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

 
function Graph() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [dataPoints, setPoints] = useState([]);
	const [records, setRecords] = useState([]);

	const fetchData = async () => {
		try {
		  const { data, error } = await supabase.rpc('daily')
		  if (error) {throw error;}
		  setRecords(data);
		} catch (error) {
		  alert(error.message);
		}
	  };

	  useEffect(() => {
		fetchData();
		 const subscription = supabase
		  .channel('public:records')
		  .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, payload => {
			fetchData();
			console.log('Change received!') //,payload)
		 })
		 .subscribe();
	   return () => {
		   supabase.removeChannel(subscription);
	   };
	 }, []);

	useEffect(() => {
		const theRecords = new Promise((resolve) => {
			resolve(records);
		  });
		//Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
		theRecords
		  .then(
			(data) => {
			  var dps = [];
			  for (var i = 0; i < data.length; i++) {
				dps.push({
				  x: new Date(data[i].insertdate),
				  y: Number(data[i].total)
				});
			  }
			  setIsLoaded(true);
			  setPoints(dps);
			}
		  )
	  }, [records]);
	 
		const options = {
		  title:{
			text:""
		  },
		  theme: "light2",
		  subtitles: [{
			text: ""
		  }],
		  charts: [{
			axisX: {
			  crosshair: {
				enabled: true,
				snapToDataPoint: true,
				valueFormatString: "MMM DD YYYY"
			  }
			},
			axisY: {
			  title: "生産量",
			  prefix: "",
			  crosshair: {
				enabled: true,
				snapToDataPoint: true,
				valueFormatString: "#,###.##"
			  }
			},
			toolTip: {
			  shared: true
			},
			data: [{
			  name: "個数",
			  type: "splineArea",
			  color: "#3576a8",
			  yValueFormatString: "#,###.##",
			  xValueFormatString: "MMM DD YYYY",
			  dataPoints : dataPoints
			}]
		  }],
		  navigator: {
			slider: {
			  minimum: new Date("2017-05-01"),
			  maximum: new Date("2018-05-01")
			}
		  }
		};
		const containerProps = {
		  width: "100%",
		  height: "100%",
		  margin: "auto"
		};
		return (
			<Card>
			<MDBox padding="1rem">
			{
				// Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
				isLoaded && 
				<MDBox
				variant="gradient"
				borderRadius="lg"
				py={2}
				pr={0.5}
				mt={0}
				height="25.5rem"
			  >
				<CanvasJSStockChart containerProps={containerProps} options = {options}
				  /* onRef = {ref => this.chart = ref} */
				/>
				</MDBox>
			  }
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
			Test1
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
		  Test2
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
			Test3
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
			Test4
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
		  </Card>
		);
	  }

export default Graph;