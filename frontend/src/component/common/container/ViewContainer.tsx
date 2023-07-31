import {Box} from "@mui/material";
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}
export const ViewContainer: React.FC<Props> = ({children}) => (

    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%'
    }}>
        {children}
    </Box>
)
