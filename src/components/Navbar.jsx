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
  rgbToHex,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Home from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
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
        <ListItem component={Link} to="/" className="menu-item">
          <Home />
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem component={Link} to="/products" className="menu-item">
          <ImportContactsIcon />
          <ListItemText primary="Catalogo" />
        </ListItem>
        <ListItem component={Link} to="/contact" className="menu-item">
          <ContactMailIcon />
          <ListItemText primary="Contactame" />
        </ListItem>
        <ListItem component={Link} to="/about" className="menu-item">
          <InfoIcon />
          <ListItemText primary="Acerca de Lale" />
        </ListItem>
        <ListItem component={Link} to="/cart" className="menu-item">
          <ShoppingBagIcon />
          <ListItemText primary={`Cart (${cart.length})`} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar className="navbar">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <div className="nav-logo">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="nav-icons">
            <Link to="/cart" className="cart-icon">
              <ShoppingBagIcon />
              {cart.length > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <SearchBar />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
          },
        }}
      >
        {menuItems}
      </Drawer>
    </>
  );
};

export default Navbar;
