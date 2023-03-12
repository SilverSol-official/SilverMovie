import styles from "../styles/Home.module.css";
import MovieCard from "./Card";
import { FC, useEffect} from "react";
import { fetchSearch } from "../rdx/Features/movie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../rdx/Store/store";

const MainBody:FC = () => {
  const { searchStatus, searchError } = useSelector((state:RootState) => state.movie);
  const searchResult = useSelector((state:RootState) => state.movie.searchResult);
  const dispatch:AppDispatch = useDispatch();

  console.log("status:", searchStatus);
  console.log("error:", searchError);

  useEffect(() => {
    dispatch(fetchSearch("Iron man"));
  }, [dispatch]);

  const statusCheck = () => {
    
    if (searchStatus === "loading" && searchError === null) {
      return <h2 className="text-center mt-5">Loading...</h2>;
    } else if (searchError != null) {
      return (
        <h2 className="text-center mt-5">An error occured: {searchError}</h2>
      );
    } else if (searchResult.Search) {
      return (
        <div className={styles.mainBody}>
          <div className="container">
            <div className="row">
              {searchResult.Search.map((item) => {
                return (
                  <div key={item.imdbID} className="col-sm-2 mt-1 mb-1">
                    <MovieCard  item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <h2 className="text-center mt-5">nothing was found</h2>;
    }
  
  };

  return <>{statusCheck()}</>;
};

export default MainBody;
