import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { RenterData } from "../../../Interfaces/Admin";
import { createData } from "../../../Pages/AdminDashboard/createData";
import RenterRow from "../RenterRow/RenterRow";

interface props {
    data: RenterData[]
}

const LocationsTable = (props: props) => {
    const [rows, setRows] = useState<ReturnType<typeof createData>[] | undefined>(undefined);

    const initRows = () => {
        let newRows: ReturnType<typeof createData>[] = [];
        for (let i = 0; i < props.data.length; i++) {
            newRows.push(createData(props.data[i].renter.email, props.data[i].renter.firstName, props.data[i].locations.length, props.data[i].nb_reservations, props.data[i].locations));
        }

        setRows(newRows);
    }

    useEffect(() => {
        initRows();
    }, [])

    return (
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
                        <RenterRow key={row.email} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LocationsTable;
