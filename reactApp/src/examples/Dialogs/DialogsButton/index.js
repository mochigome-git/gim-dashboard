import React, { useState, useEffect, useCallback } from "react";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";
import ButtonList from "../../../examples/Lists/ButtonList";
import ProfilesListData from "../../../layouts/procurement/addressbook/data/profilesListData";
import { useMaterialUIController } from "../../../context";

export default function DialogSelect({
  icon,
  title,
  onDetailsTabClick,
  listType,
  usedDefault,
  data,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const { dataPoints } = ProfilesListData();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const defaultSelectedProfile = {
    attn: "GIM",
    company_name: "General Imaging (M) Sdn Bhd",
  };
  const handleSearchChange = useCallback((event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  }, []);

  const handleClick = useCallback(
    (company_name) => {
      onDetailsTabClick(listType, company_name);
      handleClose();
    },
    [handleClose, listType, onDetailsTabClick]
  );

  useEffect(() => {
    if (data && data[0] && data[0].company_name !== undefined) {
      if (listType === "FROM") {
        onDetailsTabClick(listType, data[0].company_name);
      }
      if (listType === "TO") {
        const timerId = setTimeout(() => {
          onDetailsTabClick(listType, data[0].company_name);
        }, 800);

        return () => clearTimeout(timerId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBox>
      <MDButton
        aria-label="edit"
        variant="text"
        iconOnly={true}
        circular={true}
        size="large"
        color={darkMode ? "white" : "dark"}
        onClick={handleClickOpen}
      >
        {icon}
      </MDButton>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(2px) sepia(5%)" }}
      >
        <Card>
          <DialogTitle>{title}</DialogTitle>
          <MDBox pt={2} mx={2} mr={4}>
            <MDInput
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search vendor..."
              fullWidth
              sx={{
                m: 1,
                "& input::placeholder": {
                  color: "black",
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon fontSize="medium" />,
              }}
            />
          </MDBox>
          <DialogContent>
            <ButtonList
              profiles={dataPoints}
              shadow={false}
              search={usedDefault ? "GIM" : searchTerm}
              listType={listType}
              usedDefault={usedDefault}
              defaultSelectedProfile={
                usedDefault ? defaultSelectedProfile : null
              }
              onEdit={(type, company_name) => handleClick(company_name)}
            />
          </DialogContent>
          <DialogActions>
            <MDButton color="black" onClick={handleClose}>
              Cancel
            </MDButton>
            <MDButton
              color="black"
              onClick={() => handleClick(defaultSelectedProfile.company_name)}
            >
              Ok
            </MDButton>
          </DialogActions>
        </Card>
      </Dialog>
    </MDBox>
  );
}
