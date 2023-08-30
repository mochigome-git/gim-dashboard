import React from "react";
import MDSnackbar from "../../components/MDSnackbar";
import CircleIcon from "@mui/icons-material/Circle";
import Zoom from "@mui/material/Zoom";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorIcon from "@mui/icons-material/Error";
import MDBox from "../../components/MDBox";

export const SuccessSnackbar = ({ state, onClose, close }) => {
  return (
    <MDSnackbar
      color="success"
      inlineColor="white"
      icon={<CircleIcon fontSize="medium" />}
      icon2={
        <MDBox sx={{ display: "flex" }}>
          <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
            <CheckIcon />
          </Zoom>
        </MDBox>
      }
      title="Update Successful"
      content="disable"
      content2="disable"
      dateTime="disable"
      open={state}
      onClose={onClose}
      close={close}
      bgWhite
    />
  );
};

export const ErrorSnackbar = ({ state, onClose, close, errorTitle, errors }) => {
  return (
    <MDSnackbar
      color="error"
      inlineColor="error"
      icon="disable"
      icon2={
        <MDBox sx={{ display: "flex" }}>
          <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
            <ErrorIcon />
          </Zoom>
        </MDBox>
      }
      title={errorTitle}
      content={errors}
      content2="disable"
      dateTime="disable"
      open={state}
      onClose={onClose}
      close={close}
      bgWhite
    />
  );
};

export const DeleteSnackbar = ({state, onClose, close }) => {
  return(
    <MDSnackbar
    color="error"
    inlineColor="error"
    icon="disable"
    icon2={
      <MDBox sx={{ display: 'flex' }}>
        <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
          <DeleteForeverIcon />
        </Zoom >
      </MDBox>
    }
    title="Delete Successful"
    content="disable"
    content2="disable"
    dateTime="disable"
    open={state}
    onClose={onClose}
    close={close}
    bgWhite
  />
  );
};

export const InsertSnackbar = ({state, onClose, close }) => {
    return(
    <MDSnackbar
      color="success"
      inlineColor="white"
      icon={<CircleIcon fontSize="medium"/>}
      icon2={
        <MDBox sx={{ display: 'flex' }}>
          <Zoom {...(true ? { timeout: 500 } : {})} in={true}>
            <CheckIcon />
          </Zoom >
        </MDBox>
      }
      title="Insert Successful"
      content="disable"
      content2="disable"
      dateTime="disable"
      open={state}
      onClose={onClose}
      close={close}
      bgWhite
    />
    );
  };
