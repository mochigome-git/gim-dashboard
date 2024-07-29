import React, { useContext, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AlertContext } from '../../../../../../lib/realtime/coating/alert';

const ModelMenu = ({ id, tableName, tableName2U, setModel, setErrorAlert, onchange }) => {
  const { setSettingId, menu } = useContext(AlertContext);
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    setSettingId(0, tableName, tableName2U);

    if (onchange === 'nk2' || onchange === 'nk3') {
      setSelectedValue(0);
      setModel(0); // Assuming you want to set the model to 0 as well
    }
  }, [onchange]);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Model</InputLabel>
        <Select
          value={id !== undefined ? id : selectedValue}
          label="Model"
          onChange={(event) => {
            setSelectedValue(event.target.value);
            setSettingId(event.target.value, tableName, tableName2U);
            setModel(event.target.value);
            setErrorAlert(false);
          }}>
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          {menu?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.model_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ModelMenu;
