import { Alert, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { deleteApi } from '../../../API/Delete';
import { ILocation, rowData } from '../../../Interfaces/Admin';
import { createData } from '../../../Pages/AdminDashboard/createData';
import { formatDate } from '../../../utils/utils';

interface props {
    location: ILocation | undefined;
    locationIndex: number;
    row: ReturnType<typeof createData>;
    setRows: (rows: rowData[]) => void;
    rows: ReturnType<typeof createData>[];
}

const Reservations = (props: props) => {

    const [result, setResult] = useState<{ error: string, success: string }>({
        error: "",
        success: ""
    });

    const handleDelete = async (startDate: Date) => {
        await deleteApi('/api/v1/location/reservation', {
            locationId: props.location?.id,
            startDate: startDate
        }).then((res) => {
            const rowIndex = props.rows.findIndex((row) => row.email === props.row.email);

            // Retirer la réservation du tableau
            props.rows[rowIndex].locations[props.locationIndex].reservations = props.rows[rowIndex].locations[props.locationIndex].reservations
                .filter((reserv) => reserv.startDate !== startDate);
            props.rows[rowIndex].nb_reservations = props.rows[rowIndex].nb_reservations - 1;

            // Actualisation du tableau
            props.setRows(props.rows);

            setResult({
                error: "",
                success: res.data.message
            })
        }).catch((err) => {
            setResult({
                error: err.response.data.message,
                success: ""
            })
        })
    }

    return (
        <Grid container display="flex" justifyContent="space-around">
            <Grid item xs={12} display="flex" justifyContent="space-around">
                <Typography variant="h5">Réservations</Typography>
            </Grid>
            <Grid item xs="auto">
                {result.error && <Alert severity="error" >{result.error}</Alert>}
                {result.success && <Alert severity="success">{result.success}</Alert>}
            </Grid>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Début</TableCell>
                            <TableCell>Fin</TableCell>
                            <TableCell>Prix total (XPF)</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.location?.reservations?.map((reservation, index) => (
                            <TableRow key={index}>
                                <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                                <TableCell>{reservation.firstName}</TableCell>
                                <TableCell>{reservation.email}</TableCell>
                                <TableCell>{reservation.startDate.toString()}</TableCell>
                                <TableCell>{reservation.endDate.toString()}</TableCell>
                                <TableCell>{reservation.totalPrice}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => { handleDelete(reservation.startDate) }}
                                    >
                                        X
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default Reservations;