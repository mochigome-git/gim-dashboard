// TriggerSwitch.js
import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Switch,
  Stack,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import MDBox from '../../../../../../components/MDBox';
import MDTypography from '../../../../../../components/MDTypography';
import MDButton from '../../../../../../components/MDButton';

function TriggerSwitch({ modalDescription }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    [modalDescription.label1]: false,
    [modalDescription.label2]: false,
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormControl component="fieldset" variant="standard">
        <MDTypography pt={1} variant="button" color="text2">
          <MDButton variant="text" onClick={handleOpen}>
            {modalDescription.main}
          </MDButton>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <MDBox
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: '#121212',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <MDTypography id="transition-modal-title" variant="button">
                  {modalDescription.title}
                </MDTypography>
                <MDTypography variant="subtitle2" id="transition-modal-description" sx={{ mt: 2 }}>
                  {modalDescription.subtitle}
                </MDTypography>
                <MDTypography variant="subtitle2" id="transition-modal-description" sx={{ mt: 2 }}>
                  {modalDescription.subtitle2}
                </MDTypography>
              </MDBox>
            </Fade>
          </Modal>
        </MDTypography>
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={
              <Switch
                value={!!state[modalDescription.label1]} 
                onChange={handleChange}
                name={modalDescription.label1}
              />
            }
            label={modalDescription.label1}
          />
          <FormControlLabel
            control={
              <Switch
                value={!!state[modalDescription.label2]} 
                onChange={handleChange}
                name={modalDescription.label2}
              />
            }
            label={modalDescription.label2}
          />
        </Stack>

      </FormControl>
    </>
  );
};

export default TriggerSwitch;
