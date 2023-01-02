import { useEffect, useState } from "react";
import { Ivehicle } from "../../../Interfaces/Vehicle";
import Location from "../Location/Location";

interface props {
    locations: Ivehicle[],
    page: number,
    nbLocationsPerBlock: number
}

const BlockOfLocations = (props: props) => {
    const [locations, setLocations] = useState<Ivehicle[]>([]);

    function takeNbLocations(locations: Ivehicle[], page: number) {
        const start = page * props.nbLocationsPerBlock;
        const end = start + props.nbLocationsPerBlock;
        return locations.slice(start, end);
    }

    useEffect(() => {
        setLocations(takeNbLocations(props.locations, props.page))
    }, [props.locations])
 
    return (
        <>
            {locations.map((vehicle: Ivehicle, index) => {
                return (<Location key={index} vehicle={vehicle} />)
            })}
        </>
    )
}

export default BlockOfLocations;