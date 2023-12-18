
import {  Typography } from "@material-tailwind/react";
import FormGlobal from "../../components/Authentication/formGlobal";

export default function Signup() {
  
  return (
    <main className={"m-5 flex flex-col justify-center items-center"}>
      <section className={"flex flex-col mt-5"}>
        <Typography variant="h1" className={"font-bold text-center"}>
          Créer son compte
        </Typography>

    <FormGlobal />
       
      </section>
    </main>
  );
}
