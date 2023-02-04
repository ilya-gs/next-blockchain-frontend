import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';


//====================================================//

export type CallbackAskDlg = (ret: number) => void

type Props = {
    title: string
    text?: string
    options: string[]
    callback?: CallbackAskDlg;
    open: boolean;
}

//====================================================//

const AskDialog: React.FC <Props> = ({open,title,options,callback,text}) => {

    const handleClick = (n: number) => {
        if (callback)
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
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                {options.map((item: string, index: number) => {
                    return <Button key={item + index} onClick={() => handleClick(index)}>{item}</Button>;
                })}
                </DialogActions>
            </Dialog>
    );
}

export default AskDialog;