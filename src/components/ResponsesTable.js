import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ResponsesContext from '../shared/ResponsesContext';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { Link } from 'react-router-dom';

let rfpName = '';

function createData(id, contractor, date_received, volumes) {
  return {
    id,
    contractor,
    date_received,
    volumes
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(ResponsesContext);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.contractor.name}
        </TableCell>
        {/* <TableCell>{row.date_received}</TableCell> */}
        <TableCell align="right">
          <Tooltip title="Edit">
            <IconButton onClick={() => context.editItem(row._id)}>
              <BorderColorTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pre-Process View">
            <Link to={`/pre_process_page/${rfpName}/${row.contractor.name}`}>
              <IconButton>
                <PublishedWithChangesIcon  fontSize="small" />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => context.deleteItem(row._id, row.name)}>
              <DeleteTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& > *': { fontStyle: 'italic', backgroundColor: 'whitesmoke'} }}>
                    <TableCell>Volume</TableCell>
                    <TableCell>Date Received</TableCell>
                    <TableCell align="right">Bot Score</TableCell>
                    <TableCell align="right">Human Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.volumes.map((volume) => (
                    <TableRow sx={{ '& > *': { backgroundColor: 'whitesmoke', height: 33 } }} key={volume.type}>
                      <TableCell component="th" scope="row">{volume.type}</TableCell>
                      <TableCell>{volume.date_received}</TableCell>
                      <TableCell align="right">
                        {volume.bot_score}
                      </TableCell>
                      <TableCell align="right">
                        {volume.human_score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createRows(data) {
  return data.map(row => 
    createData(row.id, row.contractor, row.date_received, row.volumes)
  );
}

export default function ResponsesTable({data, rfp_name}) {
  const rows = createRows(data);
  rfpName = rfp_name;

  return (
    <div className="rfp-inbox-table">
      <TableContainer component={Paper}>
        <Table size="small" sx={{ width: 600 }}>
          <TableHead>
            <TableRow sx={{'& > *': { fontStyle: 'italic' }}}>
              <TableCell />
              <TableCell>Contractor Name</TableCell>
              {/* <TableCell>Date Received</TableCell> */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="footer">
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
}