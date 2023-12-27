import {Box, Button, Container, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import images from '../../components/Images';
import {Home} from '@mui/icons-material';

export default function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button sx={{mt: 5, color: 'white'}} size="large" startIcon={<Home/>} variant="contained"
                                color={'warning'} onClick={() => window.location.href = '/'}>Back Home</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src={images.not_found}
                            alt=""
                            height={500}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}