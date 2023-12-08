// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDAvatar from "../../../../components/MDAvatar";
import MDBadge from "../../../../components/MDBadge";

import { useContext } from "react";
import { DailyContext } from "../../../../lib/realtime";

import { hashCode } from "../utility";

export default function POIndexTableData() {
  const { po_vendor, po_data } = useContext(DailyContext);
  const allCount = po_data?.length;
  const draftCount = po_data.filter((item) => item.status === "Darft").length;
  const paidCount = po_data.filter((item) => item.status === "Paid").length;
  const pendingCount = po_data.filter(
    (item) => item.status === "Pending"
  ).length;
  const overdueCount = po_data.filter(
    (item) => item.status === "Overdue"
  ).length;
  const findCompanyNameById = (id) => {
    const vendor = po_vendor.find((item) => item.id === id);
    return vendor ? vendor : "N/A";
  };

  const Company = ({ lot, id }) => {
    const vendorDetials = findCompanyNameById(id);
    const initials = vendorDetials.company_name
      ? vendorDetials.company_name.charAt(0)
      : "";
    const colors = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
    ];
    const idHash = hashCode(id);
    const selectedColor = colors[idHash % colors.length];
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar bgColor={selectedColor} size="sm">
          {initials}
        </MDAvatar>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {vendorDetials.company_name || ""}
          </MDTypography>
          <MDTypography
            display="block"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {lot}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  };

  const DateTime = ({ date, time }) => {
    const dateObj = new Date(time ?? null);
    const formattedTime = time
      ? dateObj.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : null;
    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date || ""}
        </MDTypography>
        <MDTypography
          display="block"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {formattedTime || ""}
        </MDTypography>
      </MDBox>
    );
  };

  const Price = ({ price, currency }) => {
    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {currency} {price}
        </MDTypography>
      </MDBox>
    );
  };

  const Section = ({ section }) => {
    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {section}
        </MDTypography>
      </MDBox>
    );
  };

  const Description = ({ description }) => {
    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {description}
        </MDTypography>
      </MDBox>
    );
  };

  const Status = ({ status }) => {
    const colorMap = [
      {
        color: "info",
        label: "Darft",
      },
      {
        color: "warning",
        label: "Pending",
      },
      {
        color: "error",
        label: "Overdue",
      },
      {
        color: "success",
        label: "Paid",
      },
    ];
    // Find the corresponding statusItem in colorMap based on the provided status
    const statusItem = colorMap.find((item) => item.label === status);
    if (!statusItem) {
      return null; // Handle the case where status is not found in colorMap
    }
    return (
      <MDBox ml={1}>
        <MDBadge
          badgeContent={statusItem.label}
          color={statusItem.color}
          variant="contained"
          size="sm"
        />
      </MDBox>
    );
  };

  const columns = [
    { Header: "Vendor", accessor: "vendor", align: "left" },
    { Header: "Section", accessor: "section", align: "left" },
    { Header: "Create Date", accessor: "date", align: "left" },
    { Header: "Delivery Date", accessor: "dueDate", align: "left" },
    { Header: "Amount", accessor: "amount", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Description", accessor: "description", align: "right" },
  ];

  const rows = po_data.map((dataItem) => {
    // Find the sectionObject for the current dataItem
    const sectionObject = dataItem.description.find((item) => item.section);
    const sectionDescriptions = dataItem.description.find(
      (item) => item.description
    );

    return {
      vendor: <Company lot={dataItem.lot_number} id={dataItem.to} />,
      section: sectionObject ? (
        <Section section={sectionObject.section} />
      ) : null,
      date: (
        <DateTime
          date={dataItem.created_at.substr(0, 10)}
          time={dataItem.created_at}
        />
      ),
      dueDate: <DateTime date={dataItem.due_date} />,
      amount: (
        <Price price={dataItem.grandtotal} currency={dataItem.currency} />
      ),
      status: <Status status={dataItem.status} />,
      description: sectionDescriptions ? (
        <Description description={sectionDescriptions.description} />
      ) : null,
    };
  });

  return {
    columns,
    rows,
    allCount,
    draftCount,
    paidCount,
    pendingCount,
    overdueCount,
  };
}
