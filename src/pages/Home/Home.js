import "./Home.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharactersAsync } from "../../redux/characterSlice";
import Masonry from "react-masonry-css";
import Loading from "../../components/Loading";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter/Filter";

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const filterName = useSelector((state) => state.characters.filterName);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharactersAsync({ page, filterName }));
    }
  }, [dispatch, status, filterName]); // eslint-disable-line

  return (
    <div>
      <Filter />
      <div className="character-list">
        <Masonry
          breakpointCols={5}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {characters?.map((character) => (
            <Link key={character.char_id} to={`/char/${character.char_id}`}>
              <h2>{character.name}</h2>
              <img src={character.img} alt={character.name} />
            </Link>
          ))}
        </Masonry>
        {hasNextPage ? (
          characters.length > 0 && (
            <div className="load-button-wrapper">
              <Button
                onClick={() =>
                  dispatch(fetchCharactersAsync({ page, filterName }))
                }
                type="primary"
                loading={status === "loading"}
                disabled={!hasNextPage}
              >
                Load More
              </Button>
            </div>
          )
        ) : (
          <i style={{ color: "#eceaea", padding: '20px' }}>There is no more data to load</i>
        )}
        {status === "loading" && page === 0 && <Loading />}
      </div>
    </div>
  );
};

export default Home;
