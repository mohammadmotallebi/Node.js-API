
// User interface
/*{
    "status": "success",
    "user": {
    "id": 1,
        "name": "Mohammad Motalebi",
        "email": "mohamad.motalebi@gmail.com",
        "email_verified_at": "2023-10-23T09:01:22.000000Z",
        "role_id": 1,
        "created_at": "2023-10-23T09:01:22.000000Z",
        "updated_at": "2023-10-23T09:01:22.000000Z"
},
    "token": "Bearer 145|DM88C8KyyOr9y06DQFVhUgNjbxByHZVEjJjoywIbfde75bcd"
}*/
export interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    role_id: number,
    created_at: string,
    updated_at: string
}