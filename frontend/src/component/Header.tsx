import {RootState} from "../store/models";
import {useSelector} from "react-redux";
import {Box, Button, useTheme} from "@mui/material"
import logo from '../assets/logo.svg'
import React, {MutableRefObject} from "react";
import {logout} from "../api/auth";

type Props = {
    elRef: MutableRefObject<HTMLDivElement | undefined>
}

export const Header: React.FC<Props> = (props) => {
    const theme = useTheme()
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
        marginRight: '16px',
        marginLeft: '32px',
    };
    return (
        <Box
            component={'header'}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingY: '8px',
                zIndex: 1,
                width: '100dvw',
                bgcolor: theme.palette.background.paper
            }}>
            <img style={headerTitleStyle} width={'60px'} src={logo} alt="Logo"/>
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
