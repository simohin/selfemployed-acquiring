import {Box, Card, CardContent, Divider, Paper, styled, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";
import {loadMerchants} from "../api/merchant";
import Grid from '@mui/material/Unstable_Grid2';
import {ViewContainer} from "../component/common/container/ViewContainer";

interface Props {
}

export const Merchants: React.FC<Props> = ({}) => {
    const merchantsState = useSelector((state: RootState) => state.merchants)

    useEffect(() => {
        loadMerchants()
    }, [])

    return (
        <ViewContainer>
            <Typography variant={'h1'}>Торговые точки</Typography>
            <Divider/>
            <Grid
                container
                spacing={1}
                columns={{xs: 1, sm: 2, md: 3, lg: 4}}
                overflow={'scroll'}
            >
                {merchantsState?.items.map(it => (
                    <Grid key={it.id} xs={1}>
                        <Card variant="outlined">
                            <CardContent sx={{
                                minHeight: '100px'
                            }}>
                                <Typography variant="body2">{it.id}</Typography>
                                <Typography variant="h5">{it.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </ViewContainer>
    )
}
