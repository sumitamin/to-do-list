import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export const confirmDelete = (props) => {
    const {open} = props;
    const handleClosed = () => {

    }
    return (
        <Dialog
            open={open}
            onClose={handleClosed}
            // PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
         >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Are you sure, you want delete this task?
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClosed} color="primary">
            Yes, delete it
          </Button>
          <Button onClick={handleClosed} color="primary">
            No, Keep it
          </Button>
        </DialogActions>
      </Dialog>
    )
}
