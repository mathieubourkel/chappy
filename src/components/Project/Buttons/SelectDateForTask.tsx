/* eslint-disable @typescript-eslint/no-explicit-any */
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  state: any;
  setState: any;
  index: number
};

export default function SelectDateForTask({ tasks, setTask, index }: Props) {
  const tmpDate = {
    startDate: tasks[index].startDate,
    endDate: tasks[index].estimEndDate,
  };


  const handleChange = (value: any) => {
    setTask({ ...state, estimEndDate: value.startDate });
  };

  return (
    <>
    {state.estimEndDate == null ? 
        <Datepicker
        inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
        asSingle={true}
        useRange={false}
        onChange={handleChange}
        value={tmpDate}
        placeholder={"Choisir une date de fin estimée"}
      /> :
    <Datepicker
      inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
      asSingle={true}
      useRange={false}
      onChange={handleChange}
      value={tmpDate}
      placeholder={"" + state.estimEndDate}
    />}
    </>
  );
}
