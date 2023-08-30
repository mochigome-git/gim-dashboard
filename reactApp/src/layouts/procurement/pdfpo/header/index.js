import React from "react";
import { Grid, Stack } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

function TableHeader({ data, from, to, miniSidenav }) {
  function ContactInfo({ title, contact }) {
    return (
      <MDBox pt={1} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <MDTypography variant="caption" fontWeight="medium" color="#FFFFFF">
            {title}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium" color="#FFFFFF">
            {contact.attn || null}
          </MDTypography>
          <MDTypography variant="caption" color="highlight">
            {contact.company_name ?? ""}
          </MDTypography>
          <MDTypography variant="caption" color="#FFFFFF">
            {contact.address_1 ?? ""}
            {contact.address_2 ?? ""}
          </MDTypography>
          <MDTypography variant="caption" color="#FFFFFF">
            {`Phone : ${contact.tel_1.substr(0, 2) ?? ""} `}
            {`${contact.tel_1.substr(2, 4) ?? ""} `}
            {`${contact.tel_1.substr(6, 4) ?? ""} `}
            {contact.tel_2?.length > 8 ? (
              <>
                {`/ Phone2 : ${contact.tel_2.substr(0, 3) ?? ""} `}
                {`${contact.tel_2.substr(3, 3) ?? ""} `}
                {`${contact.tel_2.substr(6, 4) ?? ""}`}
              </>
            ) : contact.tel_2?.length > 9 ? (
              <>
                {`/ Phone2 : ${contact.tel_2.substr(0, 2) ?? ""}`}
                {`${contact.tel_2.substr(2, 4) ?? ""}`}
                {`${contact.tel_2.substr(6, 4) ?? ""}`}
              </>
            ) : contact.tel_2?.length === 4 ? (
              <>{`/ ${contact.tel_2 ?? ""}`}</>
            ) : (
              <>{`${contact.tel_2 ?? ""}`}</>
            )}
          </MDTypography>
          <MDTypography variant="caption" color="#FFFFFF">
            {`Fax : ${contact.fax?.substr(0, 2) ?? ""}`}{" "}
            {`${contact.fax?.substr(2, 4) ?? ""}`}{" "}
            {`${contact.fax?.substr(6, 4) ?? ""}`}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }
  return (
    <MDBox id="header-content" p={3}>
      <MDTypography mx={2} variant="h5" fontWeight="medium" color="#FFFFFF">
        PO No: {data[0].lot_number}
      </MDTypography>
      <Grid sx={{ flexGrow: 1 }} container spacing={0}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" spacing={0}>
            <Grid item xs={16} sm={16} md={miniSidenav ? 16 : 5.7}>
              <MDBox>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="space-between"
                ></Stack>
                <ContactInfo title="From:" contact={from[0]} />
                <MDTypography
                  mx={2}
                  variant="caption"
                  fontWeight="medium"
                  color="#FFFFFF"
                >
                  Date Issued : {data[0].issued_date}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={16} sm={16} md={miniSidenav ? 16 : 5.7}>
              <MDBox>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="space-between"
                ></Stack>
                <ContactInfo title="To:" contact={to[0]} />
                <MDTypography
                  mx={2}
                  variant="caption"
                  fontWeight="medium"
                  color="#FFFFFF"
                >
                  Delivery Date : {data[0].due_date}
                </MDTypography>
              </MDBox>
            </Grid>
            <MDBox>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <MDTypography
                  mx={2}
                  variant="caption"
                  fontWeight="medium"
                  color="#FFFFFF"
                >
                  Payment Term : 30Days
                </MDTypography>
              </Stack>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default TableHeader;
