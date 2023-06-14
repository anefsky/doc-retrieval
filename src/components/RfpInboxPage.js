import React from 'react';
import RfpInboxTable from './RfpInboxTable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DialogRFPCreate from './DialogRFPCreate';
import { getRfps, addRfp, deleteRfp, setRfps, getPeople } from '../utils/DbUtils';
import RfpContext from '../shared/RfpContext';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDialog from './ConfirmDialog';
import { getTimeoutMs } from '../utils/GeneralUtils';

let currentRecordFocusId = '';
let currentRecordFocusName = '';

export default function RfpInboxPage() {

    const [rfpData, setRfpData] = React.useState([]);
    const [openRfpCreateDialog, setOpenRfpCreateDialog] = React.useState(false);
    const [isEditDialog, setIsEditDialog] = React.useState(false);
    const [editRfpId, setEditRfpId] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = React.useState(false);
    const [peopleData, setPeopleData] = React.useState([]);

     React.useEffect(() => {
        setIsLoading(true);
        setTimeout( () => {
            getRfps()
                .then(() => setRfpData(JSON.parse(localStorage.getItem('rfp_data'))));
            getPeople()
                .then(() => setPeopleData(JSON.parse(localStorage.getItem('people_data'))))
                .then(() => setIsLoading(false));
            }, getTimeoutMs());        
    }, []);

    const handleClickOpenDialog = () => {
        setOpenRfpCreateDialog(true);
    };
  
    const handleCloseRfpCreateDialog = (value) => {
        setIsEditDialog(false);
        setOpenRfpCreateDialog(false);
    };

    const promptForDeleteItem = (item_id, item_name) => {
        currentRecordFocusId = item_id;
        currentRecordFocusName = item_name;
        setOpenConfirmDeleteDialog(true);
    };

    const deleteItem = item_id => {
        setIsLoading(true);        
        setTimeout( () => {
            deleteRfp(item_id)
            setRfpData(JSON.parse(localStorage.getItem('rfp_data')));
            setIsLoading(false);
        }, getTimeoutMs());
    }

    const saveNewItem = rfpRecordObject => {
        setIsLoading(true);
        setTimeout( () => {
            addRfp(rfpRecordObject);
            setRfpData(JSON.parse(localStorage.getItem('rfp_data')));
            setIsLoading(false);
        }, getTimeoutMs());
    };

    const handleOpenEditDialog = (rfpId) => {
        setIsEditDialog(true);
        setEditRfpId(rfpId);
        setOpenRfpCreateDialog(true);
    }

    const replaceItem = (rfpId, rfpRecordObject) => {
        setIsLoading(true);
        setTimeout( () => {
            const storedRfpData = JSON.parse(localStorage.getItem('rfp_data'));
            const indexMatch = storedRfpData.findIndex( item => item._id === rfpId);
            const newDataToStore = [].concat(storedRfpData.slice(0, indexMatch), 
                rfpRecordObject, storedRfpData.slice(indexMatch + 1));
            setRfps(newDataToStore);
            setRfpData(JSON.parse(localStorage.getItem('rfp_data')));
            setIsLoading(false);
        }, getTimeoutMs());
    }

    const handleCloseConfirmDeleteDialog = (value) => {
        setOpenConfirmDeleteDialog(false);
    };

    const handleConfirmationDeleteDialog = () => {
        deleteItem(currentRecordFocusId);
    }

    const editItem = rfpId => {
        handleOpenEditDialog(rfpId)
    }

    const peopleMap = {};
    peopleData.forEach(person => {
        peopleMap[person.id] = person.name;
    });
     
    return (
        <RfpContext.Provider
            value={{
                deleteItem: promptForDeleteItem,
                saveNewItem: saveNewItem,
                peopleMap: peopleMap,
                replaceItem: replaceItem,
                editItem: editItem,
                isEdit: isEditDialog,
                editRfpId: editRfpId
            }}
        >
            <div className={`rfp-inbox-page ${isLoading ? 'loading' : ''}`}>
                <div className="contents">
                    <div className="page-header">
                        <div className="title">Document Inbox</div>
                    </div>
                    <div className="search-and-new">
                        <div className="search-box">
                            <div className="input">
                                <TextField 
                                    fullWidth 
                                    size="small" 
                                    label="Search Inbox"
                                    InputProps={{
                                        endAdornment : (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handleClickOpenDialog}>
                                + New Document
                            </Button>
                            <DialogRFPCreate
                                open={openRfpCreateDialog}
                                onClose={handleCloseRfpCreateDialog}
                            />

                            <ConfirmDialog
                                open={openConfirmDeleteDialog}
                                onClose={handleCloseConfirmDeleteDialog}
                                onConfirm={handleConfirmationDeleteDialog}
                                promptText={`Are you sure you want to delete "${currentRecordFocusName}"?`}
                                confirmButtonText="Delete"
                            />
                            

                        </div>
                    </div>
                    <RfpInboxTable data={rfpData} />
                </div>
                <div className="loader">
                    <CircularProgress />
                </div>

            </div>
        </RfpContext.Provider>
    )
}