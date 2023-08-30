import React from "react";

// @mui material components
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";

// Material Dashboard 2 React example components
import DetailsForm from "../../../../examples/Forms/FormMenu/DetailsFormEdituse";

const MemoizedDetailsForm = React.memo(DetailsForm);

export default function DetailsSection({
  detailsForms,
  handleDetailsFormData,
  dropDetailsForm,
  error,
  data,
}) {
  return (
    <>
      {detailsForms.map((_, index) => (
        <MDBox pt={1} key={index}>
          <MDBox component="ul" display="flex" flexDirection="column">
            <MemoizedDetailsForm
              onDataUpdate={(
                description,
                section,
                machine,
                quantity,
                unit,
                price,
                total
              ) =>
                handleDetailsFormData(
                  index,
                  description,
                  section,
                  machine,
                  quantity,
                  unit,
                  price,
                  total
                )
              }
              index={index}
              error={error}
              data={data}
            />
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={{ xs: 4, sm: 6, md: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
            mr={{ xs: 0, sm: 5, md: 0 }}
          >
            <MDButton
              variant="text"
              color="error"
              onClick={() => {
                dropDetailsForm(index);
              }}
            >
              <DeleteIcon />
              &nbsp;Remove
            </MDButton>
          </MDBox>
          <Divider
            orientation="horizontal"
            variant="middle"
            sx={{ height: "100%", borderStyle: "dashed" }}
          />
        </MDBox>
      ))}
    </>
  );
}
