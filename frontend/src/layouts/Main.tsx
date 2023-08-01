import * as React from 'react';
import {useRef, useState} from 'react';
import {Header} from '../component/Header';
import {Box} from '@mui/material';
import {Login} from "../view/Login";
import {Register} from "../view/Register";
import {Merchants} from "../view/Merchants";
import {Settings} from "../view/Settings";
import {Footer} from "../component/Footer";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            component={'main'}
            role="tabpanel"
            display={value !== index ? 'none' : 'flex'}
            id={`tabpanel-${index}`}
            aria-labelledby={`tabpanel-${index}`}
            sx={{
                height: 'calc(100dvh - 200px)'
            }}
            {...other}
        >
            {children}
        </Box>
    );
}

export const Main = () => {

    const [current, setCurrent] = useState(0)
    const authState = useSelector((state: RootState) => state.auth)
    const isLoggedIn = authState?.isLoggedIn;

    const headerRef = useRef<HTMLDivElement>();
    const footerRef = useRef<HTMLDivElement>();

    const handleSuccess = () => setCurrent(0)

    const unauthorizedPanels = () => (
        <>
            <TabPanel value={current} index={0}>
                <Login onSuccess={handleSuccess}/>
            </TabPanel>
            <TabPanel value={current} index={1}>
                <Register onSuccess={handleSuccess}/>
            </TabPanel>
        </>)

    const authorizedPanels = () => (
        <>
            <TabPanel value={current} index={0}>
                <Merchants/>
            </TabPanel>
            <TabPanel value={current} index={1}>
                <Settings/>
            </TabPanel>
        </>)

    return (
        <>
            <Header elRef={headerRef}/>
            {isLoggedIn ? authorizedPanels() : unauthorizedPanels()}
            <Footer
                elRef={footerRef}
                current={current}
                setCurrent={setCurrent}
            />
        </>
    )
}
