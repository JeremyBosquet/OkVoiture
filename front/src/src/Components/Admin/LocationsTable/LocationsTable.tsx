import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RenterData, rowData } from "../../../Interfaces/Admin";
import { createData } from "../../../Pages/AdminDashboard/createData";
import RenterRow from "../RenterRow/RenterRow";

interface props {
    data: RenterData[]
}

const LocationsTable = (props: props) => {
    const [rows, setRows] = useState<rowData[] | undefined>(undefined);

    const initRows = () => {
        let newRows: rowData[] = [];
        for (let i = 0; i < props.data.length; i++) {
            newRows.push(createData(props.data[i].renter.email, props.data[i].renter.firstName, props.data[i].locations.length, props.data[i].nb_reservations, props.data[i].locations));
        }

        setRows(newRows);
    }

    useEffect(() => {
        initRows();
    }, [])

    return (
        <>
            <Paper elevation={1} sx={{ p: 2, m: 2, bgcolor: 'background.default' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Locations:</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Prenom</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Vehicules</TableCell>
                                <TableCell align="right">Reservations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.map((row: ReturnType<typeof createData>) => (
                                <RenterRow key={row.email} row={row} rows={rows} setRows={setRows} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default LocationsTable;
