import * as React from 'react';
import {useLayoutEffect, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector} from 'react-redux';
import {RootState} from "../store/models";
import {Header} from '../component/Header';
import {Box} from '@mui/material';
import {Login} from "../view/Login";
import {Register} from "../view/Register";
import {Merchant} from "../view/Merchant";
import {Settings} from "../view/Settings";
import {Footer} from "../component/Footer";


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
            display={value !== index ? 'none' : 'flex'}
            id={`tabpanel-${index}`}
            aria-labelledby={`tabpanel-${index}`}
            {...other}
        >
            {children}
        </Box>
    );
}

export const Main = () => {

    const [current, setCurrent] = useState(0)

    const headerRef = useRef<HTMLDivElement>();
    const footerRef = useRef<HTMLDivElement>();

    const handleSuccess = () => setCurrent(2)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100dvh', overflow: 'hidden'}}>
            <CssBaseline/>
            <Header elRef={headerRef}/>
            <Box component={'main'} sx={{ display: 'flex', flexDirection: 'column', margin: '16px'}}>
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
            </Box>
            <Footer
                elRef={footerRef}
                current={current}
                setCurrent={setCurrent}
            />
        </Box>

    )
}
