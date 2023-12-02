'use client'
import React, {useEffect, useRef} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from '@emotion/styled'
import {useLazyLoginQuery, useLazyAuthQuery} from "@services/api";
import store from '@redux/store'
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from '@mui/material';
import Slide, {SlideProps} from '@mui/material/Slide';
import { useRouter } from "next/navigation";


const Img = styled.img`
  margin: auto;
  display: block;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`
const Item = styled(Grid)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`


export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    // declare ref for email & password string type in TypeScript
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const router = useRouter()
    interface User {
        email: string,
        password: string
    }


    // Login use @redux/slices/authSlice & @services/api
    /*message:"Invalid hook call. Hooks can only be called inside the body of a function component. This could happen for one of the following reasons:
    1.You might have mismatching versions of React and the renderer (such as React DOM)
    2. You might be breaking the Rules of Hooks
    3. You might have more than one copy of React in the same app See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
    useLoginMutation is a hook, so it can only be called inside a function component. You can't call it inside a class component.
    */
    // @ts-ignore
    const [login, {data, isLoading, isError, isSuccess, status,}] = useLazyLoginQuery()
const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const handleLogin = async () => {
        const user: User = {
            email: email.current?.value as string,
            password: password.current?.value as string
        }
        const result = await login(user)
        if (result.error) {
            setMessage(result.error.message)
            setOpen(true)
        } else {
            setIsLoggedIn(true)
        }

        console.log('result', store.getState().auth)
    }

    useEffect(() => {
        console.log('isSuccess', isLoggedIn)
        if (isLoggedIn) {
            router.push('/pages/dashboard')
        }
    }, [isLoggedIn])


        // check auth

    return (
        <div className="flex">
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      TransitionComponent={(props: SlideProps) => <Slide {...props} direction="down"/>}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <Grid container height='100vh'>
                {/*Grid Form in right-side full height*/}
                <Grid container sm={4} order={{xs: 1, sm: 2}}>
                    <Paper elevation={3}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>FJ</Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" sx={{mt: 1}}>
                                <TextField
                                    inputRef={email}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                />
                                <TextField
                                    inputRef={password}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <LoadingButton
                                    type="button"
                                    fullWidth
                                    size={"large"}
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={handleLogin}
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<LoginIcon/>}
                                >
                                    Sign In
                                </LoadingButton>
                                <Grid container>
                                    <Item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Item>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>

                </Grid>
                {/*Grid Image in left-side*/}
                <Grid container sm={8} order={{xs: 2, sm: 1}}>
                    <Img src="/dist/images/Project_158-03.jpg" alt="random" loading='lazy'/>
                </Grid>
            </Grid>
        </div>
    );
}