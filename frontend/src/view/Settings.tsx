import {Chip, Divider, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";
import React from 'react';
import {UserRole} from "../api/types";
import {ViewContainer} from "../component/common/container/ViewContainer";

export const Settings = () => {
    const authState = useSelector((state: RootState) => state.auth)

    return (
        <ViewContainer>
            <Typography variant={'h1'}>Настройки</Typography>
            <Divider/>
            <Typography variant={'h3'}>Пользователь</Typography>
            <Stack direction="row" spacing={1}>
                {authState?.userInfo?.roles
                    .map(UserRole.toUserString)
                    .map(it => (
                        <Chip label={it}/>
                    ))}
            </Stack>
            <Typography variant={'body1'}>Логин: {authState?.userInfo?.username}</Typography>
        </ViewContainer>
    )
}
