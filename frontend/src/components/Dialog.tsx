import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


//====================================================//

type Callback = (ret: number) => void

type Props = {
    title?: string
    options: string[]
    callback: Callback;
}

//====================================================//

const AskDialog: React.FC <React.PropsWithChildren<Props>> = ({title,options,callback,children}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = (n: number) => {
        setOpen(false);
        callback(n);
    };


    return (
            <Dialog
                open={open}
            onClose={() => handleClick(-1)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                {options.map((item: string, index: number) => {
                    return <Button onClick={() => handleClick(index)}>{item}</Button>;
                })}
                </DialogActions>
            </Dialog>
    );
}

export default AskDialog;