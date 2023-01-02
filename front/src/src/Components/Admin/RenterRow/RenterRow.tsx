import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ILocation } from "../../../Interfaces/Admin";
import { createData } from "../../../Pages/AdminDashboard/createData";
import ReservationsDialog from "../ReservationDialog/Reservations";
import Row from "./Row/Row";

interface props {
	row: ReturnType<typeof createData>;
	rows: ReturnType<typeof createData>[];
	setRows: (rows: ReturnType<typeof createData>[]) => void;
}

const RenterRow = (props: props) => {
	const [selectedLocation, setSelectedLocation] = useState<ILocation | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [openReservation, setOpenReservation] = useState(false);
	const [indexLocation, setIndexLocation] = useState(0);

	function compareBrand(a: ILocation, b: ILocation) {
		return a.carBrand === b.carBrand ? 0 : a.carBrand > b.carBrand ? 1 : -1;
	}

	const handleClickOpen = (location: ILocation, indexOfLocation: number) => {
		setIndexLocation(indexOfLocation);
		setSelectedLocation(location);
		setOpenReservation(true);
	};

	const handleClose = () => {
		setOpenReservation(false);
	};

	return (
		<>
			<ReservationsDialog 
				openReservation={openReservation} 
				handleClose={handleClose} 
				location={selectedLocation} 
				locationIndex={indexLocation} 
				row={props.row} rows={props.rows} 
				setRows={props.setRows} 
			/>

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
				<TableCell component="th" scope="row">{props.row.firstName}</TableCell>
				<TableCell component="th" scope="row">{props.row.email}</TableCell>
				<TableCell align="right">{props.row.nb_locations}</TableCell>
				<TableCell align="right">{props.row.nb_reservations}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Vehicules
							</Typography>
							<Table size="small">
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
									{props.row.locations.sort(compareBrand).map((location, index) => (
										<Row key={index} location={location} index={index} handleClickOpen={handleClickOpen}/> 
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