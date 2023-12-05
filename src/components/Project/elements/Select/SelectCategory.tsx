/* eslint-disable @typescript-eslint/no-explicit-any */
import {intSelect} from "../../../../services/interfaces/intProject";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

type Props = {
  handleCategory: (categories: intSelect) => void;
  categories: Array<intSelect>
  defaultValue?: intSelect
};
let count = 1;
export default function SelectCategory({ handleCategory, categories, defaultValue }: Props) {
  console.log("SelectCategoryComposant" + count++);
  const animatedComponents = makeAnimated();

  const handleCategoriesEnfant = (value: intSelect) => {
    handleCategory(value);
  };

  return (
    <ReactSelect
      options={categories}
      className="rounded-xl"
      placeholder="Catégories"
      defaultValue={defaultValue}
      components={animatedComponents}
      onChange={(value: any) => handleCategoriesEnfant(value)}
    />
  );
}
