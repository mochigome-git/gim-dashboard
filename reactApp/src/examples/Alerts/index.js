import React, { useEffect, useRef } from "react";
import MDSnackbar from "../../components/MDSnackbar";
import CircleIcon from "@mui/icons-material/Circle";
import Zoom from "@mui/material/Zoom";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorIcon from "@mui/icons-material/Error";
import MDBox from "../../components/MDBox";

import alarmSound from '../../assets/sounds/alarm-no3-14864.mp3'
import errorSound from '../../assets/sounds/system-error-notice-132470.mp3'

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

export const ErrorSnackbar = ({ state, onClose, close, errorTitle, errors, silent }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (state === true) {
      // Ensure that the audio is loaded and ready to play
      audioRef.current.load();
  
      // Play the audio after a short delay to ensure it's loaded
      setTimeout(() => {
        if (!silent) {
          audioRef.current.play().catch(error => {
            // Handle playback error (e.g., autoplay restrictions)
            console.error('Error playing audio:', error);
          });
          audioRef.current.loop = false;
        } else {
          // If silent is true, set the loop attribute to make the audio loop
          audioRef.current.loop = true;
          audioRef.current.play().catch(error => {
            // Handle playback error (e.g., autoplay restrictions)
            console.error('Error playing audio:', error);
          });
        }
      }, 100);
    } else {
      // Stop the audio when the Snackbar is closed
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // Reset the loop attribute when the audio stops
      audioRef.current.loop = false;
    }
  }, [state, silent]);
  

  return (
    <>
    <audio ref={audioRef} src={silent === true ? alarmSound : errorSound} preload="auto" loop></audio>
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
  </>
  );
};

export const DeleteSnackbar = ({ state, onClose, close }) => {
  return (
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

export const InsertSnackbar = ({ state, onClose, close }) => {
  return (
    <MDSnackbar
      color="success"
      inlineColor="white"
      icon={<CircleIcon fontSize="medium" />}
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
