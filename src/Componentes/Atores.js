import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCustomContext } from "./CustomContext";
import config from "../Config.json";
import MyForm from "./MyForm";
import MyDeleteForm from "./MyDeleteForm";

const columns = [
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "data_nascimento", headerName: "Data Nascimento", width: 650 },
  { field: "email", headerName: "Email", width: 650 },
  { field: "telemovel", headerName: "Telemovel", width: 650 },
];

export default function Atores() {
  const [data, setData] = useState(null);

  const { modalState, modalDispatch } = useCustomContext();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("data", data);
    if (data === null) {
      //getData();
    }
  }, [data]);

  function getData() {
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
        setData(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h5" my={3} align="center">
        {"Gestão de Atores"}
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
      <MyForm type="Atores" getData={getData} />
      <MyDeleteForm type="Atores" getData={getData} />
    </div>
  );
}
