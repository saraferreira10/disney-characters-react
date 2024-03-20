import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const URL = input !== "" ? `https://api.disneyapi.dev/character?name=${input}` : "https://api.disneyapi.dev/character";

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);

        if (!res.ok) throw new Error("Something is wrong...")

        const data = await res.json();

        if (data != null) {
          setCharacters(data.data);
          console.log(data.data)
        } else {
          setCharacters([]);
        }

        setIsLoading(false);

      } catch (err) {
        console.error(err.message)
      }
    }

    fetchData();
  }, [input]);

  return (
    <div className="App" >
      <div>
        <code>disney / {input.length > 0 ? input : "your fav character"}</code>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "90vw" }}>
        <h3>✨ Fetching DisneyAPI ✨</h3>
        <input type="text" name="name" id="name"
          style={{ padding: "0.5rem", outline: "none", fontStyle: "italic", fontSize: "10px", fontWeight: "bold" }}
          placeholder="search your fav character... ❤️"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {!isLoading ?
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {characters.length > 0 && characters.map((character) => (
              <Character key={character._id} character={character} />
            ))}
          </ul> :
          <Loader />
        }
      </div>
      <a href="https://disneyapi.dev/">THANKS TO API DOCS ❤️</a>

    </div>
  );
}

function Character({ character }) {
  const films = character.films;
  const shortFilms = character.shortFilms;
  const tvShows = character.tvShows;

  return (
    <li style={{
      width: "100%", display: "flex", justifyContent: "center", textAlign: "justify", gap: "1rem", backgroundColor: "#1a1a1a", padding: "2rem", borderRadius: "1rem"
    }}>
      <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
        <img src={character.imageUrl} height="120rem" width="100rem" />
      </div>
      <div style={{ width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "1rem" }}>
        <div >
          <p><strong>{character.name}</strong></p>
          <a href={character.sourceUrl}>Wiki Page</a>
        </div>

        {films.length > 0 && <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "0.3rem" }}>
          <code>{character.name} / films</code>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {films.map((film) => (
              <Badge key={film}>{film}</Badge>
            ))}
          </div>
        </div>}

        {shortFilms.length > 0 && <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "0.3rem" }}>
          <code>{character.name} / short films</code>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {shortFilms.map((film) => (
              <Badge key={film}>{film}</Badge>
            ))}
          </div>
        </div>}

        {tvShows.length > 0 && <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "0.3rem" }}>
          <code>{character.name} / tv shows</code>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {tvShows.map((film) => (
              <Badge key={film}>{film}</Badge>
            ))}
          </div>
        </div>}
      </div>
    </li>
  );
}

function Badge({ children }) {
  const style = {
    padding: "2px 5px",
    width: "fit-content",
    backgroundColor: "gray",
    fontSize: "9px",
    borderRadius: "3px",
    fontWeight: "bold"
  }

  return <div style={style}>{children}</div>
}

function Loader() {
  return <div className="loader"></div>
}