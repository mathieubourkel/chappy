import FormUser from "../../components/Authentication/formUser";
import {
  Button,
  Radio,
  Typography
} from "@material-tailwind/react";
import FormCompagny from "../../components/Authentication/formCompany";
import FormEmployee from "../../components/Authentication/formEmployee";
import React from "react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";


export default function Signup() {
  // const { handleSubmitUser } = props;
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);

    if (value === "neitherOfTheTwo") {
      setSelectedOption("");
    }
  };
  return (
     
      <main className={"m-5 flex flex-col justify-center items-center"}>
        <section className={"flex flex-col mt-5"}>
          <Typography
              variant="h1"
              className={"font-bold text-center"}
          >
            Créer son compte
          </Typography>

        <FormUser />

        <div className="flex justify-center my-5 mx-5">
          <div className="flex justify-center flex-col">
            <Radio
              label={
                <Typography className="flex font-medium">
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
                <Typography className="flex font-medium">
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
                <Typography  className="flex font-medium">
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

          <div className={"m-auto my-5"}>
            <Button className={"bg-brick-400"}><FontAwesomeIcon icon={faPaperPlane} className={"text-sm mr-3"} type={"submit"} />
              Envoyer
            </Button>
          </div>
        </section>
      </main>
  );
}
