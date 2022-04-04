import { ThemeProvider } from "@emotion/react";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ theme, user, setUser, modalControls, API_URL }) {
  const [newUser, setNewUser] = useState({
    nome: "",
    username: "",
    staff: false,
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Controla se é cliente ou funcionário via radio button
  const [staff, setStaff] = useState(false);

  const staffFunc = () => {
    setStaff(!staff);
  };

  const doLogin = () => {
    if (validar()) {
      fetch(API_URL + "/login" + (staff ? "Funcionario" : "Cliente"), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: !staff ? newUser.username : "",
          username: staff ? newUser.username : "",
          password: password,
        }),
      })
        .then((response) => {
          // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
          console.log(response);

          return response.json();
        })
        .then((parsedResponse) => {
          if (parsedResponse.statusOk) {
            console.log(parsedResponse);
            setUser({
              id: parsedResponse.newID,
              username: newUser.username,
              staff: staff,
              shoppingCart: [],
            });
            modalControls.setErr(
              "Login bem sucedido. Bem vindo/a de volta à Livraria Requalificar, " +
                newUser.username
            );
            modalControls.setErrLevel("success");
            modalControls.handleOpen();
            navigate("/");
          } else {
            modalControls.setErr(parsedResponse.msg);
            modalControls.setErrLevel("error");
            modalControls.handleOpen();
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  function validar() {
    modalControls.setErrLevel("error");
    if (newUser.username === "") {
      modalControls.setErr((staff ? "Username" : "Email") + " não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (password === "") {
      modalControls.setErr("Password não preenchida");
      modalControls.handleOpen();
      return false;
    }

    return true;
  }

  return (
    <form className="form">
      <ThemeProvider theme={theme}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ backgroundColor: indigo[100], p: 8 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              Acesso de {staff ? "funcionário" : "cliente"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label={staff ? "Username" : "Email"}
              value={newUser.username}
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ backgroundColor: "white" }}
              type="password"
              required
            />
          </Grid>
          <Grid item xs={7}>
            <FormLabel id="demo-radio-buttons-group-label">
              Tipo de utilizador
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={staff}
              name="radio-buttons-group"
              onChange={staffFunc}
              value={staff}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Cliente"
                onChange={staffFunc}
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Funcionário"
                onChange={staffFunc}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={5} />
          <Grid item xs={7}>
            <Typography variant="caption">
              {!staff
                ? "Caso ainda não seja nosso cliente, pode registar-se usando o botão abaixo."
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={doLogin}
              sx={{ m: 1 }}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                navigate(-1);
              }}
              sx={{ m: 1 }}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setUser({ ...user, staff: staff });
                navigate("/registo");
              }}
              sx={{ m: 1 }}
            >
              Registar
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
