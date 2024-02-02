import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {PostAdd} from '@mui/icons-material';
import {useLazyCreateJobQuery} from "../../services/api";
import {FilePond, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import config from "../../config.json";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
import {useNavigate} from "react-router-dom";

const CreateJob = () => {
    const [createJob] = useLazyCreateJobQuery()
    const navigate = useNavigate();
    const [job, setJob] = React.useState<any>({
        title: '',
        description: '',
        location: [],
        company: '',
        website: '',
        phone: '',
        images: [],
        services: [],
        address: '',

    })
    const [city, setCity] = React.useState<string>('')
    const [province, setProvince] = React.useState<string>('')
    const [country, setCountry] = React.useState<string>('')


    const handleAddJob = async () => {
        console.log('job', job)
        job.location = [city, province, country]
        await createJob(job).then((data: any) => {
            console.log('data', data)
            navigate('/jobs')
        })
    }

    const handleAddImage = (e: any) => {
        console.log('e', e)
        setJob((prevState: any) => ({
            ...prevState,
            images: e.map((file: any) => file.file.name)
        }))
    }


    // @ts-ignore
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
                            onChange={(e) =>  setCity(e.target.value)}
                        />
                        <TextField
                            id="province"
                            label="Province"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setProvince(e.target.value)}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setCountry(e.target.value)}
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
                                    //@ts-ignore
                                    process: {
                                        withCredentials: true,
                                        method: 'POST',
                                        headers: {
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

