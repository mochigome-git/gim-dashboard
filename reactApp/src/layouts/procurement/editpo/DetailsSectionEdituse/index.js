import React, { useEffect, useState } from "react";

// @mui material components
import { Divider, Card, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDProgress from "../../../../components/MDProgress";
import { useMaterialUIController } from "../../../../context";

// Material Dashboard 2 React example components
import DetailsForm from "../../../../examples/Forms/FormMenu/DetailsFormEdituse";

export default function DetailsSection({
  detailsForms,
  handleDetailsFormData,
  dropDetailsForm,
  error,
  data,
}) {
  const [dataLength, setDataLength] = useState(0);
  const [loadedData, setLoadedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 90
      );
    }, 300);

    if (data && data[0] && data[0].description) {
      setDataLength(data[0].description.length);
      setLoadedData(data[0]);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
    }

    return () => {
      clearInterval(timer);
    };
  }, [data]);

  const formsToRender = Math.max(dataLength, detailsForms.length);
  return (
    <>
      {isLoading ? (
        <MDBox mt={10}>
          <Card mt={10} sx={{ height: "5vw" }}>
            <MDBox component="ul" pt={-10} mx={10}>
              <MDProgress value={progress} color="white" />
            </MDBox>
          </Card>
        </MDBox>
      ) : (
        [...Array(formsToRender)].map((_, index) => {
          const description = loadedData?.description[index] || "";

          return (
            <MDBox pt={1} key={index}>
              <MDBox component="ul" display="flex" flexDirection="column">
                <DetailsForm
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
                  description={description}
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
          );
        })
      )}
    </>
  );
}
