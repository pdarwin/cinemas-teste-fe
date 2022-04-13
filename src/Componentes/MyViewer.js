import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCustomContext } from "./CustomContext";
import config from "../Config.json";
import MyForm from "./MyForm";
import MyDeleteForm from "./MyDeleteForm";

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
  if (type === "Cinemas") {
    getType = "AllCinemas";
  } else if (type === "Atores") {
    getType = "Atores/" + params.id;
  } else if (type === "Salarios") {
    getType = "SalariosByPessoa/" + params.id;
  }

  let columns = [{ field: "id", headerName: "ID", width: 250 }];
  if (type === "Cinemas") {
    columns = [
      ...columns,
      { field: "nome", headerName: "Nome", width: 250 },
      { field: "morada", headerName: "Morada", width: 650 },
      { field: "imagem", headerName: "Imagem", width: 650 },
    ];
  } else if (type === "Atores") {
    columns = [
      ...columns,
      { field: "nome", headerName: "Nome", width: 250 },
      { field: "data_nascimento", headerName: "Data Nascimento", width: 650 },
      { field: "email", headerName: "Email", width: 650 },
      { field: "telemovel", headerName: "Telemovel", width: 650 },
    ];
  } else if (type === "Salarios") {
    columns = [
      ...columns,
      { field: "quantidade", headerName: "Quantidade", width: 250 },
      { field: "data", headerName: "Data", width: 650 },
    ];
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
        {"Gestão de " + type}
      </Typography>
      {type === "Empresas" || type === "Pessoas" ? (
        <Typography variant="caption">
          Clique na linha para ver os detalhes
        </Typography>
      ) : (
        ""
      )}
      {data !== null ? (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={(params) => {
            if (type === "Empresas") {
              setData(null);
              navigate("/pessoasporempresa/" + params.row.id);
            }
            if (type === "Pessoas") {
              setData(null);
              navigate("/salariosporpessoa/" + params.row.id);
            }
          }}
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
      <MyForm type={type} getData={getData} />
      <MyDeleteForm type={type} getData={getData} />
    </div>
  );
}
