import {MainCenterContainer} from "../component/common/MainCenterContainer";
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import React, {useEffect, useState} from "react";
import {Merchant} from "../view/Merchant";
import {Settings} from "../view/Settings";
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import {useSelector} from "react-redux";
import {RootState} from "../store/models";
import {Login} from "../view/Login";
import {Register} from "../view/Register";
import {AppRegistration} from "@mui/icons-material";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            sx={{
                flexGrow: '1'
            }}>
            {children}
        </Box>
    );
}

export const Main = () => {

    const authState = useSelector((state: RootState) => state.auth)
    const [current, setCurrent] = useState(0)

    const isLoggedIn = authState?.isLoggedIn;
    useEffect(() => {
        setCurrent(isLoggedIn ? 2 : 0)
    }, [isLoggedIn])

    const secureBottomNavigationActionSx = {
        display: isLoggedIn ? 'flex' : 'none'
    }

    const publicBottomNavigationActionSx = {
        display: isLoggedIn ? 'none' : 'flex',
    }

    const handleSuccess = () => setCurrent(2)

    return (
        <MainCenterContainer>
            <TabPanel value={current} index={0}>
                <Login onSuccess={handleSuccess}/>
            </TabPanel>
            <TabPanel value={current} index={1}>
                <Register onSuccess={handleSuccess}/>
            </TabPanel>
            <TabPanel value={current} index={2}>
                <Merchant/>
            </TabPanel>
            <TabPanel value={current} index={3}>
                <Settings/>
            </TabPanel>
            <BottomNavigation
                showLabels
                value={current}
                onChange={(event, newValue) => {
                    setCurrent(newValue);
                }}
            >
                <BottomNavigationAction sx={publicBottomNavigationActionSx} label="Вход" icon={<LoginIcon/>}/>
                <BottomNavigationAction sx={publicBottomNavigationActionSx} label="Регистрация" icon={<AppRegistration/>}/>
                <BottomNavigationAction sx={secureBottomNavigationActionSx} label="Мерчанты" icon={<StoreIcon/>}/>
                <BottomNavigationAction sx={secureBottomNavigationActionSx} label="Настройки" icon={<SettingsIcon/>}/>
            </BottomNavigation>
        </MainCenterContainer>
    )
}
