import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Editor} from '@tinymce/tinymce-react';
import {PostAdd} from '@mui/icons-material';
import {useLazyCreateJobQuery} from "../../services/api";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import config from "../../config.json";
import {getCookieValue} from "../../services/helpers"
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
import {useNavigate} from "react-router-dom";

const CreateJob = () => {
    const [createJob] = useLazyCreateJobQuery()
    const navigate = useNavigate();
    const [job, setJob] = React.useState({
        title: '',
        description: '',
        location: {
            city: '',
            province: '',
            country: ''
        },
        company: '',
        website: '',
        phone: '',
        images: [],
        services:[],
        address: '',

    })
    const [open, setOpen] = React.useState(false);



    const handleAddJob = async () => {
        console.log('job', job)
        await createJob(job).then((data: any) => {
            console.log('data', data)
            navigate('/jobs')
        })
    }

    const handleAddImage = (e: any) => {
        console.log('e', e)
        setJob(prevState => ({
            ...prevState,
            images: e.map((file: any) => file.file.name)
        }))
        }


    return (
        <MyMenu>
            <Card sx={{
                minWidth: 275,
                '& .MuiTextField-root': {m: 1, width: '50ch'},
            }}>
                <CardContent>
                    <div>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setJob({...job, location:{...job.location, city: e.target.value}})}
                        />
                        <TextField
                            id="province"
                            label="Province"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setJob({...job, location:{...job.location, province: e.target.value}})}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setJob({...job, location:{...job.location, country: e.target.value}})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="company"
                            label="Company"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, company: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="website"
                            label="Website"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, website: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, address: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            id="services"
                            label="Services"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={(e) => setJob({...job, services: [e.target.value]})}
                        />
                    </div>
                    <div>
                        <FilePond
                            files={job.images}
                            onupdatefiles={(e) => handleAddImage(e)}
                            allowMultiple={true}
                            maxFiles={3}
                            server={
                            {
                                url: "http://localhost:8050/api/job/upload-image",
                                process: {
                                    withCredentials: true,
                                    method: 'POST',
                                    headers:{
                                        'X-API-KEY': config.X_API_KEY
                                    }
                                    }
                            }}
                            name="files" /* sets the file input name, it's filepond by default */
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<PostAdd/>}
                        onClick={handleAddJob}
                    >
                        Add Job
                    </Button>
                </CardActions>
            </Card>
        </MyMenu>
    );

}

export default CreateJob;

