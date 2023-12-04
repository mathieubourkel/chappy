/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCategories } from "../../../../services/api/category";
import {
  intCategories,
  intCategory,
  intTask,
} from "../../../../services/interfaces/intProject";

type Props = {
  task: intTask;
  classState: string;
  isOwner: boolean;
  handleCategorie: any;
};

export default function SelectCategory(props: Props) {
  console.log("SelectCategoryComposant")
  const { task, classState, isOwner, handleCategorie} = props;
  const [selected, setSelected] = useState<string | undefined>(task.category.name);
  const [categories, setCategorie] = useState<intCategories>([]);
  function handleCategorieEnf(value:any) {
    value == '1' && setSelected("Electricite")
    value == '2' && setSelected("Plomberie")
    value == '3' && setSelected("Maçonnerie")
    value == '4' && setSelected("Menuiserie")
    
    handleCategorie(value);
    console.log(value)
  }
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
          onChange={(value: any) => handleCategorieEnf(value)}
        >
          {categories.map((categorie: intCategory, indexMap: number) => (
            <Option key={indexMap} value={categorie.id?.toString()}>
              {categorie.name}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{task.category.name}</Typography>
        </div>
      )}
    </div>
  );
}
