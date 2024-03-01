/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState  } from "react";
import {  InputEvent, intRangeDate, intSafeSelect, intSelect, intSelects } from "../services/interfaces/generique.interface";

type Props = {
  form: object,
  handleChange: (e:InputEvent) => void;
  handleSelect: (select:intSafeSelect, label:string) => void;
  handleMultiple: (arraySelect:intSelects, label:string, aliasLabel:string, aliasValue?:string) => void;
  handleDate: (select:intRangeDate, start:string, end?:string) => void;
}

export const useMyForm = ():Props =>{

  const [form, setForm] = useState<object>({})

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (select: intSafeSelect, label:string) => {
    setForm({ ...form, [label]: select.value });
  };

  const handleMultiple = (arraySelect:intSelects, label:string, aliasLabel:string, aliasValue?:string) => {
    const goodArray: any = arraySelect.map((select: intSelect) => ({[aliasValue || 'id']:select.value, [aliasLabel]: select.label}));
    setForm({ ...form, [label]: goodArray });
  }

  const handleDate = (select: intRangeDate, start:string, end?:string) => {
    setForm({ ...form, [start]: select.startDate, [end|| "endDate"]: select.endDate });
  };

  return {form, handleChange, handleSelect, handleMultiple, handleDate}
}
