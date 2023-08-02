import React, {ReactNode} from "react";
import {Box, Dialog, Toolbar, Typography, useTheme} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {CloseIconButton} from "./CloseIconButton";

type Props = {
    open: boolean,
    children?: ReactNode
}

type ContentProps = {
    title: string,
    onClose: () => void,
    children?: ReactNode
}
export const FullScreenDialog: React.FC<Props> = ({open, children}) => (
    <Dialog fullScreen sx={{m: '8px'}} open={open}>
        {children}
    </Dialog>
)

export const FullScreenDialogContent: React.FC<ContentProps> = ({title, onClose, children}) => {
    const theme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingY: '8px',
                maxHeight: 'calc(20dvh - 16px)',
                bgcolor: theme.palette.background.paper
            }}>
                <Typography variant={'h2'}>{title}</Typography>
                <CloseIconButton
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon/>
                </CloseIconButton>
            </Toolbar>

            <Box sx={{
                maxHeight: 'calc(80dvh - 16px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll'
            }}>
                {children}
            </Box>
        </Box>
    )
}
