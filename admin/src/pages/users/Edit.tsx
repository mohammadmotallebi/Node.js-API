import * as React from 'react';
import MyMenu from "../../components/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {PostAdd} from '@mui/icons-material';
import {useLazyRolesQuery, useLazyCreateUserQuery} from "../../services/api";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CreateUser = () => {
    const [rolesArray, setRolesArray] = React.useState([]);
    const [roles, {isSuccess}] = useLazyRolesQuery()
    const [createUser] = useLazyCreateUserQuery()
    const [open, setOpen] = React.useState(false);
    const [newRole, setNewRole] = React.useState('');
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
        await createUser(user).then((data: any) => {
            console.log('data', data)
            window.location.href = '/users'
        })
    }

    return (
        <Card sx={{
            width: 500,
            margin: 'auto',
            marginTop: 100
        }}>
            <CardContent>
                <h1>Create User</h1>
                <TextField
                    sx={{marginBottom: 2}}
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
                <FormControl sx={{marginBottom: 2}} fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.role}
                        label="Role"
                        onChange={(e: SelectChangeEvent) => setUser({...user, role: e.target.value})}
                    >
                        {rolesArray.map((item: any) => (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    onClick={handleAddUser}
                    variant="contained"
                    endIcon={<PostAdd/>}
                    sx={{marginTop: 2}}
                    fullWidth
                >
                    Create User
                </Button>
            </CardContent>
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
