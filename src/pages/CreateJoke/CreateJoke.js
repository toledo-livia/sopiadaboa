import React, { useState } from "react";
import axios from "axios";
import { Box, Dialog, DialogContentText } from "@mui/material";
import "./CreateJoke.scss";

const CreateJoke = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  var user = useState([]);
  var message = useState("");
  var patternEmail =
    /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

  const handleOpen = (alert) => {
    setOpen(true);
    setAlert(alert);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateList = () => {
    window.location = "/piadas";
  };

  const handleChange = (set) => (event) => set(event.target.value);

  const createJoke = () => {
    if (name === "" || name.length > 100) {
      message = "Por favor, preencher um nome válido de até 100 caracteres!";
      handleOpen(message);
      return;
    }

    if (email === "" || email.length > 100 || !patternEmail.test(email)) {
      message = "Por favor, preencher um e-mail válido de até 100 caracteres!";
      handleOpen(message);
      return;
    }

    if (description === "" || description.length > 600) {
      message = "Por favor, preencher uma piada de até 100 caracteres!";
      handleOpen(message);
      return;
    }

    user = {
      name: name,
      email: email,
    };

    var date = new Date().toLocaleString("pt-BR");

    axios
      .post("http://localhost:3000/jokes", {
        user: user,
        description: description,
        created: date,
        likes: 0,
        dislike: 0,
      })
      .then((res) => {
        message = "Piada salva com sucesso!";
        handleOpen(message);
        navigateList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-create">
      <form className="form">
        <h1 className="title">Nova piada</h1>
        <Box className="box-create" p={1} m={1}>
          <Box p={1} flexGrow={2}>
            <label className="label-create">
              Nome: <br />
              <input
                type="text"
                maxLength="100"
                className="input-create"
                value={name}
                onChange={handleChange(setName)}
              />
            </label>
          </Box>
          <Box p={1} flexGrow={2}>
            <label className="label-create">
              Email: <br />
              <input
                type="text"
                maxLength="100"
                className="input-create"
                value={email}
                onChange={handleChange(setEmail)}
              />
            </label>
          </Box>
        </Box>
        <Box p={1} flexGrow={2} className="box-description">
          <label className="label-create">
            Piada: <br />
            <textarea
              type="text"
              maxLength="600"
              className="input-create-large"
              value={description}
              onChange={handleChange(setDescription)}
            />
          </label>
        </Box>
        <Box className="box-buttons">
          <input
            type="button"
            value="Cancelar"
            className="button-cancel-create"
            onClick={() => navigateList()}
          />
          <input
            type="button"
            value="Enviar piada"
            className="button-create"
            onClick={() => createJoke()}
          />
        </Box>
      </form>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogContentText className="dialog-text">
          <h2 className="title-dialog">Atenção!</h2>
          <Box className="box-warning">
            <p className="text-warning">{alert}</p>
            <input
              type="button"
              value="Ok"
              className="button-dialog"
              onClick={() => handleClose()}
            />
          </Box>
        </DialogContentText>
      </Dialog>
    </div>
  );
};
export default CreateJoke;
