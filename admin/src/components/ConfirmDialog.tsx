import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(
    {text, title, action, actionText, open=false, setOpen}
        : {text: string, title: string, action: any, actionText: string, open: boolean, setOpen: any}
) {

    return (
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setOpen} >Cancel</Button>
                    <Button onClick={action} autoFocus>
                        {actionText}
                    </Button>
                </DialogActions>
            </Dialog>
    );
}