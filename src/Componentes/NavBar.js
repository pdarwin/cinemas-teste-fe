import { useNavigate } from "react-router-dom";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Box, Button } from "@mui/material";

export default function NavBar() {
  const navigate = useNavigate();

  return (
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
              style={{ color: "white" }}
            >
              <Avatar
                alt="Cinemas Requalificar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Twemoji12_1f4fd.svg/480px-Twemoji12_1f4fd.svg.png"
                sx={{ p: 1 }}
              />
              Cinemas Requalificar
            </IconButton>
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{ float: "right" }}
          >
            <Button
              onClick={() => {
                //getData();
              }}
              sx={{ m: 2, color: "white", display: "block" }}
              size="small"
              style={{ float: "right" }}
            >
              Filmes por Cinema
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              sx={{ m: 2, color: "white", display: "block" }}
              size="small"
              style={{ float: "right" }}
            >
              Filmes por Ator
            </Button>
            <Button
              onClick={() => {
                navigate("/filmes");
              }}
              sx={{ m: 2, color: "white", display: "block" }}
              size="small"
              style={{ float: "right" }}
            >
              Gestão de Filmes
            </Button>
            <Button
              onClick={() => {
                navigate("/Atores");
              }}
              sx={{ m: 2, color: "white", display: "block" }}
              size="small"
              style={{ float: "right" }}
            >
              Atores
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
