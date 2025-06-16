import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import ProgramForm from "../components/ProgramForm";

type SerieType = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: string;
};

function ProgramEdit() {
  const navigate = useNavigate();
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
      <ProgramForm
        defaultValue={serie}
        onSubmit={(serieData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${serie.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serieData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${serie.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
