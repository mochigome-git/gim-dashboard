import React from "react";

// @mui material components
import { Grid, Card, Divider } from "@mui/material";

// Material Dashboard 2 Custom component
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React context
//import { useMaterialUIController } from "../../../../context";

function Tables({ data }) {
  return (
    <MDBox>
      <MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mx={0}
              mt={0}
              px={2}
              pb={-6}
              bgColor="transparent"
              borderRadius="lg"
              coloredShadow="none"
              width="100%"
            ></MDBox>
            <Card position="center" sx={{ backgroundColor: "#FFFFFF" }}>
              <MDBox>
                <Grid>
                  <MDBox pb={3}>
                    <MDBox bgColor="#dedfe3" mx={4}>
                      <MDBox pt={1} pb={2}>
                        <MDBox
                          component="ul"
                          display="flex"
                          flexDirection="column"
                          sx={{ overflow: "auto" }}
                        >
                          <Grid container wrap="nowrap">
                            <Grid
                              item
                              xs={0.3}
                              sm={6}
                              md={0.3}
                              ml={2}
                              zeroMinWidth
                            >
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                #
                              </MDTypography>
                            </Grid>
                            <Grid item xs={3} sm={6} md={5.2}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Description
                              </MDTypography>
                            </Grid>
                            <Grid item xs={3} sm={6} md={2}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Section
                              </MDTypography>
                            </Grid>
                            <Grid item xs={1} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Qty
                              </MDTypography>
                            </Grid>
                            <Grid item xs={2} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                U.Price
                              </MDTypography>
                            </Grid>
                            <Grid item xs={1} sm={6} md={1.5}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Total
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                    <MDBox id="footer-content">
                      <MDBox mx={4} pt={1} pb={2}>
                        <MDBox
                          component="ul"
                          display="flex"
                          flexDirection="column"
                        >
                          {data[0].description.map((item, index) => (
                            <Grid container key={index}>
                              <Grid item xs={0.3} sm={6} md={0.3} ml={2}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {index === 0 ? 1 : index + 1}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3} sm={6} md={5.2}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.description}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3} sm={6} md={2}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.section}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={1} sm={6} md={1}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.quantity}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={2} sm={6} md={1}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: `${data[0].currency}`,
                                  })}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={1} sm={6} md={1.5}>
                                <MDTypography
                                  variant="button"
                                  color="#FFFFFF"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.total.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: `${data[0].currency}`,
                                  })}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          ))}
                        </MDBox>
                        <Divider />
                      </MDBox>
                      <MDBox mx={4} pt={1} pb={2}>
                        <MDBox
                          component="ul"
                          display="flex"
                          flexDirection="column"
                        >
                          <Grid container>
                            <Grid item xs={12} sm={6} md={9.0}></Grid>
                            <Grid item xs={12} sm={6} md={1.2}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Subtotal
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1.5}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {data[0].subtotal.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: `${data[0].currency}`,
                                })}
                              </MDTypography>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} md={9}></Grid>
                            <Grid item xs={12} sm={6} md={1.2}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Discount
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1.5}>
                              <MDTypography
                                variant="button"
                                color="error"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {data[0].discount !== null &&
                                  data[0].discount !== 0
                                  ? "-" +
                                  data[0].discount.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: data[0].currency,
                                  })
                                  : "-"}
                              </MDTypography>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} md={9}></Grid>
                            <Grid item xs={12} sm={6} md={1.2}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Tax
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1.5}>
                              <MDTypography
                                variant="button"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {data[0].tax.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: `${data[0].currency}`,
                                })}
                              </MDTypography>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} md={9}></Grid>
                            <Grid item xs={12} sm={6} md={1.2}>
                              <MDTypography
                                variant="h6"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Total
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1.5}>
                              <MDTypography
                                variant="h6"
                                color="#FFFFFF"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {data[0].grandtotal.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: `${data[0].currency}`,
                                })}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default React.memo(Tables);
