import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import axiosBase from "axios";
import { useEffect, useState } from "react";
import toastr from "toastr";

function App() {
  const [ip, setIp] = useState();
  const [loading, setLoading] = useState();
  const url_api = "https://mesttech.com.br/ip/api/?json=true;";

  const axios = axiosBase.create();
  axios.defaults.timeout = 500;
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    axios
      .get(url_api)
      .then(function (response) {
        setIp(response?.data?.ip);
        setLoading(true);
        toastr.clear();
      })
      .catch(() => {
        toastr.warning(
          "Recarregue a pagina, caso o problema persista, tente mais tarde.",
          "Problema ao pegar o IP!",
          {
            timeOut: 5000,
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(ip);

    toastr.success("Dados copiado para área de transferencia.", "Copiado!", {
      timeOut: 5000,
    });
  };

  return (
    <>
      <Box mt="25vh">
        <Box display="flex">
          <Box display="flex" margin="auto">
            <Typography variant="h5" margin="auto" mr="1rem">
              Seu IP:
            </Typography>
            <TextField
              value={ip}
              defaultValue=" "
              label="IP"
              variant="outlined"
              style={{ marginRight: "1rem" }}
            />
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={copyToClipBoard}
                  style={{ backgroundColor: "var(--bg-color-secundary)" }}
                >
                  Copiar IP
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Box m="5rem" display="flex">
          <Link
            href={url_api}
            target="_blank"
            m="auto"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="success"
              style={{ backgroundColor: "var(--main)" }}
            >
              Use tambem nosso api de IP
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default App;
// https://mesttech.com.br/ip/?json=true
