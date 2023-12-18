import { useFormik } from "formik";
import * as Yup from "yup";
import { intForms } from "../../services/interfaces/intForms";
import { Button, Radio, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";



export default function FormGlobal() {
  const [selectedOption, setSelectedOption] = React.useState("");
  // const [formValues, setFormValues] = useState<any>({});
  const validationGlobal = Yup.object({
    lastname: Yup.string()
      .min(2, "Votre nom doit contenir au minimum 2 charactères")
      .required("Ce champ est requis"),

    firstname: Yup.string()
      .min(2, "Votre prénom doit contenir au minimum 2 charactères")
      .required("Ce champ est requis"),

    email: Yup.string()
      .email(
        "L'adresse email doit contenir '@' et une extension '.com', '.fr' "
      )
      .required("Ce champ est requis"),

    address: Yup.string().required("Ce champ est requis"),

    postal: Yup.string()
      .min(5, "Le code postal doit contenir 5 charactères")
      .max(5, "Le code postal doit contenir 5 charactères")
      .required("Ce champ est requis"),

    city: Yup.string()
      .min(2, "Ce champ doit contenir au minimum 2 charactères")
      .required("Ce champ est requis"),

    phone: Yup.string().required("Ce champ est requis"),

    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au minimum 8 charactères")
      .required("Ce champ est requis"),

    checkPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas.")
      .required("Ce champ est requis"),

    companyName: Yup.string(),
    

    siret: Yup.string(),

    companySActivity: Yup.string(),

    companyNameEmployee: Yup.string(),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik<intForms>({
    initialValues: {
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
      siret: "",
      companySActivity: "",
      companyNameEmployee: "",
    },
    onSubmit: (values) => {
      console.log("submit", values);
      // setFormValues(formValues);

    },
    validationSchema: validationGlobal,
  });

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);

    // if (value === "neitherOfTheTwo") {
    //   setSelectedOption("");
    // }
  };
console.log(values)
  return (
    <>
      <form className="w-full flex gap-5 flex-col items-center" onSubmit={handleSubmit}>
        <div className="sm:flex sm:gap-x-5">
          <div className={"mb-5 w-full"}>
            <Input
              label="Nom"
              type="text"
              name="lastname"
              id="lastname"
              className={"!bg-light-100"}
              value={values.lastname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.lastname && (
              <small className={"text-brick-400 font-bold"}>
                {errors.lastname}
              </small>
            )}
          </div>

          <div className={"mb-5 w-full"}>
            <Input
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              className={"!bg-light-100"}
              value={values.firstname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.firstname && (
              <small className={"text-brick-400 font-bold"}>
                {errors.firstname}
              </small>
            )}
          </div>
        </div>
        <div className={"mb-5 w-full"}>
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            className={"!bg-light-100"}
            value={values.email}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.email && (
            <small className={"text-brick-400 font-bold"}>{errors.email}</small>
          )}
        </div>
        <div className={"mb-5 w-full"}>
          <Input
            label="Adresse"
            type="text"
            name="address"
            id="address"
            className={"!bg-light-100"}
            value={values.address}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.address && (
            <small className={"text-brick-400 font-bold"}>
              {errors.address}
            </small>
          )}
        </div>

        <div className="sm:flex sm:gap-x-5">
          <div className={"mb-5 w-full"}>
            <Input
              label="Code postal"
              type="text"
              name="postal"
              id="postal"
              className={"!bg-light-100"}
              value={values.postal !== null ? values.postal : ""}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.postal && (
              <small className={"text-brick-400 font-bold"}>
                {errors.postal}
              </small>
            )}
          </div>
          <div className={"mb-5 w-full"}>
            <Input
              label="Ville"
              type="text"
              name="city"
              id="city"
              className={"!bg-light-100"}
              value={values.city}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.city && (
              <small className={"text-brick-400 font-bold"}>
                {errors.city}
              </small>
            )}
          </div>
        </div>
        <div className={"mb-5 w-full"}>
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            id="phone"
            className={"!bg-light-100"}
            value={values.phone !== null ? values.phone : ""}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.phone && (
            <small className={"text-brick-400 font-bold"}>{errors.phone}</small>
          )}
        </div>
        <div className="sm:flex sm:gap-x-5">
          <div className={"mb-5 w-full"}>
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              className={"!bg-light-100"}
              value={values.password}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.password && (
              <small className={"text-brick-400 font-bold"}>
                {errors.password}
              </small>
            )}
          </div>
          <div className={"mb-5 w-full"}>
            <Input
              label="Confirmer du mot de passe"
              type="password"
              name="checkPassword"
              id="checkPassword"
              className={"!bg-light-100"}
              value={values.checkPassword}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.checkPassword && (
              <small className={"text-brick-400 font-bold"}>
                {errors.checkPassword}
              </small>
            )}
          </div>
        </div>
        <div className="flex justify-center my-5 mx-5">
          <div className="flex justify-center flex-col">
            <Radio
              label={
                <Typography className="flex font-medium">
                  Ajouter mon entreprise
                </Typography>
              }
              name="check"
              value="chekCompany"
              crossOrigin={undefined}
              checked={selectedOption === "chekCompany"}
              onChange={() => handleRadioChange("chekCompany")}
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
        {selectedOption === "chekCompany" && (
          <div>
            <Input
              label="Nom de l'entreprise"
              type="text"
              name="companyName"
              id="companyName"
              value={values.companyName}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companyName && <small>{errors.companyName}</small>}
            <Input
              label="SIRET"
              type="text"
              name="siret"
              id="siret"
              value={values.siret !== null ? values.siret : ""}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.siret && <small>{errors.siret}</small>}
            <Input
              label="Décrire vos activités"
              name="companySActivity"
              id="companySActivity"
              value={values.companySActivity}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companySActivity && (
              <small>{errors.companySActivity}</small>
            )}
          </div>
        )}

        {selectedOption === "checkEmployee" && (
          <>
            <Input
              label="Nom de l'entreprise"
              type="text"
              name="companyNameEmployee"
              id="companyNameEmployee"
              value={values.companyNameEmployee}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companyNameEmployee && (
              <small>{errors.companyNameEmployee}</small>
            )}
          </>
        )}

        {/* {selectedOption === "neitherOfTheTwo" && null} */}

        <div className={"m-auto my-5"}>
          <Button className={"bg-brick-400"} type="submit">
            <FontAwesomeIcon icon={faPaperPlane} className={"text-sm mr-3"} />
            Envoyer
          </Button>
        </div>
      </form>
    </>
  );
}
