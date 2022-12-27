import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Ivehicle } from "../../../Interfaces/Vehicle";
import BlockOfLocations from "../BlockOfLocations/BlockOfLocations";
interface props {
    data: Ivehicle[]
}

const LocationsList = (props: props) => {
    const maxPage = props.data.length / 3;
    const [pages, setPages] = useState<number[]>([0]);

    const loadNewPage = () => {
        if (pages.length < maxPage)
            setPages([...pages, pages.length]);
    }

    return (
        <>
            {pages?.map((page: number, index) => {
                return (<BlockOfLocations key={index} locations={props.data} page={page} nbLocationsPerBlock={3}/>);
            })}

            {
                props.data.length === 0 ?
                    <Typography variant="body1">Aucun vehicule disponible..</Typography>
                : null
            }

            {
                (pages?.length < maxPage) && props.data.length > 3 ?
                    <Button sx={{width: 200}} onClick={loadNewPage}>Voir plus</Button>
                : null
            }
        </>
    )
}

export default LocationsList;