import { Box, Dialog, DialogContentText, List, ListItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./JokesList.scss";

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [date, setDate] = useState("");
  const [orderDate, setOrderDate] = useState("asc");
  const [searchResult, setSearchResult] = useState("");
  const options = [];

  const handleOpen = (id, title, description, name, like, dislike, date) => {
    setOpen(true);
    setId(id);
    setTitle(title);
    setDescription(description);
    setName(name);
    setLike(like);
    setDislike(dislike);
    setDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateCreate = () => {
    window.location = "/criar-piada";
  };

  const loadJokes = () => {
    axios
      .get("http://localhost:3000/jokes")
      .then((res) => {
        setJokes(res.data);
        createOptions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createOptions = (data) => {
    data.forEach((item, index) => {
      const object = { label: item.user.name, description: item.description };
      options.push(object);
    });
  };

  const orderByDate = () => {
    if (orderDate === "asc") {
      setOrderDate("desc");
    } else {
      setOrderDate("asc");
    }

    function orderAsc(a, b) {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }

    function orderDesc(a, b) {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }

    if (orderDate === "asc") {
      setJokes(jokes.sort(orderDesc));
    } else {
      setJokes(jokes.sort(orderAsc));
    }
  };

  function searchJoke(value) {
    var filteredData = [];
    for (var i = 0; i < jokes.length; i++) {
      value = value.toLowerCase();
      var joke = jokes[i].description.toLowerCase();
      if (joke.includes(value)) {
        filteredData.push(jokes[i]);
      }
    }
    return filteredData;
  }

  const handleSearch = (e) => {
    const inputValue = e.target.value; // e.target corresponde ao elemento input.
    setSearchResult(searchJoke(inputValue)); // assumindo `data` como propriedade global do
    // estado Nao precisa passar como parametro.
  };

  const addLike = () => {
    axios
      .patch("http://localhost:3000/jokes/" + id, {
        likes: like + 1,
      })
      .then((res) => {
        loadJokes();
        setLike(like + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeLike = () => {
    axios
      .patch("http://localhost:3000/jokes/" + id, {
        dislike: dislike + 1,
      })
      .then((res) => {
        loadJokes();
        setDislike(dislike + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadJokes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-jokes">
      <Box className="box-search" p={1} m={1}>
        <Box p={1} flexGrow={2} className="box-input-search">
          <input
            type="text"
            placeholder="Pesquisar piada"
            className="input-search"
            onChange={handleSearch}
          />
        </Box>
        <Box p={1} flexGrow={2} className="box-options">
          <Box p={1} flexGrow={2} className="box-input-order">
            <input
              type="button"
              value="Ordenar"
              className="input-order"
              onClick={orderByDate}
            />
          </Box>
          <Box p={1} flexGrow={2} className="box-button">
            <input
              type="button"
              value="Criar piada"
              className="button-create-link"
              onClick={() => navigateCreate()}
            />
          </Box>
        </Box>
      </Box>
      <List className="list">
        {searchResult
          ? searchResult.map((item, index) => (
              <React.Fragment>
                <ListItem className="list-item">
                  <Box
                    m={1}
                    className="card"
                    onClick={() =>
                      handleOpen(
                        item.id,
                        index + 1,
                        item.description,
                        item.user.name,
                        item.likes,
                        item.dislike,
                        item.created
                      )
                    }
                  >
                    <Box className="box-header" p={1} m={1}>
                      <Box p={1} flexGrow={1} className="box-title">
                        <h2 className="title-joke">Piada {index + 1}</h2>
                      </Box>
                      <Box p={1} flexGrow={1} className="box-created">
                        <span className="created">
                          {item.created
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join()
                            .replace(/,/g, "/")}
                        </span>
                      </Box>
                    </Box>
                    <Box className="box-joke">
                      <p>{item.description}</p>
                    </Box>
                    <Box p={1} m={1} className="box-footer">
                      <Box p={1} m={1} className="box-footer-content">
                        <Box p={1} flexGrow={1} className="box-name">
                          <span className="user-name">{item.user.name}</span>
                        </Box>
                        <Box p={1} m={1} className="box-actions">
                          <Box p={1} className="box-action">
                            <input
                              type="button"
                              value={item.likes}
                              className="button-like"
                            />
                          </Box>
                          <Box p={1} className="box-action">
                            <input
                              type="button"
                              value={item.dislike}
                              className="button-dislike"
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box p={1} className="box-published">
                        <span className="created">
                          Publicada em{" "}
                          {item.created
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join()
                            .replace(/,/g, "/")}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))
          : jokes.map((item, index) => (
              <React.Fragment>
                <ListItem className="list-item">
                  <Box
                    m={1}
                    className="card"
                    onClick={() =>
                      handleOpen(
                        item.id,
                        index + 1,
                        item.description,
                        item.user.name,
                        item.likes,
                        item.dislike,
                        item.created
                      )
                    }
                  >
                    <Box className="box-header" p={1} m={1}>
                      <Box p={1} flexGrow={1} className="box-title">
                        <h2 className="title-joke">Piada {index + 1}</h2>
                      </Box>
                      <Box p={1} flexGrow={1} className="box-created">
                        <span className="created">
                          {item.created
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join()
                            .replace(/,/g, "/")}
                        </span>
                      </Box>
                    </Box>
                    <Box className="box-joke">
                      <p>{item.description}</p>
                    </Box>
                    <Box p={1} m={1} className="box-footer">
                      <Box p={1} m={1} className="box-footer-content">
                        <Box p={1} flexGrow={1} className="box-name">
                          <span className="user-name">{item.user.name}</span>
                        </Box>
                        <Box p={1} m={1} className="box-actions">
                          <Box p={1} className="box-action">
                            <input
                              type="button"
                              value={item.likes}
                              className="button-like"
                            />
                          </Box>
                          <Box p={1} className="box-action">
                            <input
                              type="button"
                              value={item.dislike}
                              className="button-dislike"
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box p={1} className="box-published">
                        <span className="created">
                          Publicada em{" "}
                          {item.created
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join()
                            .replace(/,/g, "/")}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
      </List>
      <Dialog maxWidth="md" open={open} onClose={() => handleClose()}>
        <DialogContentText className="dialog">
          <Box className="box-header-dialog" p={1} m={1}>
            <Box p={1} flexGrow={1} className="box-title">
              <h2 className="title-dialog">Piada {title}</h2>
            </Box>
            <Box p={1} flexGrow={1} className="box-created">
              <span className="created-dialog">
                {date
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join()
                  .replace(/,/g, "/")}
              </span>
            </Box>
          </Box>
          <Box className="dialog-description">
            <p>{description}</p>
          </Box>
          <Box p={1} m={1} className="box-footer-dialog">
            <Box p={1} m={1} flexGrow={2} className="box-info-dialog">
              <Box p={1} flexGrow={1} className="box-dialog-name">
                <span className="user-name">{name}</span>
              </Box>
              <Box p={1} m={1} flexGrow={2} className="box-actions-dialog">
                <Box p={1} flexGrow={2} className="box-action">
                  <input type="button" value={like} className="button-like" />
                </Box>
                <Box p={1} flexGrow={2} className="box-action">
                  <input
                    type="button"
                    value={dislike}
                    className="button-dislike"
                  />
                </Box>
              </Box>
            </Box>
            <Box p={1} flexGrow={3} className="box-published-dialog">
              <span className="created">
                Publicada em{" "}
                {date
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join()
                  .replace(/,/g, "/")}
              </span>
            </Box>
          </Box>
          <br />
          <hr className="line" />
          <div align="center">
            <Box p={1} m={1} flexGrow={2} className="dialog-reactions">
              <Box p={1} flexGrow={2} className="box-action">
                <input
                  type="button"
                  value="Chorei"
                  className="dialog-like"
                  onClick={() => addLike()}
                />
              </Box>
              <Box p={1} flexGrow={2} className="box-action">
                <input
                  type="button"
                  value="Nem ri"
                  className="dialog-dislike"
                  onClick={() => removeLike()}
                />
              </Box>
            </Box>
          </div>
        </DialogContentText>
      </Dialog>
    </div>
  );
};
export default JokesList;
