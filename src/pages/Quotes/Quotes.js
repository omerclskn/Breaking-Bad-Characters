import "./Quotes.scss";

import React, { useEffect, useState } from "react";
import { getQuotesAsync } from "../../redux/quotesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { message } from "antd";

const Quotes = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.items);
  const status = useSelector((state) => state.quotes.status);

  const [charId, setCharId] = useState();

  const handleClick = async ({ author }) => {
    message.loading("Loading...");
    await axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/characters?name=${author}`)
      .then(({ data }) => setCharId(data[0].char_id))
      .catch(() => message.error("Error Character Not Found"))
      .finally(() => message.destroy());
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getQuotesAsync());
    }
  }, [dispatch, status]); // eslint-disable-line

  return (
    <div className="quote-wrapper">
      <ul className="quote-list-wrapper">
        {status === "succeeded" &&
          quotes?.map((quote) => (
            <li key={quote.quote_id}>
              <span onClick={() => handleClick(quote)} className="quote-title">
                {quote.author + ": "}
              </span>
              <q className="quote-word"> {quote.quote} </q>
            </li>
          ))}
      </ul>
      {status === "succeeded" && (
        <div className="quote-info">{quotes.length} Quotes Found</div>
      )}
      {status === "loading" && <Loading />}
      {charId && <Redirect to={`/char/${charId}`} />}
    </div>
  );
};

export default Quotes;
