import React, { useContext, useMemo, useEffect } from "react";
import MDBox from "../../../../../../components/MDBox";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { AlertContext } from "../../../../../../lib/realtime/coating/alert";
import { Grid } from "@mui/material";

const columnReplacements = {
  d800: "1D1Z Temp",
  d802: "1D2Z Temp",
  d804: "2D1Z Temp",
  d806: "2D2Z Temp",
  d808: "3D1Z Temp",
  d810: "3D2Z Temp",
  d812: "4D1Z Temp",
  d814: "4D2Z Temp",
  d816: "4D3Z Temp",
  f2u: "2U Density",
};

const ChipAlert = ({ id, handleAlert }) => {
  const { alert } = useContext(AlertContext);
  const result = useMemo(() => findDifferentColumns(alert), [alert]);

  useEffect(() => {
    handleAlert(alert)
  }, [alert])

  function findDifferentColumns(alert) {
    const differentColumns = {};
    // Iterate through the keys in alert
    for (const key in alert) {
      if (key !== "id" && Object.prototype.hasOwnProperty.call(alert, key)) {
        if (alert[key] === true) {
          // Check if the value is true
          differentColumns[key] = {
            latestCode: alert[key].toString(), // Convert boolean to string for label
          };
        }
      }
    }
    return differentColumns;
  }

  return (
    <MDBox>
        <Grid container direction="row" spacing={1}>
          {Object.entries(result).map(([key, value]) => (
            <Grid item xs={6} sm={3} md={2} lg={2} xl={2} key={key}>
              {id !== 0 && (
                <>
                  <Stack direction="row">
                    <Chip
                      label={`Out of Range ${
                        columnReplacements[key]?.split(":")[1] ||
                        key.substring(1)
                      }`}
                      icon={
                        value.latestCode === "true" ? (
                          <ClearIcon />
                        ) : (
                          <CheckIcon />
                        )
                      }
                      color={value.latestCode === "true" ? "error" : "warning"}
                      variant="outlined"
                    />
                  </Stack>
                </>
              )}
            </Grid>
          ))}
        </Grid>
    </MDBox>
  );
};

export default ChipAlert;
