import MyMenu from "../../components/Menu";
import Loading from "../../components/Loading";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useLazyJobsQuery, useLazyDeleteJobQuery} from "../../services/api";
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
import Link from '@mui/material/Link';
import ConfirmDialog from "../../components/ConfirmDialog";

export default function async() {
    const [jobData, setJobData] = React.useState([])
    const [rowID, setRowID] = React.useState('')
    // const router = useRouter()
    const [jobs, {isLoading: jobsIsLoading}] = useLazyJobsQuery()
    const [deleteJob, {isLoading: deleteJobIsLoading}] = useLazyDeleteJobQuery()
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false)

    const handleCreate = () => {
        navigate(`create`)
    }

    const handleDelete = async (id: string) => {
        console.log('id', id)

        await deleteJob(id).then((data: any) => {
            console.log('data', data)
            if (data.data.deleted) {
                const newJobData = jobData.filter((item: any) => item._id !== id)
                setJobData(newJobData)
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
            flex: 0.3,
            minWidth: 200
        },
        {
            field: "location",
            headerName: "Location",
            sortable: true,
            filterable: true,
            flex: 0.3,
            minWidth: 300,
            renderCell: (params) => {
                return (
                    <>
                    <Link href="#" onClick={() => {
                        params.api.setQuickFilterValues([params.row.location[0].replace(/\s/g, '')])
                    }}>
                        {params.row.location[0]}
                    </Link>
                        &nbsp; | &nbsp;
                    <Link href="#" onClick={() => {
                        params.api.setQuickFilterValues([params.row.location[1].replace(/\s/g, '')])
                    }}>
                        {params.row.location[1]}
                    </Link>
                        &nbsp; | &nbsp;
                        <Link href="#" onClick={() => {
                            params.api.setQuickFilterValues([params.row.location[2].replace(/\s/g, '')])
                        }}>
                            {params.row.location[2]}
                        </Link>
                    </>
                )
            }
        },
        {
            field: "company",
            headerName: "Company",
            sortable: true,
            filterable: true,
            flex: 0.3,
            minWidth: 300
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            flex: 0.2,
            disableColumnMenu: true,
            minWidth: 100,
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
                                        navigate(`edit`,{ state: { id: params.row._id } })
                                    }}
                        >
                            <EditIcon/>
                        </IconButton>
                            <IconButton aria-label="delete" color={"error"}
                                        onClick={() => {
                                            setRowID(params.row._id)
                                            setOpen(true)
                                        }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                    </ButtonGroup>
                );
            }
        },
    ];

    React.useEffect(() => {
        jobs().then((data: any) => {
            console.log('data', data)
            setJobData(data.data)
        })
    }, [])

    return (
        <MyMenu>
            <ConfirmDialog open={open} text={"Are you sure you want to delete this Job?"} title={"Delete Job"}
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
                        Add New Job
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
                    loading={jobsIsLoading}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={jobData}
                    slots={{
                        toolbar: GridToolbar,
                        noRowsOverlay: () => {
                            if (jobsIsLoading) {
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

