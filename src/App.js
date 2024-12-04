import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

function App() {
  const [points, setPoints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPoints() {
      setLoading(true);
      const { data: points, error } = await supabase.from("pontuacao").select();

      if (points.length > 1) {
        setPoints(points);
      } else {
        setError(`Fetching products failed! ${error}`);
      }
    }
    setLoading(false);

    getPoints();
  }, []);

  return (
    <div>
      <h1>Pontuação</h1>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      {!loading && !error && points.length > 0 &&
        points.map((p) => (
          <li key={p}>
            {`\t${p.id} \t${p.nome} \t${p.matricula} \t${p.created_at}`}
          </li>
        ))}
    </div>
  );
}

export default App;
