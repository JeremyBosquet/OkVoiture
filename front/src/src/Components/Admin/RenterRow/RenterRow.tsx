import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ILocation } from "../../../Interfaces/Admin";
import { createData } from "../../../Pages/AdminDashboard/createData";
import { formatDate } from "../../../utils/utils";

const RenterRow = (props: { row: ReturnType<typeof createData> }) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    function compareBrand(a: ILocation, b: ILocation) {
        return a.carBrand === b.carBrand ? 0 : a.carBrand > b.carBrand ? 1 : -1;
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.firstName}</TableCell>
                <TableCell component="th" scope="row">{row.email}</TableCell>
                <TableCell align="right">{row.nb_locations}</TableCell>
                <TableCell align="right">{row.nb_reservations}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Vehicules
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mise en ligne</TableCell>
                                        <TableCell>Marque</TableCell>
                                        <TableCell>Modele</TableCell>
                                        <TableCell>Debut</TableCell>
                                        <TableCell>Fin</TableCell>
                                        <TableCell>Ville</TableCell>
                                        <TableCell align="right">Prix /jour (XPF)</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.locations.sort(compareBrand).map((location) => (
                                        <TableRow key={location.id}>
                                            <TableCell component="th" scope="row">
                                                {formatDate(location.createdAt)}
                                            </TableCell>
                                            <TableCell>{location.carBrand}</TableCell>
                                            <TableCell>{location.carModel}</TableCell>
                                            <TableCell>{location.startDate}</TableCell>
                                            <TableCell>{location.endDate}</TableCell>
                                            <TableCell>{location.town}</TableCell>
                                            <TableCell align="right">
                                                {location.pricePerDay}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="inherit"
                                                >
                                                    Reservations
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RenterRow;