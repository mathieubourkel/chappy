import FormUser from "../../components/Authentication/formUser";
import { NavbarVisitor } from "../../components/Navbar/NavbarVisitor";
import { Radio, Typography } from "@material-tailwind/react";

export default function Signup(props: any) {
  const { handleSubmitUser } = props;
  return (
    <>
      <header>
        <NavbarVisitor />
      </header>
      <main>
        <h1>Créer mon compte</h1>
        <FormUser handleSubmitUser={handleSubmitUser} />

        <div className="w-30 flex justify-center">
          <div className="flex justify-center flex-col">
            <Radio
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  Ajouter mon entreprise
                </Typography>
              }
              name="checkCompagny"
              ripple={true}
              crossOrigin={undefined}
            />
            <Radio
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  Je suis salarié d'une entreprise enregistrée
                </Typography>
              }
              name="checkEmployee"
              ripple={false}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </main>
    </>
  );
}
