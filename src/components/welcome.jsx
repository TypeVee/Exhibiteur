import "./main.css";
import { useEffect, useState } from "react";
import { countAll } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function () {
  const [totalCount, setTotalCount] = useState("...");
  const navigate = useNavigate();

  useEffect(() => {
    countAll().then((count) => {
      setTotalCount(count.toLocaleString());
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const searchString = new FormData(e.target).get("searchQuery");
    if(searchString == "" || searchString == null ){
    }
    else{navigate(`/search?q=${searchString}&page=1`)};
  }
  
  return (
    <div className="window">
      <h3 className="centered">Welcome to Exhibiteur</h3>
      <p className="centered">
        An art browser with {totalCount} specimens to view
      </p>
      <br></br>
      <form className="centered" onSubmit={handleSubmit}>
        <input
          name="searchQuery"
          style={{ maxWidth: "500px", width: "80vw" }}
        />
        <br />
        <button>Search</button>
      </form>
    </div>
  );
}
