import FormUser from "../../components/Authentication/formUser";
import { Button, Radio, Typography } from "@material-tailwind/react";
import FormEmployee from "../../components/Authentication/formEmployee";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import FormCompany from "../../components/Authentication/formCompany";
import { intForms } from "../../services/interfaces/intForms";



export default function Signup() {
  const [selectedOption, setSelectedOption] = React.useState("");
const [formValues, setFormValues] = useState<any>({});

  const {handleChange, handleSubmit, values} = useFormik<intForms>({
    initialValues:{
      lastname: "",
      firstname: "",
      email: "",
      address: "",
      postal: null,
      city: "",
      phone: null,
      password: "",
      checkPassword: "",
      companyName: "",
        siret: null,
        companySActivity:"",
        companyNameEmployee: "",
    },
    onSubmit: (formValues) => {
      console.log("submit", formValues)
      setFormValues(formValues)
    }
  });

  
  

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);

    if (value === "neitherOfTheTwo") {
      setSelectedOption("");
    }
  };

  React.useEffect(() => {
    console.log("Form Values", formValues);
  }, [formValues]);

  return (
    <main className={"m-5 flex flex-col justify-center items-center"}>
      <section className={"flex flex-col mt-5"}>
        <Typography variant="h1" className={"font-bold text-center"}>
          Créer son compte
        </Typography>

       <form className="w-full flex gap-5 flex-col items-center"   onSubmit={handleSubmit}>
       <FormUser handleChange={handleChange} values={values} />

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
        <Typography className="flex font-medium">
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
{selectedOption === "chekCompagny" && <FormCompany handleChange={handleChange} values={values} />}
{selectedOption === "checkEmployee" && <FormEmployee handleChange={handleChange} values={values} />}
{selectedOption === "neitherOfTheTwo" && null}

<div className={"m-auto my-5"}>
  <Button className={"bg-brick-400"} type="submit">
    <FontAwesomeIcon
      icon={faPaperPlane}
      className={"text-sm mr-3"}
      
    />
    Envoyer
  </Button>
</div>
       </form>
      </section>
    </main>
  );
}
