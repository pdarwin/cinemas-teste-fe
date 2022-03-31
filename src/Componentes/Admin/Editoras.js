import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { styled } from "@mui/system";

const columns = [
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "morada", headerName: "Morada", width: 200 },

  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 5,
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 5,
    editable: true,
  },
];

export default function Editoras({ theme, user, API_URL }) {
  const [editoras, setEditoras] = React.useState([]);
  const [editora, setEditora] = React.useState({
    nome: "",
    morada: "",
  });

  //Gestão do modal
  const [open, setOpen] = React.useState(false);
  const [errLevel, setErrLevel] = React.useState("error");
  const [err, setErr] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getEditoras();
  }, []);

  function getEditoras() {
    fetch(API_URL + "/getEditoras", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setEditoras(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    fetch(API_URL + "/addEditora", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nome: editora.nome,
        morada: editora.morada,
        ativo: true,
      }),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        /*           if (response.status !== 200) {
            throw new Error(response.status.toString);
          } */

        return response.json();
      })
      .then((parsedResponse) => {
        if (parsedResponse.statusOk) {
          setErr("Registo bem sucedido");
          setErrLevel("success");
          handleOpen();
        } else {
          setErr(parsedResponse.msg);
          handleOpen();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" my={3} align="center" color="primary">
        Gestão de editoras
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={editoras}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <form className="form">
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            /*               onClick={() => {
                if (errLevel === "success") navigate("/");
              }} */
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Alert severity={errLevel}>{err}</Alert>
          </Modal>
        </div>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ backgroundColor: indigo[100], p: 8 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Registo de editora</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined">
              <TextField
                label="Nome"
                value={editora.nome}
                onChange={(e) => {
                  setEditora({ ...editora, nome: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined">
              <TextField
                label="Morada"
                value={editora.morada}
                onChange={(e) => {
                  setEditora({ ...editora, morada: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              size="large"
              variant="contained"
              color="primary"
              className="form__custom-button"
              onClick={gravar}
              sx={{ m: 1 }}
            >
              Gravar
              <input type="Submit" hidden></input>
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider>
  );
}
