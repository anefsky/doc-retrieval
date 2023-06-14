import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export default function TreeViewWidget(props) {

  const { title, data, onIsSelectedClicked } = props;

  const handleNodeClick = nodeId => {
    // console.log('clicked, nodeId: ', nodeId);
  }

  const handleCheckboxClicked = nodeId => {
    onIsSelectedClicked(nodeId);
  }

  const renderTree = (node) => (
    <div className="tree-item-wrapper" key={node.id}>
      {node.id === 'root' ? '' : (node.status === 'selected' ?
        <CheckBoxOutlinedIcon onClick={() => handleCheckboxClicked(node.id)} /> : 
        <CheckBoxOutlineBlankOutlinedIcon onClick={() => handleCheckboxClicked(node.id)} />)}
      <TreeItem 
        nodeId={node.id} 
        label={node.id !== 'root' ? `${node.id}. ${node.name}` : ''} 
        sx={{ textAlign: 'left', position: 'relative'}}
        onClick={() => handleNodeClick(node.id)}
      >
        {Array.isArray(node.children)
          ? node.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  return (
    <div className="tree-view-widget">
      <div className="tree-title">{title}</div>
      <TreeView
        defaultExpanded={['root']}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {data !== null && renderTree(data)}
      </TreeView>
    </div>
  );
}