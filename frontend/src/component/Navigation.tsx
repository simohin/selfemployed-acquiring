import {RootState} from "../store/models";
import {useSelector} from "react-redux";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {logout} from "../api/auth";

export const Navigation = () => {
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
        <AppBar position="static">
            <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                <Typography sx={headerTitleStyle} variant={'h4'}>SE.ACQ</Typography>
                <Button
                    color="error"
                    variant={'contained'}
                    sx={{...baseButtonStyle, ...buttonStyle}}
                    onClick={logout}
                >
                    Выйти
                </Button>
            </Toolbar>
        </AppBar>
    )
}
