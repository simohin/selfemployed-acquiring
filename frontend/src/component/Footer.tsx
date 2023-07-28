import {BottomNavigation, BottomNavigationAction} from "@mui/material";
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

    const authState = useSelector((state: RootState) => state.auth)

    const isLoggedIn = authState?.isLoggedIn;
    useEffect(() => {
        props.setCurrent(isLoggedIn ? 2 : 0)
    }, [isLoggedIn])

    const secureBottomNavigationActionSx = {
        display: isLoggedIn ? 'flex' : 'none'
    }

    const publicBottomNavigationActionSx = {
        display: isLoggedIn ? 'none' : 'flex',
    }

    return (
        <BottomNavigation
            showLabels
            value={props.current}
            onChange={(event, newValue) => {
                props.setCurrent(newValue);
            }}
            component={'footer'}
        >
            <BottomNavigationAction
                sx={publicBottomNavigationActionSx}
                label="Вход"
                icon={<LoginIcon/>}
            />
            <BottomNavigationAction
                sx={publicBottomNavigationActionSx}
                label="Регистрация"
                icon={<AppRegistration/>}
            />
            <BottomNavigationAction
                sx={secureBottomNavigationActionSx}
                label="Мерчанты"
                icon={<Store/>}
            />
            <BottomNavigationAction
                sx={secureBottomNavigationActionSx}
                label="Настройки"
                icon={<SettingsIcon/>}
            />
        </BottomNavigation>
    )
}