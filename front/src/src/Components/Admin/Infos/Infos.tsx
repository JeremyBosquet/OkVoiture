import { Grid, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { RenterData } from "../../../Interfaces/Admin"
import InfoBox from "../InfoBox/InfoBox"

interface props {
    data: RenterData[]
}

const Infos = (props: props) => {

    const getNumberOfVehicles = () => {
		let count = 0;
		for (let i = 0; i < props.data.length; i++) {
			count += props.data[i].locations.length;
		}
		return count.toString();
	}

	const getNumberOfReservations = () => {
		let count = 0;
		for (let i = 0; i < props.data.length; i++) {
			count += props.data[i].nb_reservations;
		}
		return count.toString();
	}

	const getNumberOfRenters = () => {
		return (props.data.length).toString();
	}

    return (
        <Grid container xs={12} display="flex" justifyContent="start">
            <InfoBox title="Nombre de vehicules" value={getNumberOfVehicles()} />
            <InfoBox title="Nombre de reservations" value={getNumberOfReservations()} />
            <InfoBox title="Nombre de loueurs" value={getNumberOfRenters()} />
        </Grid>
    )
}

export default Infos