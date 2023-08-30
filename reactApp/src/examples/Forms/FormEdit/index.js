import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DialogSelect from '../../Dialogs/DialogsButton';
import Stack from '@mui/material/Stack';

function FormEdit({ 
  title, 
  onDetailsTabClick, 
  list, 
  listType, 
  usedDefault, 
  error, 
  errorMessage,
  viewMode,
}) {
  return (
    <MDBox>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="space-between">
        <MDTypography variant="h7" fontWeight="medium" color="text">
          {title}
        </MDTypography>
        <MDBox mt={-1}>
        {viewMode? null : 
          <DialogSelect
            icon={<EditIcon />}
            title="Vendors"
            onDetailsTabClick={onDetailsTabClick}
            listType={listType}
            usedDefault={usedDefault}
          />}
        </MDBox>
      </Stack>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" width="100%">
        <MDTypography variant="button" fontWeight="medium">
          {list?.attn?? ""}
          {list?.attn === undefined && error? 
          <MDTypography color="error" variant="button" fontWeight="light">
            {errorMessage}        
          </MDTypography> : null}
        </MDTypography>
        <MDTypography variant="caption" color="highlight">
          {list?.company_name?? ""}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {list?.address_1?? ''}{list?.address_2?? ''}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {`${list?.tel_1.substr(0, 2) ?? ""} `}
          {`${list?.tel_1.substr(2, 4) ?? ""} `}
          {`${list?.tel_1.substr(6, 4) ?? ""} `}
          {list?.tel_2?.length > 8 ? (
            <>
              {`/ ${list?.tel_2.substr(0, 3) ?? ""} `}
              {`${list?.tel_2.substr(3, 3) ?? ""} `}
              {`${list?.tel_2.substr(6, 4) ?? ""}`}
            </>
          ) : list?.tel_2?.length > 9 ? (
            <>
              {`/ ${list?.tel_2.substr(0, 2) ?? ""}`}
              {`${list?.tel_2.substr(2, 4) ?? ""}`}
              {`${list?.tel_2.substr(6, 4) ?? ""}`}
            </>
          ) : list?.tel_2?.length === 4 ? (
            <>{`/ ${list?.tel_2?? ""}`}</>
          ) : (
            <>{`${list?.tel_2?? ""}`}</>
          )}
        </MDTypography>
        <MDTypography variant="caption" color="text">
        {`${list?.fax?.substr(0, 2)?? ""}`} {`${list?.fax?.substr(2, 4)?? ""}`} {`${list?.fax?.substr(6, 4)?? ""}`} 
        </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default FormEdit;
