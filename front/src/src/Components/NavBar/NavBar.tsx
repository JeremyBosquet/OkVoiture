import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	  
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};	

    return (
		<AppBar
			position="static"
			color="default"
			elevation={0}
		>
			<Toolbar 
				sx={{
					bgcolor: "white", 
					color: "text.secondary", 
					display: "flex", 
					justifyContent: "space-between", 
				}}
			>
				<Box display="flex">
					<Link to="/" style={{textDecoration: "none", color: "inherit"}}>
						<Typography variant="h5" color="inherit" component="div" noWrap>
							OkVoiture
						</Typography>
					</Link>
				</Box>
				<Box sx={{ display: { xs: "flex", md: "none" } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
						<MenuItem >
							<Link to="/louer/un/vehicule" style={{textDecoration: "none"}}><Button variant="outlined" color="secondary" >Louer un véhicule</Button></Link>
						</MenuItem>
					</Menu>				
				</Box>
				<Box sx={{ display: { xs: "none", md: "flex" }}}>
					<Link to="/louer/un/vehicule" style={{textDecoration: "none"}}><Button variant="outlined" color="secondary">Louer un véhicule</Button></Link>
				</Box>
			</Toolbar>
		</AppBar>
    )
}

export default Navbar;