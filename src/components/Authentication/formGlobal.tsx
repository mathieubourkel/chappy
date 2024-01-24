import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Radio,
  Input,
  Typography,
  Card,
} from "@material-tailwind/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addCompanyToBDD, addUserToBDD } from "../../services/api/users";
import { useNavigate } from "react-router-dom";
import { intRegister } from "../../services/interfaces/intUser";

export default function FormGlobal() {
  const [selectedOption, setSelectedOption] = React.useState("");
  const navigate = useNavigate();
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

    zip: Yup.string()
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

    name: Yup.string(),

    siret: Yup.string(),

    description: Yup.string(),

    companyNameEmployee: Yup.string(),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik<intRegister>({
    initialValues: {
      userInfos: {
        lastname: "",
        firstname: "",
        email: "",
        address: "",
        zip: null,
        city: "",
        phone: null,
        password: "",
        checkPassword: "",
      },
      companyInfos: {
        name: "",
        siret: "",
        description: "",
      },
      companyNameEmployee: "",
    },
    onSubmit: async (values) => {
      // setFormValues(formValues);

      try {
        // values.username = values.email;
        await addUserToBDD(values.userInfos);
        if (selectedOption === "checkCompany") {
          await addCompanyToBDD(values.companyInfos);
        }
        navigate("/login");
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire");
      }
    },
    validationSchema: validationGlobal,
  });

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);

    // if (value === "neitherOfTheTwo") {
    //   setSelectedOption("");
    // }
  };
  return (
    <>
      <form
        className="w-full flex gap-5 flex-col items-center mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-5 flex-wrap md:flex-nowrap">
          <div className={"w-full"}>
            <Input
              label="Nom"
              type="text"
              name="userInfos.lastname"
              id="lastname"
              className={"!bg-light-100"}
              value={values.userInfos.lastname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>
                {errors.userInfos.lastname}
              </small>
            )}
          </div>

          <div className={"w-full"}>
            <Input
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              className={"!bg-light-100"}
              value={values.userInfos.firstname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>
                {errors.userInfos.firstname}
              </small>
            )}
          </div>
        </div>
        <div className={"w-full"}>
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            className={"!bg-light-100"}
            value={values.userInfos.email}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.userInfos && (
            <small className={"text-brick-400 font-bold"}>{errors.userInfos.email}</small>
          )}
        </div>
        <div className={"w-full"}>
          <Input
            label="Adresse"
            type="text"
            name="address"
            id="address"
            className={"!bg-light-100"}
            value={values.userInfos.address}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.userInfos && (
            <small className={"text-brick-400 font-bold"}>
              {errors.userInfos.address}
            </small>
          )}
        </div>

        <div className="flex gap-5 flex-wrap md:flex-nowrap">
          <div className={"w-full"}>
            <Input
              label="Code postal"
              type="text"
              name="zip"
              id="zip"
              className={"!bg-light-100"}
              value={values.userInfos.zip !== null ? values.userInfos.zip : ""}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>{errors.userInfos.zip}</small>
            )}
          </div>
          <div className={"w-full"}>
            <Input
              label="Ville"
              type="text"
              name="city"
              id="city"
              className={"!bg-light-100"}
              value={values.userInfos.city}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>
                {errors.userInfos.city}
              </small>
            )}
          </div>
        </div>
        <div className={"w-full"}>
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            id="phone"
            className={"!bg-light-100"}
            value={values.userInfos.phone !== null ? values.userInfos.phone : ""}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.userInfos && (
            <small className={"text-brick-400 font-bold"}>{errors.userInfos.phone}</small>
          )}
        </div>
        <div className="flex gap-5 flex-wrap md:flex-nowrap">
          <div className={"w-full"}>
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              className={"!bg-light-100"}
              value={values.userInfos.password}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>
                {errors.userInfos.password}
              </small>
            )}
          </div>
          <div className={"w-full"}>
            <Input
              label="Confirmer du mot de passe"
              type="password"
              name="checkPassword"
              id="checkPassword"
              className={"!bg-light-100"}
              value={values.userInfos.checkPassword}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.userInfos && (
              <small className={"text-brick-400 font-bold"}>
                {errors.userInfos.checkPassword}
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
          <Card className={"w-full p-10 flex flex-col gap-5 taskDescription"}>
            <Input
              label="Nom de l'entreprise"
              type="text"
              name="name"
              id="name"
              value={values.companyInfos.name}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companyInfos && <small>{errors.companyInfos.name}</small>}

            <Input
              label="SIRET"
              type="text"
              name="siret"
              id="siret"
              value={values.companyInfos.siret !== null ? values.companyInfos.siret : ""}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companyInfos && <small>{errors.companyInfos.siret}</small>}
            <Input
              label="Décrire vos activités"
              name="description"
              id="description"
              value={values.companyInfos.description}
              aria-required
              onChange={handleChange}
              crossOrigin={undefined}
            />
            {errors.companyInfos && <small>{errors.companyInfos.description}</small>}
          </Card>
        )}

        {selectedOption === "checkEmployee" && (
          <Card className={"w-full p-10 taskDescription"}>
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
          </Card>
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
