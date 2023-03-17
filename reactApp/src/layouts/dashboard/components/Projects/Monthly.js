// @mui material components
import DoneIcon from '@mui/icons-material/Done';


// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "../../../../examples/Tables/DataTable";

// Data
import data2 from "./data/data2";

export const Monthly = () =>  {
  const { columns, rows } = data2();

  return (
    <MDBox sx={{ width: 'auto' }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Cartridges Coding daily output  
          </MDTypography>
          <MDTypography variant="h6" gutterBottom>
            日間書き込み実績 
            <DoneIcon sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -1,
                marginLeft: 1
              }}
              />
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox sx={{ width: 'auto' }}>
        <DataTable sx={{ width: 'auto' }}
          table={{ columns, rows}}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </MDBox>
  );
}

export default Monthly;
