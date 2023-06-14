import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export default function ConfirmDialog(props) {
  const { onClose, onConfirm, open, promptText, confirmButtonText } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog onClose={handleClose} 
      open={open} 
      className="confirm-dialog"
    >
      <Box sx={{ width: 250, height: 150 }}>
        <div className="contents">
          {promptText}
        </div>
      </Box>

      <div className="button-panel">
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" onClick={handleSave}>{confirmButtonText}</Button>
      </div>

    </Dialog>
  );
}
