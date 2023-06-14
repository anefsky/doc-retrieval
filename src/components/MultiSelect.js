import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MultiSelect(props) {
  const { itemsMap, initSelections, update } = props;
  const [selections, setSelections] = React.useState(initSelections);

  const handleChange = (event) => {
    setSelections(event.target.value);    
    update(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 310 }} size="small">
        <Select
          id="multiSelect"
          multiple
          value={selections}
          onChange={handleChange}
        >
          {Object.keys(itemsMap).map(key => (
            <MenuItem
              key={key}
              value={key}
            >
              {itemsMap[key]}  
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}