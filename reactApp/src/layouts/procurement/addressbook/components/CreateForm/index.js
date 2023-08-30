import React, { useContext, useEffect, useState } from 'react';
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDProgress from "../../../../../components/MDProgress";
import Form from "../../../../../examples/Forms/FormVendor";
import { DailyContext } from "../../../../../lib/realtime"
import { useMaterialUIController } from "../../../../../context";

function CreateForm() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
  

  return (
    <MDBox>
      <MDBox pt={3} px={2} mb={-2}>
        <MDTypography variant="h7" fontWeight="medium" color="text">
          Create:
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={0}
      >
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Form
            company=""
            attn=""
            address_1=""
            address_2=""
            fax=""
            tel_1=""
            tel_2=""
            currency=""
            id=""
            createform={true}
          />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default CreateForm;
