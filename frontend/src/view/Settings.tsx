import {Box, Chip, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";
import React from 'react';

export const Settings = () => {
    const authState = useSelector((state: RootState) => state.auth)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <Typography variant={'h1'}>Настройки</Typography>
            <Typography variant={'h3'}>Пользователь</Typography>
            <Stack direction="row" spacing={1}>
                {authState?.userInfo?.roles.map(it => (
                    <Chip label={it}/>
                ))}
            </Stack>
            <Typography variant={'body1'}>Логин: {authState?.userInfo?.username}</Typography>
        </Box>
    )
}
