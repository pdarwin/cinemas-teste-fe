import { Button, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { actions } from "./ModalReducer";
import { useCustomContext } from "./CustomContext";
import config from "../Config.json";

export default function MyDeleteForm({ type, getData }) {
  const [id, setId] = useState(0);
  const { modalState, modalDispatch } = useCustomContext();

  const params = useParams();

  let deleteType;
  if (type === "Cinemas") {
    deleteType = "Cinema/" + id;
  } else if (type === "Atores") {
    deleteType = "Ator/" + id;
  } else if (type === "Filmes") {
    deleteType = "Filme/" + id;
  }

  function eliminar() {
    if (id > 0) {
      fetch(config.API_URL + "/remove" + deleteType, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
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
          if (parsedResponse.statusOk) {
            setId(0);
            modalDispatch({
              type: actions.fireModal,
              payload: {
                msg: "Eliminação bem sucedida",
                level: "success",
              },
            });
            getData();
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
    } else {
      modalDispatch({
        type: actions.fireModal,
        payload: {
          msg: "O ID do item a eliminar tem de ser maior que zero",
          level: "error",
        },
      });
    }
  }

  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: blue[200], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">{"Eliminação de " + type}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            style={{ backgroundColor: "white" }}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            type="button"
            size="small"
            variant="contained"
            color="primary"
            className="form__custom-button"
            onClick={eliminar}
          >
            Eliminar
            <input type="Submit" hidden></input>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
