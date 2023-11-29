import FormUser from "../../components/Authentication/formUser";
import { NavbarVisitor } from "../../components/Navbar/NavbarVisitor";
import { Radio, Typography } from "@material-tailwind/react";
import FormCompagny from "../../components/Authentication/formCompany";
import FormEmployee from "../../components/Authentication/formEmployee";
import React from "react";

export default function Signup(props: any) {
  const { handleSubmitUser } = props;
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);

    if (value === "neitherOfTheTwo") {
      setSelectedOption("");
    }
  };
  return (
    <>
     
      <main>
        <h1>Créer mon compte</h1>

        <FormUser />

        <div className="w-30 flex justify-center">
          <div className="flex justify-center flex-col">
            <Radio
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  Ajouter mon entreprise
                </Typography>
              }
              name="check"
              value="chekCompagny"
              crossOrigin={undefined}
              checked={selectedOption === "chekCompagny"}
              onChange={() => handleRadioChange("chekCompagny")}
            />
            <Radio
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  Je suis salarié d'une entreprise enregistrée
                </Typography>
              }
              name="check"
              value="checkEmployee"
              crossOrigin={undefined}
              checked={selectedOption === "checkEmployee"}
              onChange={() => handleRadioChange("checkEmployee")}
            />
            <Radio
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  Aucun des deux
                </Typography>
              }
              name="check"
              value="neitherOfTheTwo"
              crossOrigin={undefined}
              checked={selectedOption === "neitherOfTheTwo"}
              onChange={() => handleRadioChange("neitherOfTheTwo")}
            />
          </div>
        </div>
        {selectedOption === "chekCompagny" && <FormCompagny />}
        {selectedOption === "checkEmployee" && <FormEmployee />}
        {selectedOption === "neitherOfTheTwo" && null}

        <article className="flex justify-center">
          <div className="flex items-center ">
            <button type="submit" className="bg-marine-300 text-white">
              S'inscrire
            </button>
          </div>
        </article>
      </main>
    </>
  );
}
