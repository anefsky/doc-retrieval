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
import ProgressWidget from './ProgressWidget';
import Tooltip from '@mui/material/Tooltip';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import RfpContext from '../shared/RfpContext';
import { Link } from 'react-router-dom';

function createData(_id, name, date_issued, date_due, volumes) {
  return {
    _id,
    name,
    date_issued,
    date_due,
    volumes
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(RfpContext);

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
          {row.name}
        </TableCell>
        <TableCell>{row.date_issued}</TableCell>
        <TableCell>{row.date_due}</TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton onClick={() => context.editItem(row._id)}>
              <BorderColorTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Responses">
            <Link to={`/responses_page/${row.name}`}>
              <IconButton>
                <LibraryBooksTwoToneIcon  fontSize="small" />
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
                    <TableCell sx={{ width: 150 }}>Assigned To</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.volumes.map((volume) => (
                    <TableRow sx={{ '& > *': { backgroundColor: 'whitesmoke' }}} key={volume.type}>
                      <TableCell component="th" scope="row">{volume.type}</TableCell>
                      <TableCell>
                        {`${volume.assigned_to.length ? (volume.assigned_to.length === 1 ?  context.peopleMap[volume.assigned_to[0]] : 
                            context.peopleMap[volume.assigned_to[0]] + ' +' + (volume.assigned_to.length - 1) ) : '' }`}
                      </TableCell>
                      <TableCell><ProgressWidget level={volume.progress}/></TableCell>
                      <TableCell align="right" sx={{ width: 50 }}>{volume.sharepoint_link && <a  href={volume.sharepoint_link} className="sharepoint-link">
                        <Tooltip title="Sharepoint link"><IconButton><OpenInNewTwoToneIcon  fontSize="small" /></IconButton></Tooltip></a>}
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
    createData(row._id, row.name, row.date_issued, row.date_due, row.volumes)
  );
}

export default function RfpInboxTable({data}) {

  const rows = createRows(data);
   
  return (
    <div className="rfp-inbox-table">
      <TableContainer component={Paper}>
        <Table size="small" sx={{ width: 600 }}>
          <TableHead>
            <TableRow sx={{'& > *': { fontStyle: 'italic' }}}>
              <TableCell />
              <TableCell>Document Name</TableCell>
              <TableCell>Date Issued</TableCell>
              <TableCell>Date Due</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
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