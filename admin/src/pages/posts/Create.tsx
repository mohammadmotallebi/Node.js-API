import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Editor} from '@tinymce/tinymce-react';
import {PostAdd} from '@mui/icons-material';
import {useLazyTagsQuery, useLazyCreatePostQuery} from "../../services/api";
import {Autocomplete} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CreatePost = () => {
    const [tagsArray, setTagsArray] = React.useState([]);
    const [tags, {isSuccess}] = useLazyTagsQuery()
    const [createPost] = useLazyCreatePostQuery()
    const [open, setOpen] = React.useState(false);
    const [newTag, setNewTag] = React.useState('');
    const [post, setPost] = React.useState({
        title: '',
        content: '',
        tags: []
    })


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

    const handleAddTag = () => {
        // @ts-ignore
        setTagsArray([...tagsArray, newTag])
        setOpen(false)
    };
    const handleAddPost = async () => {
        console.log('post', post)
        await createPost(post).then((data: any) => {
            console.log('data', data)
            window.location.href = '/posts'
        })
    }


    return (
        <Card sx={{
            minWidth: 275,
            '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add a new TAG</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tag"
                        label="TAG"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="success" onClick={handleAddTag}>Add</Button>
                </DialogActions>
            </Dialog>
            <CardContent>
                <div>
                    <TextField label="Title" color="secondary" focused
                               onChange={(e) => setPost({...post, title: e.target.value})}/>
                </div>
                <div>
                    <Editor
                        apiKey='0ri8a6vo0tw281pra7ytwnojxxg9mw4lhdei2bzagatdh0tx'
                        onEditorChange={(content) => {
                            console.log('Content was updated:', content);
                            setPost({...post, content: content})
                        }}
                        init={{
                            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                {value: 'First.Name', title: 'First Name'},
                                {value: 'Email', title: 'Email'},
                            ],
                            ai_request: (_request: any, respondWith: {
                                string: (arg0: () => Promise<never>) => any;
                            }) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue="Welcome to TinyMCE!"
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                        onChange={(_event, newValue) => {
                            setPost({...post, tags: newValue})
                            console.log('newValue', newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="TAGS"
                                placeholder="TAGS"
                            />
                        )}
                    />
                    <Button variant="contained" color="success"
                            onClick={() => setOpen(true)}
                    >
                        Add Tag
                    </Button>
                </div>

            </CardContent>
            <CardActions>
                <Button size="small" color={'success'} variant="contained" onClick={handleAddPost}>
                    <PostAdd/>
                    Add Post
                </Button>
            </CardActions>
        </Card>
    );
}
export default () => {
    return (
        <div>
            <MyMenu children={<CreatePost/>}/>
        </div>
    );
};