import { useNavigate } from "react-router-dom";

import * as React from "react";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import { indigo } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const pages = [
  { name: "Loja", link: "/" },
  { name: "Contactos", link: "/contactos" },
];

const menuadmin = [
  { name: "Gestão de livros", link: "/livros" },
  { name: "Gestão de autores", link: "/autores" },
  { name: "Gestão de editoras", link: "/editoras" },
  { name: "Gestão de clientes", link: "/clientes" },
  { name: "Gestão de funcionários", link: "/staff" },
];

function NavBar({ theme, user, setUser }) {
  const navigate = useNavigate();

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="Livraria Requalificar"
                  src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
                />
              </IconButton>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => {
                    navigate(page.link);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="" {...bindTrigger(popupState)}>
                      Administração
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {menuadmin.map((page) => (
                        <MenuItem
                          key={page.name}
                          onClick={() => {
                            navigate(page.link);
                          }}
                        >
                          {page.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Carrinho de compras">
                <IconButton /* onClick={handleOpenUserMenu} */ sx={{ p: 0 }}>
                  <Avatar
                    alt="Carrinho de compras"
                    src="https://static.thenounproject.com/png/1385410-200.png"
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 0, mx: 2 }}>
              {user.username === "" ? (
                <Tooltip title="Entrar">
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    sx={{ p: 0, color: indigo[100] }}
                  >
                    Entrar
                  </Button>
                </Tooltip>
              ) : (
                <Typography>
                  {user.username}
                  <Tooltip title="Sair da aplicação">
                    <Button
                      onClick={() => {
                        setUser({
                          ...user,
                          nome: "",
                          username: "",
                          staff: false,
                        });
                        navigate("/");
                      }}
                      sx={{ p: 0, color: indigo[100] }}
                    >
                      Sair
                    </Button>
                  </Tooltip>
                </Typography>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;
