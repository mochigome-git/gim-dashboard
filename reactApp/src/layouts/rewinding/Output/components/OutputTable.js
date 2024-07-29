import React from "react";
import RWTable from "./RWTable"
// @mui material components
import {
  Card,
  Stack,
  TableContainer,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Material UI Icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

// Data
import Rewinding_daily_Data from "../data";

// Api
import { dataCSV } from "../api";

const RewindingTable = () => {
  const { columns, rows } = Rewinding_daily_Data();
  return (
    <MDBox sx={{ width: 'auto' }}>
      <RWTable
        title_en="Rewinding daily output"
        title_jp="日間巻替実績"
        columns={columns}
        rows={rows}
      />
    </MDBox>
  );
}

const OutputTable = ({ shadow }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [startdate, setStartDate] = React.useState(null);
  const [enddate, setEndDate] = React.useState(null);
  

  const onDownload = async () => {
    const tableNames = "rewinding_count";
    const formattedDate = dayjs(startdate).format("YYYY-MM-DD");
    const formattedEnddate = dayjs(enddate).format("YYYY-MM-DD");
    const folderName = `${tableNames}:${formattedDate}~${formattedEnddate}`;
    dataCSV(formattedDate, formattedEnddate, tableNames, folderName);
  };

  return (
    <>
      <MDBox mx={2}>
        <Stack direction="row" spacing={-1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MDBox display="flex" alignItems="center">
              <MDBox
                components={["DatePicker", "DatePicker"]}
                sx={{ mr: 2, p: 1 }}
              >
                <DatePicker
                  label={
                    <MDBox
                      sx={{
                        color: (theme) =>
                          darkMode
                            ? theme.palette.white.main
                            : theme.palette.dark.main,
                      }}
                    >
                      Start Date
                    </MDBox>
                  }
                  maxDate={dayjs()}
                  value={startdate}
                  onChange={(newValue) => setStartDate(newValue)}
                  sx={{
                    mr: 2,
                    "& .MuiSvgIcon-root": {
                      color: (theme) =>
                        darkMode
                          ? theme.palette.white.main
                          : theme.palette.dark.main,
                    },
                  }}
                />
                <DatePicker
                  label={
                    <MDBox
                      sx={{
                        color: (theme) =>
                          darkMode
                            ? theme.palette.white.main
                            : theme.palette.dark.main,
                      }}
                    >
                      End Date
                    </MDBox>
                  }
                  maxDate={dayjs()}
                  value={enddate}
                  onChange={(newValue) => setEndDate(newValue)}
                  sx={{
                    mr: 2,
                    "& .MuiSvgIcon-root": {
                      color: (theme) =>
                        darkMode
                          ? theme.palette.white.main
                          : theme.palette.dark.main,
                    },
                  }}
                />
              </MDBox>
            </MDBox>
          </LocalizationProvider>
          <MDButton
            aria-label="edit"
            label="download"
            variant="text"
            size="large"
            circular={true}
            iconOnly={true}
            onClick={onDownload}
            color={darkMode ? "white" : "dark"}
          >
            <Tooltip title="Download">
              <CloudDownloadIcon />
            </Tooltip>
          </MDButton>
        </Stack>
      </MDBox>
      <TableContainer sx={{ boxShadow: "none" }}>
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
          <MDBox p={2}>
            <RewindingTable />
          </MDBox>
        </Card>
      </TableContainer>
    </>
  );
};


export default OutputTable;
