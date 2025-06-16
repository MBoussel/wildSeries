import type { ReactNode } from "react";

type SerieType = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: string;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: SerieType;
  onSubmit: (serie: SerieType) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const poster = formData.get("poster") as string;
        const country = formData.get("country") as string;
        const year = formData.get("year") as string;

        onSubmit({ title, synopsis, poster, country, year });
      }}
    >
      <label>
        Titre :
        <input type="text" name="title" defaultValue={defaultValue.title} />
      </label>
      <label>
        Synopsis :
        <textarea name="synopsis" defaultValue={defaultValue.synopsis} />
      </label>
      <label>
        Affiche :
        <input type="text" name="poster" defaultValue={defaultValue.poster} />
      </label>
      <label>
        Pays :
        <input type="text" name="poster" defaultValue={defaultValue.country} />
      </label>
      <label>
        Année :
        <input type="text" name="poster" defaultValue={defaultValue.year} />
      </label>

      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
