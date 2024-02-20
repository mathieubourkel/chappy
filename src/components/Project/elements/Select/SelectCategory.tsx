/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { CategoriesEnum } from "../../../../services/enums/categories.enum";
import { useEffect, useState } from "react";
import { intSelect } from "../../../../services/interfaces/generique.interface";

type Props = {
  handleCategory: (category: intSelect) => void;
  value?: intSelect
};

export default function SelectCategory({ handleCategory, value }: Props) {
  const animatedComponents = makeAnimated();
  const [selected, setSelected] = useState<any>(value);
  function handleCategoryEnfant(value: intSelect) {
    setSelected(value);
    handleCategory(value);
  }

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <ReactSelect
      options={CategoriesEnum}
      className="rounded-xl border-select"
      placeholder="Catégorie"
      value={selected}
      defaultValue={CategoriesEnum[0]}
      components={animatedComponents}
      onChange={(value: any) => handleCategoryEnfant(value)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: 'rgba(126,55,47, 0.2)',
          primary:'rgba(126,55,47, 0.7)',
          primary50: 'rgba(126,55,47, 0.3)',
        },
          fontSize: '0.875rem',
      })}
    />
  );
}
