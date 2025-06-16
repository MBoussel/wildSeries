import { useEffect, useState } from "react";
import { useParams } from "react-router";

type SerieType = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
};

function ProgramDetail() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null as null | SerieType);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: SerieType) => {
        setSerie(data);
      });
  }, [id]);

  return (
    serie && (
      <div>
        <h1>{serie.title}</h1>
        <img src={serie.poster} alt={serie.title} />
        <p>Synopsis : {serie.synopsis}</p>
      </div>
    )
  );
}

export default ProgramDetail;
