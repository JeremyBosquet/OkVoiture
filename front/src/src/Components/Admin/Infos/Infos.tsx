import { Grid, Paper, Typography } from "@mui/material"
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

	const getNumberOfRenters = () => {
		return (props.data.length).toString();
	}

	return (
		<Paper elevation={1} sx={{ p: 1, m: 1.5, bgcolor: 'background.default' }}>
			<Grid container xs={12} display="flex" justifyContent="start" sx={{
				"@media (max-width: 600px)": {
					justifyContent: "center",
				},
			}}>
				<InfoBox title="Nombre de vehicules" value={getNumberOfVehicles()} />
				<InfoBox title="Nombre de loueurs" value={getNumberOfRenters()} />
			</Grid>
		</Paper>
	)
}

export default Infos