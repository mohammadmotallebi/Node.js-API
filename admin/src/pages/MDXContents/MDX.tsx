import MyMenu from "../../components/Menu";
import Loading from "../../components/Loading";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useLazyListMdxQuery} from "../../services/api";
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


export default function async() {
    const [mdxFiles, {isLoading: mdxFilesIsLoading}] = useLazyListMdxQuery()
    const [rowID, setRowID] = React.useState('')
    const [listData, setListData] = React.useState([])


    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false)

    const handleCreate = () => {
        navigate(`create`)
    }

    React.useEffect(() => {
        // @ts-ignore
        mdxFiles().then((data: any) => {
            console.log('data', data)
            setListData(data.data)
        })
    }, [mdxFiles])
const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 150,
        flex: .5,
        editable: false,
    },
    {
        field: 'path',
        headerName: 'Path',
        width: 400,
        flex: 1,
        editable: false,
    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        flex: 0.2,
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
                                    setRowID(params.row.path)
                                    console.log('params.row.path', params.row.path)
                                    navigate(`edit`,{ state: { id: params.row.path } })
                                }}
                    >
                        <EditIcon/>
                    </IconButton>
                        <IconButton aria-label="delete" color={"error"}
                                    onClick={() => {
                                        setRowID(params.row)
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

    return (
        <MyMenu>
            {/*<ConfirmDialog open={open} text={"Are you sure you want to delete this post?"} title={"Delete Post"}*/}
            {/*               actionText={"Delete"}*/}
            {/*               setOpen={() => {*/}
            {/*                   setOpen(false)*/}
            {/*               }}*/}
            {/*               action={() => {*/}
            {/*                   handleDelete(rowID)*/}
            {/*               }}/>*/}
            <div style={{height: 400, width: '100%', cursor: 'context-menu'}}>
                {/*Add New Post*/}
                <Stack direction="row" spacing={1} sx={{mb: 1}}>
                    <Button size="small" variant="contained" onClick={handleCreate} color={"success"}>
                        <GridAddIcon sx={{mr: 1}}/>
                        Add New MDX
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
                    loading={mdxFilesIsLoading}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={listData}
                    slots={{
                        toolbar: GridToolbar,
                        noRowsOverlay: () => {
                            if (mdxFilesIsLoading) {
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

