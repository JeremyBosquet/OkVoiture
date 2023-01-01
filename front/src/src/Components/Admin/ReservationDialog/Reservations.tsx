import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Alert, Button, Dialog, DialogActions, DialogContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import { deleteApi } from '../../../API/Delete';
import { ILocation, rowData } from '../../../Interfaces/Admin';
import { createData } from '../../../Pages/AdminDashboard/createData';
import { formatDate } from '../../../utils/utils';
import Reservations from '../Reservations/Reservations';

interface props {
    location: ILocation | undefined;
    locationIndex: number;
    row: ReturnType<typeof createData>;
    setRows: (rows: rowData[]) => void;
    rows: ReturnType<typeof createData>[];
    handleClose: () => void;
    openReservation: boolean;
}

const ReservationsDialog = (props: props) => {
    return (
        <Dialog
            onClose={props.handleClose}
            open={props.openReservation}
            maxWidth="lg"
        >
            <DialogContent dividers>
                <Reservations
                    location={props.location}
                    locationIndex={props.locationIndex}
                    row={props.row}
                    rows={props.rows}
                    setRows={props.setRows}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.handleClose()}>
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReservationsDialog;