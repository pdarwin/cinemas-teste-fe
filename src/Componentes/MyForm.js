import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import { actions } from "./ModalReducer";
import { useCustomContext } from "./CustomContext";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import config from "../Config.json";
import { Box } from "@mui/system";

export default function MyForm({ type, getData }) {
  const [item, setItem] = useState({
    nome: "",
    morada: "",
    imagem: "",
    email: "",
    idade: 0,
    data: null,
    quantidade: 0,
  });
  const [id, setId] = useState();
  const [cinemas, setCinemas] = useState([]);
  const [atores, setAtores] = useState([]);
  const [selAtores, setSelAtores] = useState([]);
  const { modalState, modalDispatch } = useCustomContext();

  const params = useParams();

  useEffect(() => {
    if (type === "Filmes") {
      getCinemas();
      getAtores();
    }
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let postType;
  if (type === "Cinemas") {
    postType = "Cinema";
  } else if (type === "Atores") {
    postType = "Ator/" + id;
  } else if (type === "Filmes") {
    postType = "Filme/" + id;
  }

  function getCinemas() {
    fetch(config.API_URL + "/getAllCinemas", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setCinemas(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getAtores() {
    fetch(config.API_URL + "/getAtores", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setAtores(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    //if (valida()) {
    fetch(config.API_URL + "/add" + postType, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        // if (response.status !== 200) {
        //   throw new Error(response.status.toString);
        // }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        if (parsedResponse.statusOk) {
          //item.id = parsedResponse.newID;
          getData();
          setItem({
            ...item,
            nome: "",
            morada: "",
            imagem: "",
            email: "",
            idade: 0,
            data: null,
            quantidade: 0,
          });
          modalDispatch({
            type: actions.fireModal,
            payload: {
              msg: "Registo bem sucedido",
              level: "success",
            },
          });
        } else {
          modalDispatch({
            type: actions.fireModal,
            payload: {
              msg: parsedResponse.msg,
              level: "error",
            },
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  /* function valida() {
    modalControls.setErrLevel("error");
    if (editora.nome === "") {
      modalControls.setErr("Nome não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (editora.morada === "") {
      modalControls.setErr("Morada não preenchida");
      modalControls.handleOpen();
      return false;
    }
    return true;
  }
 */
  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: blue[200], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">{"Registo de " + type}</Typography>
        </Grid>
        {type === "Cinemas" || type === "Atores" || type === "Filmes" ? (
          <Grid item xs={12}>
            <TextField
              label="Nome"
              value={item.nome}
              onChange={(e) => {
                setItem({ ...item, nome: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Cinemas" ? (
          <Grid item xs={12}>
            <TextField
              label="Morada"
              value={item.morada}
              onChange={(e) => {
                setItem({ ...item, morada: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Atores" ? (
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={item.email}
              onChange={(e) => {
                setItem({ ...item, email: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Atores" ? (
          <Grid item xs={12}>
            <TextField
              label="Telemovel"
              value={item.telemovel}
              onChange={(e) => {
                setItem({ ...item, telemovel: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Cinemas" || type === "Filmes" ? (
          <Grid item xs={12}>
            <TextField
              label="Imagem"
              value={item.imagem}
              onChange={(e) => {
                setItem({ ...item, imagem: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Atores" ? (
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de nascimento"
                value={item.data_nascimento}
                onChange={(newValue) => {
                  setItem({ ...item, data_nascimento: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        ) : (
          ""
        )}
        {type === "Filmes" ? (
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de lançamento"
                value={item.data_lancamento}
                onChange={(newValue) => {
                  setItem({ ...item, data_lancamento: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        ) : (
          ""
        )}
        {type === "Filmes" ? (
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="cinema">Cinema</InputLabel>
              <Select
                labelId="cinema"
                id="cinema"
                value={item.cinema_id}
                label="Cinema"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {cinemas.map((cinema) => (
                  <MenuItem value={cinema.id} key={cinema.id}>
                    {cinema.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
        {type === "Filmes" ? (
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="ator_l">Ator(es)</InputLabel>
              <Select
                labelId="autr"
                id="ator"
                multiple
                value={selAtores}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  setSelAtores(
                    // On autofill we get a stringified value.
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((obj) => (
                      <Chip key={obj} label={atores[parseInt(obj) - 1].nome} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {atores.map((ator) => (
                  <MenuItem value={ator.id} key={ator.id}>
                    {ator.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={8}>
          <Button
            type="button"
            size="small"
            variant="contained"
            color="primary"
            className="form__custom-button"
            onClick={gravar}
          >
            Gravar
            <input type="Submit" hidden></input>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
