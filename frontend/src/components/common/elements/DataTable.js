import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import {CircularProgress, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit} from "@material-ui/icons";

import ConfirmDialog from "../dialogs/ConfirmDialog";
import Api from "../../../services/api/api";
import Button from "@material-ui/core/Button";


class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [["Loading Data..."]],
            isLoading: false,
            dialogOpen: false,
            dialogLoader: false,
            dialogId: null
        };

        this.params = {
            page: 0,
            size: props.size || 10,
            sort: props.sort || "id:desc",
            filters: props.filters || null,
            search: null
        };

        this.columns = [...props.columns];

        if (props.edit || props.delete) {
            this.addActionButtons();
        }

        this.searchDelay = null;
    }

    componentDidMount() {
        this.getData();
    }

    addActionButtons = () => {
        this.columns.push({
            name: 'id',
            label: 'Actions',
            options: {
                customBodyRender: (id) => (
                    <div>
                        {
                            this.props.edit &&
                            <IconButton aria-label="Edit"
                                        onClick={() => this.props.editCallBack ? this.props.editCallBack(id) : this.openEditPage(id)}>
                                <Edit fontSize="small" />
                            </IconButton>
                        }
                        {
                            this.props.delete &&
                            <IconButton aria-label="Delete" onClick={() => this.openConfirmModal(id)}>
                                <Delete fontSize="small" />
                            </IconButton>
                        }
                    </div>
                )
            }
        });
    };

    openCreatePage = () => {
        const url = this.props.customAddUrl || `${this.props.history.location.pathname}/create`;
        this.props.history.push(url);
    };

    openEditPage = (id) => {
        const editUrl = this.props.customEditUrl || `${this.props.history.location.pathname}/edit/${id}`;
        this.props.history.push(editUrl);
    };

    openConfirmModal = (id) => {
        this.setState({dialogOpen: true, dialogId: id} );
    };

    closeConfirmModal = (confirmed) => {
        if (confirmed) {
            const deleteUrl = `${this.props.endpoint}.delete`;
            this.setState({dialogLoader: true});

            this.setLoading();
            Api.request(deleteUrl, this.state.dialogId)
                .then(() => this.getData())
                .catch(e => console.log(e))
                .finally(() => this.setState({
                    isLoading: false,
                    dialogOpen: false,
                    dialogLoader: false,
                    dialogId: null
                }));

        } else {
            this.setState({dialogOpen: false});
        }
    };

    getData = () => {
        this.setLoading();

        const endpoint = `${this.props.endpoint}.data`;
        return Api.request(endpoint, {
            params: {...this.params, page: this.params.page + 1, per_page: this.params.size }
        })
            .then(result => {
                this.setState({ data: result.data, isLoading: false, count: result.total });
            })
            .catch(err => console.log(err))
            .finally(() => this.setState({ isLoading: false}));
    };

    setLoading = () => {
        this.setState({ isLoading: true } );
    };

    getSortDirection = (announceText) => {
        return announceText.includes("descending") ? "desc" : "asc";
    };

    setSortingOnColumn = (columnIndex, dir) => {
        const tempColumns = [...this.columns];
        const currentlySortedColumn = tempColumns.find(c => (c.options && c.options.sortDirection !== undefined));
        if (currentlySortedColumn) {
            delete currentlySortedColumn.options.sortDirection;
        }

        tempColumns[columnIndex]['options'] = {sortDirection: dir};
        return this.columns = [...tempColumns];
    };

    render() {
        const { data, page, count, isLoading, dialogOpen, dialogLoader } = this.state;

        const options = {
            filter: false,
            responsive: "stacked",
            serverSide: true,
            selectableRows: "none",
            count: count,
            page: page,
            searchText: this.params.search,
            onTableChange: (action, tableState) => {
                switch (action) {
                    case "changePage":
                        this.params.page = tableState.page;
                        this.getData();
                        break;

                    case "changeRowsPerPage":
                        this.params = {...this.params, page: 0, size: tableState.rowsPerPage};
                        this.getData();
                        break;

                    case "search":
                        if (!tableState.searchText) {
                            this.params = {...this.params, page: 0, search: null};
                            return this.getData();
                        }

                        if (tableState.searchText.length < 2) {
                            return false;
                        }

                        if (this.searchDelay) {
                            clearTimeout(this.searchDelay);
                        }

                        this.searchDelay = setTimeout(() => {
                            this.params = {...this.params, page: 0, search: tableState.searchText};
                            this.getData();
                        }, 800);

                        break;

                    case "sort":
                        const column = this.columns[tableState.activeColumn].name;
                        const dir = this.getSortDirection(tableState.announceText);

                        this.params.sort = `${column}:${dir}`;
                        this.setSortingOnColumn(tableState.activeColumn, dir);
                        this.getData();
                        break;

                    default:
                        return true;
                }
            },
            onRowClick: (row) => this.props.onRowClick ? this.props.onRowClick(row) : null
        };
        return (
            <div className="data-table-container">
                <ConfirmDialog
                    open={dialogOpen}
                    message={this.props.deleteMessage}
                    handleClose={this.closeConfirmModal}
                    loader={dialogLoader}
                />
                <MUIDataTable title={
                    <Typography variant="h6">
                        { this.props.title }
                        {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
                        {
                            this.props.add &&
                            <Button id="add_entity_button"
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => this.props.addCallBack ? this.props.addCallBack(false) : this.openCreatePage()}>
                                <Add />
                                {this.props.addText}
                            </Button>
                        }
                    </Typography>
                } data={data} columns={this.columns} options={options} />
            </div>
        );
    }

}


DataTable.propTypes = {
    history: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    size: PropTypes.number,
    sort: PropTypes.string,
    add: PropTypes.bool,
    addText: PropTypes.string,
    addCallBack: PropTypes.func,
    customAddUrl: PropTypes.string,
    edit: PropTypes.bool,
    customEditUrl: PropTypes.string,
    editCallBack: PropTypes.func,
    delete: PropTypes.bool,
    customDeleteUrl: PropTypes.string,
    deleteMessage: PropTypes.string,
    filters: PropTypes.object,
    onRowClick: PropTypes.func
};

export default DataTable;