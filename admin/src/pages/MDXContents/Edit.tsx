import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MDEditor from '@uiw/react-md-editor';
import {Edit} from '@mui/icons-material';
import {useLazySaveMdxQuery, useLazyReadMdxQuery} from "../../services/api";
import {useLocation} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide, {SlideProps} from "@mui/material/Slide";
import Alert from "@mui/material/Alert";


const CreatePost = () => {
    const [saveMdx] = useLazySaveMdxQuery()
    const [mdxByID] = useLazyReadMdxQuery()
    const [mdxContent, setMDXContent] = React.useState({
        path: '',
        content: ''
    })
    const [open, setOpen] = React.useState(false);
    const location = useLocation()
    const [message, setMessage] = React.useState('');
    // const navigate = useNavigate();


    React.useEffect(() => {
        mdxByID(location.state.id).then((data: any) => {
            console.log('data', data)
            setMDXContent({...mdxContent, path: location.state.id, content: data.data.fileContent})
        })
    }, [])

    const handleUpdateMdx = async () => {
        console.log('MDX Content', mdxContent)
        await saveMdx({...mdxContent}).then((data: any) => {
            console.log('data', data)
            setOpen(true)
            setMessage('Post updated successfully')

            // navigate('/mdx-files')
        })
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <Card sx={{
            minWidth: 275,
            '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      TransitionComponent={(props: SlideProps) => <Slide {...props} direction="down"/>}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <CardContent>
                <div>
                    <MDEditor
                        value={mdxContent.content}
                        preview="edit"
                        onChange={(value) => setMDXContent({...mdxContent, content: value || ''})}
                        height={500}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" color={'success'} variant="contained" onClick={handleUpdateMdx}>
                    <Edit/>
                    Update MDX File
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