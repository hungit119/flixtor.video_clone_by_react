import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./FilmsFilter.module.scss";
import SessionsLayout from "../../Layouts/SessionsLayout";
import SessionsHome from "../../SessionsHome";
import ListMovies from "../../ListMovies/ListMovies";
import FilterBar from "../../FilterBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFilmsFilter } from "../../../redux/actions/filmsAction";
import { filmsFilterSelector } from "../../../redux/selectors";
const cx = classNames.bind(styles);

const FilmFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    state: { genre, type, country, quantity, year },
  } = location;

  const filmsFilter = useSelector(filmsFilterSelector);

  const getFilmsFilter = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/films/filter",
        {
          filters: {
            genre,
            type,
            country,
            quantity,
            year,
          },
        }
      );
      if (response.data.success) {
        dispatch(setFilmsFilter(response.data.filmsFilter));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getFilmsFilter();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <SessionsHome title={"Filter Movies"}>
        <>
          <FilterBar />
          <ListMovies items={filmsFilter} pagnition={true} />
        </>
      </SessionsHome>
    </div>
  );
};

export default FilmFilter;
