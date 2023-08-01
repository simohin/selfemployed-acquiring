import {BottomNavigation, BottomNavigationAction, useTheme} from "@mui/material";
import {AppRegistration, Login as LoginIcon, Settings as SettingsIcon, Store} from "@mui/icons-material";
import * as React from "react";
import {MutableRefObject, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";

type Props = {
    elRef: MutableRefObject<HTMLDivElement | undefined>,
    current: number,
    setCurrent: (current: number) => void
}

export const Footer: React.FC<Props> = (props) => {
    const theme = useTheme()
    const authState = useSelector((state: RootState) => state.auth)
    const isLoggedIn = authState?.isLoggedIn;

    const merchants = () => (
        <BottomNavigationAction
            key={'merchants'}
            showLabel={true}
            label="Мерчанты"
            icon={<Store/>}
        />
    )
    const settings = () => (
        <BottomNavigationAction
            key={'settings'}
            showLabel={true}
            label="Настройки"
            icon={<SettingsIcon/>}
        />
    )
    const login = () => (
        <BottomNavigationAction
            key={'login'}
            showLabel={true}
            label="Вход"
            icon={<LoginIcon/>}
        />
    )
    const register = () => (
        <BottomNavigationAction
            key={'register'}
            showLabel={true}
            label="Регистрация"
            icon={<AppRegistration/>}
        />
    )

    return (
        <BottomNavigation
            sx={{
                width: '100dvw',
                bgcolor: theme.palette.background.paper
            }}
            value={props.current}
            onChange={(event, newValue) => {
                props.setCurrent(newValue);
            }}
            component={'footer'}
        >
            {(isLoggedIn ? [merchants(), settings()] : [login(), register()])}
        </BottomNavigation>
    )
}
