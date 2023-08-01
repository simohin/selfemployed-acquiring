import {Box} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}
export const ViewContainer: React.FC<Props> = ({children}) => (

    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100dvw',
        margin: '32px',
        gap: '16px',
    }}>
        {children}
    </Box>
)
