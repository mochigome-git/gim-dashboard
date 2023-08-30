import { Switch } from "@mui/material";
import { darken, alpha } from '@mui/material/styles';
import { Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

// Material Dashboard 2 React components
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

export default function EnhancedTableToolbar(props) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { numSelected, onDownload, setLoading, setSuccess, success, loading, everyFiveMinutes, handleFiveMinutesChange } = props;
    const getTooltipTitle = () => {
      return everyFiveMinutes ? '5min on' : '5min off';
    };
   
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
            darkMode ? darken(theme.palette.black.main, theme.palette.action.activatedOpacity) : 
                       alpha(theme.palette.info.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <MDTypography 
            sx={{ flex: '1 1 100%' }}
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </MDTypography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            />
        )}

        {numSelected > 0 ? (
          <Tooltip title={getTooltipTitle()}>
            <Switch
              checked={everyFiveMinutes}
              onChange={handleFiveMinutesChange}
              color= "default"
            />
          </Tooltip>
        ) : (        
          <IconButton/>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Print">
            <IconButton>
              <PrintIcon color={darkMode ? "white" : "dark"} />
            </IconButton>
          </Tooltip>
        ) : (        
          <IconButton/>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Donwload CSV">
             <IconButton sx={{...(success 
              && {bgcolor: green[500],'&:hover': {bgcolor: green[700],},}),}} 
              onClick={() => {
                onDownload(); 
                setLoading(); 
                setSuccess();
                }}>
             {success ? (
                <CheckIcon color={darkMode ? 'white' : 'dark'} />
              ) : loading ? (
              <>
                <SaveIcon sx={{marginRight: '-32px'}} color={darkMode ? "white" : "dark"} />
                <CircularProgress size={41} sx={{ color: green[500] }} />
              </>
              ) : (
                <SaveIcon color={darkMode ? 'white' : 'dark'} />
              )}
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon color={darkMode ? "white" : "dark"} />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }