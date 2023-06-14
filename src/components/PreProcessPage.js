import * as React from 'react';
import TreeViewWidget from './TreeViewWidget';
import { getPreprocessData, getPreprocessLinks } from '../utils/DbUtils';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { getTimeoutMs } from '../utils/GeneralUtils';

export default function PreProcessPage() {
  const { rfp_name, contractor_name } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [preprocessData, setPreprocessData] = React.useState({rfp: null, response: null});
  const [preprocessLinks, setPreprocessLinks] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout( () => {
      getPreprocessData()
            .then(() => setPreprocessData(JSON.parse(localStorage.getItem('pre_process_data'))))
            .then(() => getPreprocessLinks())
              .then(() => setPreprocessLinks(JSON.parse(localStorage.getItem('pre_process_links'))))
              .then(() => setIsLoading(false))
    }, getTimeoutMs());
  }, []);

  const updateSelectedStatus = (node, clickedNodeId) => {
    if(node.children) {
      node.children.forEach(child => 
        updateSelectedStatus(child, clickedNodeId)
      )
    }
    if(node.id === clickedNodeId) {
      node.status = node.status === 'selected' ? 'unselected' : 'selected';
    } else {
      node.status = 'unselected';
    }
  }

  const handleIsSelectedClicked = (nodeId, volumeType) => {
    updateSelectedStatus(preprocessData[volumeType], nodeId);
    setPreprocessData({...preprocessData, [volumeType]: preprocessData[volumeType]});
  };

  return (
    <div className={`pre-process-page ${isLoading ? 'loading' : ''}`}>
      <div className="page-header">
          <div className="title">PRE-PROCESS RESPONSES</div>
          <div className="sub-title">RFP: {rfp_name} / Contractor: {contractor_name}</div>
      </div>
      <div className="contents">
        <div className="left">
          <TreeViewWidget title="Request for Proposal" data={preprocessData.rfp}
            onIsSelectedClicked={(nodeId) => handleIsSelectedClicked(nodeId, 'rfp')} />
        </div>
        <div className="right">
          <TreeViewWidget title="Response"  data={preprocessData.response}
            onIsSelectedClicked={(nodeId) => handleIsSelectedClicked(nodeId, 'response')} />
        </div>
        <div className="loader">
          <CircularProgress />
        </div>
      </div>
    </div>
  );
}