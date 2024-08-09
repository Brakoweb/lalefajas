import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="menu-items"
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Catalogo" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary="Contactame" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="Acerca de Lale" />
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemText primary={`Cart (${cart.length})`} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar className="navbar">
          <div className="nav-logo">
            <Link to="/">LaleFajas</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Catalogo</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart" className="cart-icon">
              <ShoppingCartIcon />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </Link>
          </div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </>
  );
};

export default Navbar;
