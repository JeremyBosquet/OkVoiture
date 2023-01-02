import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      navigate('/');
    }, [])
    
    return (
        <></>
    )
}

export default Error404