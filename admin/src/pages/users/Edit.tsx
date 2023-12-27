import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Edit, PostAdd} from '@mui/icons-material';
import {useLazyRolesQuery, useLazyUserByIdQuery, useLazyUpdateUserQuery} from "../../services/api";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useLocation, useNavigate} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Autocomplete, CardHeader} from "@mui/material";

const CreateUser = () => {
    const [rolesArray, setRolesArray] = React.useState([]);
    const [roles, {isSuccess}] = useLazyRolesQuery()
    const [updateUser] = useLazyUpdateUserQuery()
    const [userData, {isSuccess: userDataIsSuccess}] = useLazyUserByIdQuery()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [newRole, setNewRole] = React.useState('');
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        roles(
            {
                page: 1,
                limit: 10,
                sort: 'id',
                order: 'desc',
                filter: {},
                search: ''
            }
        ).then((data: any) => {
            console.log('roles', data)
            setRolesArray(data.data)
        })
    }, [isSuccess])

    const handleAddRole = () => {
        // @ts-ignore
        setRolesArray([...rolesArray, newRole])
        setOpen(false)
    };

    React.useEffect(() => {
        userData(location.state.id).then((data: any) => {
            console.log('userData', data)
            setUser(data.data)
        })
    }, [userDataIsSuccess])

    const handleEditUser = async () => {
        console.log('user', user)
        if (user.name === '' || user.email === '' || user.password === '' || user.role === '') {
            setError(true)
            return
        }
        await updateUser({...user}).then((data: any) => {
            console.log('data', data)
            navigate('/users')
        })
    }

    return (
        <Card sx={{
            minWidth: 275,
            '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}>
            <CardHeader title="Create User"/>
            <CardContent>
                <div>
                    <TextField
                        sx={{marginBottom: 2}}
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={user.name}
                        error={error && user.name === ''}
                        helperText={error && user.name === '' ? 'Name is required' : ''}
                        required
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </div>
                <div>
                    <TextField
                        sx={{marginBottom: 2}}
                        fullWidth
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        error={error && user.email === ''}
                        helperText={error && user.email === '' ? 'Email is required' : ''}
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div>
                    <Autocomplete
                        sx={{marginBottom: 2}}
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        value={user.role}
                        options={rolesArray}
                        onChange={(e: any, newValue: any) => {
                            setUser({...user, role: newValue})
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                       error={error && user.role === ''}
                                       helperText={error && user.role === '' ? 'Role is required' : ''} label="Role"/>}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleEditUser}
                    variant="contained"
                    size="small" color={'success'} startIcon={<Edit/>}
                >
                    Edit User
                </Button>
            </CardActions>
        </Card>
    );

}

export default () => {
    return (
        <div>
            <MyMenu children={<CreateUser/>}/>
        </div>
    );
};
