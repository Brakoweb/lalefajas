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
import SearchBar from "../components/SearchBar";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <ListItem component={Link} to="/">
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem component={Link} to="/products">
          <ListItemText primary="Catalogo" />
        </ListItem>
        <ListItem component={Link} to="/contact">
          <ListItemText primary="Contactame" />
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemText primary="Acerca de Lale" />
        </ListItem>
        <ListItem component={Link} to="/cart">
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
            <Link to="/">
              <img
                src="https://lalefajas.com/cdn/shop/files/Recurso_7.png"
                alt="Logo"
                className="logo-image"
              />
            </Link>
          </div>
          <div className="nav-icons">
            <Link to="/cart" className="cart-icon">
              <ShoppingCartIcon />
              {cart.length > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="menu-button"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SearchBar />
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </>
  );
};

export default Navbar;
