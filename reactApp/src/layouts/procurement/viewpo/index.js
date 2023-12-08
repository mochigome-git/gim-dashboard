import React from "react";

// @mui material components
import { Grid, Card, Stack, Divider } from "@mui/material";

// Material Dashboard 2 Custom component
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../context";

function Tables({ data, to, from }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;

  function ContactInfo({ title, contact }) {
    return (
      <MDBox pt={1} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <MDTypography variant="caption" fontWeight="medium">
            {title}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium">
            {contact.attn || null}
          </MDTypography>
          <MDTypography variant="caption" color="highlight">
            {contact.company_name ?? ""}
          </MDTypography>
          <MDTypography variant="caption">
            {contact.address_1 ?? ""}
            {contact.address_2 ?? ""}
          </MDTypography>
          <MDTypography variant="caption">
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
          <MDTypography variant="caption">
            {`Fax : ${contact.fax?.substr(0, 2) ?? ""}`}{" "}
            {`${contact.fax?.substr(2, 4) ?? ""}`}{" "}
            {`${contact.fax?.substr(6, 4) ?? ""}`}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }

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
            <Card position="center">
              <MDBox>
                <Grid>
                  <MDBox p={3}>
                    <MDTypography mx={2} variant="h5" fontWeight="medium">
                      {data[0].lot_number}
                    </MDTypography>
                    <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          justifyContent="space-between"
                          spacing={0}
                        >
                          <Grid
                            item
                            xs={16}
                            sm={16}
                            md={miniSidenav ? 16 : 5.7}
                          >
                            <MDBox>
                              <Stack
                                spacing={{ xs: 1, sm: 2 }}
                                direction="row"
                                flexWrap="wrap"
                                justifyContent="space-between"
                              ></Stack>
                              <ContactInfo
                                title="Purchase Order From"
                                contact={from[0]}
                              />
                              <MDTypography
                                mx={2}
                                variant="caption"
                                fontWeight="medium"
                              >
                                Date Create : {data[0].issued_date}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                          <Grid
                            item
                            xs={16}
                            sm={16}
                            md={miniSidenav ? 16 : 5.7}
                          >
                            <MDBox>
                              <Stack
                                spacing={{ xs: 1, sm: 2 }}
                                direction="row"
                                flexWrap="wrap"
                                justifyContent="space-between"
                              ></Stack>
                              <ContactInfo
                                title="Purchase Order To"
                                contact={to[0]}
                              />
                              <MDTypography
                                mx={2}
                                variant="caption"
                                fontWeight="medium"
                              >
                                Due Date : {data[0].due_date}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <MDBox pb={3}>
                    <MDBox bgColor="card2" mx={4}>
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
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                #
                              </MDTypography>
                            </Grid>
                            <Grid item xs={3} sm={6} md={6.5}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Description
                              </MDTypography>
                            </Grid>
                            <Grid item xs={3} sm={6} md={2}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Section
                              </MDTypography>
                            </Grid>
                            <Grid item xs={1} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Qty
                              </MDTypography>
                            </Grid>
                            <Grid item xs={2} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Unit Price
                              </MDTypography>
                            </Grid>
                            <Grid item xs={1} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
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
                    <MDBox>
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
                                  color="text"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {index === 0 ? 1 : index + 1}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3} sm={6} md={6.5}>
                                <MDTypography
                                  variant="button"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.description}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3} sm={6} md={2}>
                                <MDTypography
                                  variant="button"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.section}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={1} sm={6} md={1}>
                                <MDTypography
                                  variant="button"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.quantity}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={2} sm={6} md={1}>
                                <MDTypography
                                  variant="button"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                >
                                  {item.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: `${data[0].currency}`,
                                  })}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={1} sm={6} md={1}>
                                <MDTypography
                                  variant="button"
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
                            <Grid item xs={12} sm={6} md={9.8}></Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Subtotal
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="button"
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
                            <Grid item xs={12} sm={6} md={9.8}></Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Discount
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
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
                            <Grid item xs={12} sm={6} md={9.8}></Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Tax
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="button"
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
                            <Grid item xs={12} sm={6} md={9.8}></Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="h6"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                Total
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
                              <MDTypography
                                variant="h6"
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
