import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCustomContext } from "./CustomContext";
import config from "../Config.json";

const columns = [
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "data_lancamento", headerName: "Data de Lançamento", width: 650 },
  { field: "imagem", headerName: "Imagem", width: 650 },
];

export default function MyViewer({ type }) {
  const [data, setData] = useState(null);

  const { modalState, modalDispatch } = useCustomContext();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data === null) {
      getData();
    }
  }, [data]);

  let getType;
  if (type === "FilmesCinema") {
    getType = "FilmesByCinema" + params.id;
  } else if (type === "FilmesAtor") {
    getType = "FilmesByAtor/" + params.id;
  }

  function getData() {
    setData(null);
    console.log(getType);
    fetch(config.API_URL + "/get" + getType, {
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
        setData(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h5" my={3} align="center">
        {type === "FilmesCinema" ? "Filmes por cinema" : "Filmes por ator"}
      </Typography>
      {data !== null ? (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        ""
      )}
      <Button
        variant="contained"
        onClick={() => {
          setData(null);
          navigate(-1);
        }}
        size="small"
        style={{ float: "right", mx: 2 }}
      >
        Voltar
      </Button>
    </div>
  );
}
