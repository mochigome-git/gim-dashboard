import React, { useContext, useEffect, useState } from 'react';
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDProgress from "../../../../../components/MDProgress";
import Form from "../../../../../examples/Forms/FormVendor";
import { DailyContext } from "../../../../../lib/realtime"
import { useMaterialUIController } from "../../../../../context";
//import EditSkeleton from "./EditSkeleton"

function EditForm() {
    const { po } = useContext(DailyContext);
    const [delayedData, setDelayedData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
  
    useEffect(() => {
        const timer = setTimeout(() => {
          setDelayedData(po.editVendor[0]);
        }, 300);
    
        return () => clearTimeout(timer);
      }, [po.editVendor]);
    
      useEffect(() => {
        const startTime = Date.now();
    
        const updateProgress = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const calculatedProgress = (elapsed / 200) * 100;
    
          setProgress(calculatedProgress);
    
          if (calculatedProgress < 100) {
            requestAnimationFrame(updateProgress);
          }
        };
    
        const animationFrame = requestAnimationFrame(updateProgress);
    
        return () => cancelAnimationFrame(animationFrame);
      }, []);

  if (!delayedData) {
    return (
        <MDBox sx={{ width: '100%' }}>
          <MDBox>
            <MDBox pt={1} pb={2} px={0}>
                <MDBox position="relative" component="ul" display="flex" flexDirection="column" p={0} m={0}>
                <MDProgress value={progress} color={darkMode? "white": "dark"} />
                </MDBox>
            </MDBox>
            </MDBox>
        </MDBox>
    );
  }

  return (
    <MDBox>
      <MDBox pt={3} px={2} mb={-2}>
        <MDTypography variant="h7" fontWeight="medium" color="text">
          Edit:
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={0}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Form
            company={delayedData.company_name}
            attn={delayedData.attn}
            address_1={delayedData.address_1}
            address_2={delayedData.address_2}
            fax={delayedData.fax}
            tel_1={delayedData.tel_1}
            tel_2={delayedData.tel_2}
            currency={delayedData.currency}
            id={delayedData.id}
          />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default EditForm;
