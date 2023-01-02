import { Button, TableCell, TableRow } from "@mui/material";
import { ILocation } from "../../../../Interfaces/Admin";
import { formatDate } from "../../../../utils/utils";

interface props {
    location: ILocation;
    index: number;
    handleClickOpen: (location: ILocation, index: number) => void;
}

const Row = (props: props) => {

    return (
        <TableRow key={props.location.id}>
        <TableCell component="th" scope="row">
            {formatDate(props.location.createdAt)}
        </TableCell>
        <TableCell>{props.location.carBrand}</TableCell>
        <TableCell>{props.location.carModel}</TableCell>
        <TableCell>{props.location.carYear}</TableCell>
        <TableCell>{props.location.startDate}</TableCell>
        <TableCell>{props.location.endDate}</TableCell>
        <TableCell>{props.location.town}</TableCell>
        <TableCell align="right">
            {props.location.pricePerDay}
        </TableCell>
        <TableCell align="right">
            <Button
                variant="contained"
                color="inherit"
                onClick={() => { props.handleClickOpen(props.location, props.index) }}
            >
                Reservations
            </Button>
        </TableCell>
    </TableRow>
    )
}

export default Row;