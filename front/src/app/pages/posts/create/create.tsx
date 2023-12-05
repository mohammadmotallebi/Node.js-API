import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function () {
    const [value, setValue] = React.useState('');
    return (
        <Card sx={{
            minWidth: 275,
            '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}>
            <CardContent>
                <div>
                    <TextField label="Title" color="secondary"  focused />
                </div>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                ['link', 'image'],
                                ['clean']
                            ],
                        }}
                        height="500px"
                    />
                </div>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}