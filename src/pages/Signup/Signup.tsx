import * as React from "react";
import FormUser from "../../components/Authentication/formUser";
import { NavbarVisitor } from "../../components/Navbar/NavbarVisitor";
import { Checkbox, Typography } from "@material-tailwind/react";

export default function Signup(props: any) {
  const { handleSubmitUser } = props;
  const [checked, setChecked] = React.useState(false);
  const handleChangeCompagny = () => {
    setChecked(!checked)
  }
  const [check, setCheck] = React.useState(false);
  const handleChangeEmployee = () => {
    setCheck(!check)
  }
  return (
    <>
      <header>
        <NavbarVisitor />
      </header>
      <main>
        <h1>Créer mon compte</h1>
        <FormUser handleSubmitUser={handleSubmitUser} />

        <article className="w-30 flex justify-center">
        <form className="flex justify-center flex-col">
        <Checkbox label={<Typography color="blue-gray" className="flex font-medium">Ajouter mon entreprise</Typography>} name="checkCompagny" id="checkCompagny" crossOrigin={undefined} checked={checked} onChange={handleChangeCompagny} /> 
         <Checkbox label={<Typography color="blue-gray" className="flex font-medium">Je suis salarié d'une entreprise enregistrée</Typography>} name="checkEmployee"  id="chekEmployee" crossOrigin={undefined} checked={check} onChange={handleChangeEmployee} /> 
        </form>
        </article>
      </main>
    </>
  );
}
