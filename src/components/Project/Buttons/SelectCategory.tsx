/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCategories } from "../../../services/api/category";
import {
  intCategories,
  intCategory,
} from "../../../services/interfaces/intProject";

type Props = {
  state: any;
  classState: string;
  isOwner: boolean;
  index: number;
};

export default function SelectCategory(props: Props) {
  const { state, classState, isOwner, index } = props;
  const [selected, setSelected] = useState<string>(state[index].category.name);
  const [categories, setCategorie] = useState<intCategories>([]);

  useEffect(() => {
    async function getCat() {
      const result = await getCategories();
      setCategorie(result);
    }
    getCat();
  }, []);

  return (
    <div className={classState}>
      {isOwner ? (
        <Select
          defaultValue={selected}
          label={selected}
          onChange={(value: any) => setSelected(value)}
        >
          {categories.map((categorie: intCategory, indexMap: number) => (
            <Option key={indexMap} value={categorie.name}>
              {categorie.name}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{state[index].category.name}</Typography>
        </div>
      )}
    </div>
  );
}
