import classes from "./search.module.css";
const SearchBar = () => (
  <form className={classes.search}>
    <input
      type="text"
      className={classes.input}
      placeholder="Search over 100 dishes"
    />
    <input type="submit" className={classes.btn} />
  </form>
);
export default SearchBar;
