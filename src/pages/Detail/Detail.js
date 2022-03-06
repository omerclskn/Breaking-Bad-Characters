import "./Detail.scss";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Button, Modal, message } from "antd";
import Loading from "../../components/Loading";
import { AlertTwoTone } from "@ant-design/icons";

const Detail = () => {
  const { char_id } = useParams();
  const [character, setCharacter] = useState();
  const [death, setDeath] = useState();
  const [deathCount, setDeathCount] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    await axios(`${process.env.REACT_APP_BASE_API_URL}/characters/${char_id}`)
      .then(({ data }) => {
        setCharacter(data[0]);
        getDeathInfo(data[0]);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  };

  const getDeathInfo = async ({ name }) => {
    await axios(`${process.env.REACT_APP_BASE_API_URL}/death?name=${name}`)
      .then(({ data }) => setDeath(data[0]))
      .catch((err) => message.error(err));

    await axios(
      `${process.env.REACT_APP_BASE_API_URL}/death-count?name=${name}`
    )
      .then(({ data }) => setDeathCount(data[0]?.deathCount))
      .catch((err) => message.error(err));
  };

  const handleClickGetQuote = async () => {
    message.loading("I would like to say...");

    const { data } = await axios(
      `${process.env.REACT_APP_BASE_API_URL}/quote/random?author=${character.name}`
    );
    message.destroy();

    data.length > 0
      ? Modal.info({
          title: character.name,
          content: <p>{data[0].quote}</p>,
          onOk: () => {},
        })
      : message.error("I have nothing to say...");
  };

  useEffect(() => {
    fetchData();
  }, [char_id]); // eslint-disable-line

  return (
    <div className="character-wrapper">
      <h1>{character?.name}</h1>
      <div className="divider" />
      {loading && <Loading />}
      {character && (
        <div className="character-card">
          {deathCount > 0 && (
            <div className="death-count">
              <p>{deathCount}</p>
              <div>
                <AlertTwoTone twoToneColor="#ff4d4f" />
                <p>Kills</p>
              </div>
            </div>
          )}
          <img src={character?.img} alt={character?.name} />

          <div className="character-info">
            <h2>Character Info</h2>
            <p>Status: {character?.status}</p>
            <p>A.K.A : {character?.nickname}</p>
            <p>Birthday : {character?.birthday}</p>
            <p>{character?.occupation?.join(", ")}</p>
            <p>{character?.portrayed}</p>
          </div>
          {death && (
            <div className="death-info">
              <h2>Death Info</h2>
              <h4>{death?.death}</h4>
              <p>Death Responsible : {death?.responsible}</p>
              <p>Cause of Death : {death?.cause}</p>
              <p>Last Words : {death?.last_words}</p>
            </div>
          )}
          <Button danger type="primary" onClick={handleClickGetQuote}>
            Get Quote
          </Button>
        </div>
      )}
    </div>
  );
};

export default Detail;
