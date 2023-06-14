import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import FormResponsesCreate from './FormResponsesCreate';

export default function DialogRFPCreate(props) {
  const { onClose, open } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onClose();
    setValue(0);
  };

  return (
    <Dialog onClose={handleClose} 
      open={open} 
      className="dialog-rfp-create"
    >
      <Box sx={{ width: '100%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value={0} label="Overview" />
          <Tab value={1} label="Technical" />
          <Tab value={2} label="Management" />
        </Tabs>
      </Box>
      <Box sx={{ height: 500 }}>
        <FormResponsesCreate 
          tabIdx={value} 
          handleClose={handleClose}
        />
      </Box>
    </Dialog>
  );
}
