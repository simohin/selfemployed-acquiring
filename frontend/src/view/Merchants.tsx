import {Box, Card, CardContent, Divider, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/models";
import {loadMerchants} from "../api/merchant";
import Grid from '@mui/material/Unstable_Grid2';
import {ViewContainer} from "../component/common/container/ViewContainer";
import AddIcon from '@mui/icons-material/Add';
import {FullScreenDialog, FullScreenDialogContent} from "../component/common/FullScreenDialog";
import {CreateIconButton} from "../component/common/CreateIconButton";
import {CreateMerchantForm} from "../component/common/form/CreateMerchantForm";

interface Props {
}

export const Merchants: React.FC<Props> = (props) => {
    const merchantsState = useSelector((state: RootState) => state.merchants)
    const [createOpen, setCreateOpen] = useState(false)

    useEffect(() => {
        loadMerchants()
    }, [])

    return (
        <>
            <FullScreenDialog open={createOpen}>
                <FullScreenDialogContent
                    title={'Новая торговая точка'}
                    onClose={() => setCreateOpen(false)}
                >
                    <CreateMerchantForm/>
                </FullScreenDialogContent>
            </FullScreenDialog>
            <ViewContainer>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant={'h1'}>Торговые точки</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <CreateIconButton
                            onClick={() => setCreateOpen(true)}
                            aria-label="close"
                        >
                            <AddIcon/>
                        </CreateIconButton>
                    </Box>
                </Box>
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
        </>
    )
}
