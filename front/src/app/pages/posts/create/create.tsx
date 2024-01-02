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
import {PostAdd} from '@mui/icons-material';
import {useLazyTagsQuery} from "@services/api";
import {Autocomplete} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export default function () {
    const [value, setValue] = React.useState('');
    const [tagsArray, setTagsArray] = React.useState([]);
    const [tags, {data, isLoading, isError, isSuccess, status}] = useLazyTagsQuery()

    React.useEffect(() => {

        tags(
            {
                page: 1,
                limit: 10,
                sort: 'id',
                order: 'desc',
                filter: {},
                search: ''
            }
        ).then((data: any) => {
            console.log('tags', data)
            setTagsArray(data.data)
        })
    }, [isSuccess])


    return (
        <Card sx={{
            minWidth: 275,
            '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}>
            <CardContent>
                <div>
                    <TextField label="Title" color="secondary" focused/>
                </div>
                <div>

                    <ReactQuill

                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={{
                            toolbar: [
                                [{'header': [1, 2, false]}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                ['link', 'image'],
                                ['clean']
                            ],
                        }}
                        style={{
                            height: '300px',
                            marginBottom: '40px'

                        }}
                    />
                </div>
                <div>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={tagsArray}
                        getOptionLabel={(option) => option}
                        getOptionKey={(option) => option}
                        // defaultValue={[top100Films[13]]}
                        filterSelectedOptions
                        clearOnBlur
                        itemScope
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="filterSelectedOptions"
                                placeholder="Favorites"
                            />
                        )}
                    />
                </div>

            </CardContent>
            <CardActions>
                <Button size="small" color={'success'} variant="contained">
                    <PostAdd/>
                    Add Post
                </Button>
            </CardActions>
        </Card>
    );
}