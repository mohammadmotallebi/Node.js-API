import MyMenu from "../../components/Menu";
import Loading from "../../components/Loading";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useLazyPostsQuery, useLazyDeletePostQuery} from "../../services/api";
import {DataGrid} from '@mui/x-data-grid/DataGrid';
import {
    GridToolbar,
    GridColDef,
    GridAddIcon
} from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDialog from "../../components/ConfirmDialog";

export default function async() {
    const [postData, setPostData] = React.useState([])
    const [rowID, setRowID] = React.useState('')
    // const router = useRouter()
    const [posts, {isLoading: postsIsLoading}] = useLazyPostsQuery()
    const [deletePost, {isLoading: deletePostIsLoading}] = useLazyDeletePostQuery()
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false)


    const handleDelete = async (id: string) => {
        console.log('id', id)

        await deletePost(id).then((data: any) => {
            console.log('data', data)
            if (data.data.deleted) {
                const newPostData = postData.filter((item: any) => item._id !== id)
                setPostData(newPostData)
                setOpen(false)
            }
        })
    }


    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            sortable: true,
            filterable: true,
            flex: 1,
            minWidth: 200
        },
        {
            field: "title",
            headerName: "Title",
            sortable: true,
            filterable: true,
            minWidth: 300
        },
        {
            field: "tags",
            headerName: "Tags",
            sortable: false,
            filterable: true,
            flex: 0.4,
            minWidth: 200
        },
        // Edit Button & Delete Button
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            flex: 0.4,
            minWidth: 200,
            renderCell: (params) => {
                return (
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <IconButton aria-label="edit" color="info"
                                    onClick={() => {
                                        setRowID(params.row._id)
                                        navigate(`edit`, {state: {id: params.row._id}})
                                    }}
                        >
                            <EditIcon/>
                        </IconButton>
                        {deletePostIsLoading ? <CircularProgress size={12}/> :
                            <IconButton aria-label="delete" color={"error"}
                                        onClick={() => {
                                            setRowID(params.row._id)
                                            setOpen(true)
                                        }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        }
                    </ButtonGroup>
                );
            }
        },
    ];
    const handleCreate = async () => {
        return navigate('create')
    }

    React.useEffect(() => {
        // @ts-ignore
        const p = posts().then((data) => {
            setPostData(data.data)
        })
    }, [])
    // @ts-ignore
    return (
        <MyMenu>
            <ConfirmDialog open={open} text={"Are you sure you want to delete this post?"} title={"Delete Post"}
                           actionText={"Delete"}
                           setOpen={() => {
                               setOpen(false)
                           }}
                           action={() => {
                               handleDelete(rowID)
                           }}/>
            <div style={{height: 400, width: '100%', cursor: 'context-menu'}}>
                {/*Add New Post*/}
                <Stack direction="row" spacing={1} sx={{mb: 1}}>
                    <Button size="small" variant="contained" onClick={handleCreate} color={"success"}>
                        <GridAddIcon sx={{mr: 1}}/>
                        Add New Post
                    </Button>
                </Stack>
                <DataGrid
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    loading={postsIsLoading}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={postData}
                    slots={{
                        toolbar: GridToolbar,
                        noRowsOverlay: () => {
                            if (postsIsLoading) {
                                return <Loading open={true}/>
                            }
                            return <div>No rows</div>;
                        },
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    showCellVerticalBorder={false}
                    autoHeight
                    sx={{
                        width: '100%',
                        color: '#fff',
                        borderColor: 'rgba(86,86,86,0.29)',
                        '& .MuiDataGrid-row': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiDataGrid-cell': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiDataGrid-columnsContainer': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: '#fff',
                        },
                        '& .MuiDataGrid-withBorderColor': {
                            borderColor: 'rgba(86,86,86,0.29)',
                        },
                        '& .MuiTablePagination-root': {
                            color: '#fff',
                        },
                        '& .MuiIconButton-root.Mui-disabled': {
                            color: '#6a6a6a',
                        },
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                            '& .MuiDataGrid-menuIcon': {
                                '& .MuiButtonBase-root': {
                                    color: '#fff',
                                }
                            },
                            '& .MuiButtonBase-root': {
                                color: '#fff',
                            },
                        },
                        '& .MuiDataGrid-columnHeaderDraggableContainer': {
                            '& .MuiButtonBase-root': {
                                color: '#fff',
                            }
                        },
                        '& .MuiCheckbox-root': {
                            color: '#ffffff',
                        },
                        '& .MuiFormControl-root': {
                            '& .MuiInputBase-root': {
                                color: '#ffffff',
                            },
                            '& .MuiInputBase-root:before': {
                                borderColor: 'rgba(255,255,255,0.68)',
                            },
                            '& .MuiInputBase-root:hover:before': {
                                borderColor: '#ffffff',
                            }
                        }
                    }}

                />
            </div>
        </MyMenu>
    )
}