import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

interface props {
    title: string,
    value: string
}

const InfoBox = (props: props) => {

    return (
        <Box maxWidth={220} sx={{ p: 2, minHeight: "150px" }}>
            <Paper elevation={3} sx={{height: "100"}}>
                <Box sx={{ p: 2 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="h5" textAlign="center">{props.title}</Typography>
                    <Typography variant="h3" padding={2}>{props.value}</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default InfoBox