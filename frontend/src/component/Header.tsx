import {RootState} from "../store/models";
import {useSelector} from "react-redux";
import {Box, Button, Toolbar, Typography} from "@mui/material";
import React, {MutableRefObject} from "react";
import {logout} from "../api/auth";

type Props = {
    elRef: MutableRefObject<HTMLDivElement | undefined>
}

export const Header: React.FC<Props> = (props) => {
    const authState = useSelector((state: RootState) => state.auth)
    const baseButtonStyle = {
        marginY: '16px',
        marginRight: '32px',
        marginLeft: '16px',
    }

    const buttonStyle = (typeof authState?.token) === 'undefined' ? {
        display: 'none'
    } : {}

    const headerTitleStyle = {
        marginY: '16px',
        marginRight: '16px',
        marginLeft: '32px',
    };
    return (
        <Box component={'header'} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={headerTitleStyle} variant={'h4'}>SE.ACQ</Typography>
            <Button
                color="error"
                variant={'contained'}
                sx={{...baseButtonStyle, ...buttonStyle}}
                onClick={logout}
            >
                Выйти
            </Button>
        </Box>
    )
}
