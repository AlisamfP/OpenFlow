import { Box } from '@mui/material'

function Footer() {
    return (
        <footer>
            <Box sx={{backgroundColor: 'primary.main', position: 'fixed', bottom: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <p>Site created by Alisa Palson</p>
            <p>Icons by: <a href="https://openmoji.org/">OpenMoji</a></p>
            </Box>
        </footer>
    )
}

export default Footer