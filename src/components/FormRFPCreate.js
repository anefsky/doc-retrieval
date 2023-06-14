import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MultiSelect from './MultiSelect';
import Button from '@mui/material/Button';
import RfpContext from '../shared/RfpContext';
import { getRfp } from '../utils/DbUtils';

export default function FormRFPCreate(props) {
  const { tabIdx,  handleClose } = props;
  const context = React.useContext(RfpContext);

  let existing, techVolume, mgmtVolume;
  if(context.isEdit) {
    existing = getRfp(context.editRfpId);
    techVolume = existing.volumes.find(x => x.type === 'Technical');
    mgmtVolume = existing.volumes.find(x => x.type === 'Management');
  }

  const isEdit = context.isEdit;

  const [rfpName, setRfpName] = React.useState(isEdit ? existing.name : '');
  const [dateIssued, setDateIssued] = React.useState(isEdit ? existing.date_issued : '');
  const [dateDue, setDateDue] = React.useState(isEdit ? existing.date_due : '');
  const [techProgress, setTechProgress] = React.useState(isEdit ? techVolume.progress : 'UNSTARTED');
  const [techSharepointLink, setTechSharepointLink] = React.useState(isEdit ? techVolume.sharepoint_link : '');
  const [techAssignTo, setTechAssignTo] = React.useState(isEdit ? techVolume.assigned_to : []);
  const [mgmtProgress, setMgmtProgress] = React.useState(isEdit ? mgmtVolume.progress : 'UNSTARTED');
  const [mgmtSharepointLink, setMgmtSharepointLink] = React.useState(isEdit ? mgmtVolume.sharepoint_link : '');
  const [mgmtAssignTo, setMgmtAssignTo] = React.useState(isEdit ? mgmtVolume.assigned_to : []);

  const progressOptions = [
    {
      value: "UNSTARTED",
      label: 'not started'
    },
    {
      value: "IN_PROGRESS",
      label: 'started'
    },
    {
      value: "COMPLETED",
      label: 'complete'
    }
  ];

  const volumes = [
    {
      tabIndex: 1,
      type: "Technical",
      progress: techProgress,
      setProgress: setTechProgress,
      sharepointLink: techSharepointLink,
      setSharepointLink:  setTechSharepointLink,
      assignTo: techAssignTo,
      setAssignTo: setTechAssignTo
    },
    {
      tabIndex: 2,
      type: "Management",
      progress: mgmtProgress,
      setProgress: setMgmtProgress,
      sharepointLink: mgmtSharepointLink,
      setSharepointLink:  setMgmtSharepointLink,
      assignTo: mgmtAssignTo,
      setAssignTo: setMgmtAssignTo
    }
  ];


  const handleSave = () => {
    const formData =         {
      _id: Date.now(),
      name: rfpName,
      date_issued : dateIssued,
      date_due: dateDue,
      volumes: volumes.map(volume => ({
        type: volume.type,
        assigned_to: volume.assignTo,
        sharepoint_link: volume.sharepointLink,
        progress: volume.progress
      }))
    };

    if(context.isEdit) {
      context.replaceItem(context.editRfpId, formData)
    } else {
      context.saveNewItem(formData);
    }
    handleClose();
  }

  return (
    <div className="form-rfp-create">
      <div className={`panel-contents ${tabIdx !== 0 ? 'hidden' : ''}`}>
        <div className="input-fields">
          <div className="entry">
            <div className="label" htmlFor="rfpName">RFP Name</div>
            <div className="input">
              <TextField  
                id="rfpName" 
                value={rfpName} 
                name="rfpName" 
                onChange={(e) => setRfpName(e.target.value)}>
              </TextField>
            </div>
          </div>
          <div className="entry">
            <div className="label" htmlFor="dateIssued">Date Issued</div>
              <div className="input">
              <TextField
                id="dateIssued"
                type="date"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
              />
            </div>
          </div>
          <div className="entry">
              <div className="label" htmlFor="dateDue">Date Due</div>
              <div className="input">
                <TextField
                  id="dateDue"
                  type="date"
                  value={dateDue}
                  onChange={(e) => setDateDue(e.target.value)}
                />
              </div>
          </div>
        </div>
      </div>

      {volumes.map(volume => (
        <div key={volume.tabIndex} className={`panel-contents ${tabIdx !== volume.tabIndex ? 'hidden' : ''}`}>
          <div className="input-fields">
            <div className="entry">
              <div className="label" htmlFor={volume.progress}>Progress</div>
              <div className="input">
                <Select  
                  id={volume.progress}
                  value={volume.progress} 
                  name={volume.progress} 
                  onChange={(e) => volume.setProgress(e.target.value)}
                >
                  {progressOptions.map(option => 
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                  }
                </Select>
              </div>
            </div>
            <div className="entry">
              <div className="label" htmlFor={volume.sharepointLink}>Sharepoint</div>
              <div className="input">
                <TextField  
                  id={volume.sharepointLink} 
                  value={volume.sharepointLink} 
                  name={volume.sharepointLink} 
                  onChange={(e) => volume.setSharepointLink(e.target.value)}>
                </TextField>
              </div>
            </div>

            <div className="people-select">
              <div className="label" htmlFor={volume.assignTo}>Assign To</div>
              <div className="input">
                <MultiSelect 
                  id={volume.assignTo} 
                  itemsMap={context.peopleMap} 
                  initSelections={volume.assignTo}
                  update={volume.setAssignTo}
                />
              </div>
            </div>
          </div>
        </div>

      ))}

      <div className="button-panel">
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" onClick={handleSave}>Save</Button>
      </div>

    </div>
  );

}