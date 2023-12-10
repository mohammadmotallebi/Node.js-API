import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {PostAdd} from '@mui/icons-material';
import {useLazyRolesQuery, useLazyCreateUserQuery} from "../../services/api";
import {CardHeader, FormHelperText, InputLabel} from '@mui/material';
import {Autocomplete} from '@mui/material';
import {useNavigate} from "react-router-dom";

const CreateUser = () => {
    const [rolesArray, setRolesArray] = React.useState([]);
    const [roles, {isSuccess}] = useLazyRolesQuery()
    const [createUser] = useLazyCreateUserQuery()
    const [open, setOpen] = React.useState(false);
    const [newRole, setNewRole] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

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

    const handleAddUser = async () => {
        console.log('user', user)
        if(user.name === '' || user.email === '' || user.password === '' || user.role === ''){
            setError(true)
            return
        }
        await createUser(user).then((data: any) => {
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
                <TextField
                    sx={{marginBottom: 2}}
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    error={error && user.password === ''}
                    helperText={error && user.password === '' ? 'Password is required' : ''}
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
                    </div>
                <div>
                <Autocomplete
                    sx={{marginBottom: 2}}
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={rolesArray}
                    onChange={(e: any, newValue: any) => {
                        setUser({...user, role: newValue})
                    }}
                    renderInput={(params) =>
                        <TextField {...params}
                        error={error && user.role === ''} helperText={error && user.role === '' ? 'Role is required' : ''} label="Role" />}
                />
                </div>
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleAddUser}
                    variant="contained"
                    size="small" color={'success'} startIcon={<PostAdd/>}
                >
                    Create User
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
