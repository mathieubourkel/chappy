/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Radio,
  Input,
  Typography,
  Card,
  Alert,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addUserAndCompanyToBDD, addUserToBDD } from "../../services/api/users";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectionEnum } from "../../services/enums/selection.enum";
import { useState } from "react";
import { intRegister } from "../../services/interfaces/intAuth";
import { intAlert } from "../../services/interfaces/generique.interface";

export default function SignupPage() {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<SelectionEnum>(
    parseInt(location.hash.replace(/\D/g, ""), 10)
  );
  const navigate = useNavigate();
  const [alert, setAlert] = useState<intAlert>({open: false, message:'', color:'green'})
  const validationGlobal = Yup.object({
    userInfos: Yup.object().shape({
      lastname: Yup.string()
        .min(2, "Votre nom doit contenir au minimum 2 charactères")
        .required("Ce champ est requis"),
      firstname: Yup.string()
        .min(2, "Votre prénom doit contenir au minimum 2 charactères")
        .required("Ce champ est requis"),
      email: Yup.string()
        .email("L'adresse email doit contenir '@'")
        .required("Ce champ est requis"),
      address: Yup.string().required("Ce champ est requis"),
      zip: Yup.string().required("Ce champ est requis"),
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
    }),

    companyInfos: Yup.object().shape({
      name: Yup.string(),
      siret: Yup.string(),
      description: Yup.string(),
    }),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik<intRegister>(
    {
      initialValues: {
        userInfos: {
          lastname: "",
          firstname: "",
          email: "",
          address: "",
          zip: "",
          status: 0,
          city: "",
          phone: "",
          password: "",
          checkPassword: "",
        },
        companyInfos: {
          name: "",
          additionalInfos: "",
          description: "",
        },
      },

      validateOnChange: false,
      validationSchema: validationGlobal,

      onSubmit: async (values) => {
        try {
          if (Object.keys(errors).length > 0) return;
          if (values.companyInfos && values.companyInfos.name != '') {
            await addUserAndCompanyToBDD(values.userInfos, values.companyInfos);
          } else {
            await addUserToBDD(values.userInfos);
          }
          navigate("/login#created");
        } catch (error:any) {
          if (error.response.data.message.error === "USER-ALRDY-EXIST") {
           setAlert({open: true, message:"L'adresse email renseignée existe déjà", color: 'red'})
          }
          console.error(error);
        }
      },
    }
  );

  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <Alert color={alert.color} className='m-1 sticky top-0 my-10' open={alert.open} onClose={() => setAlert({...alert, open:false})}>
            {alert.message}
          </Alert>
      <Typography variant="h1" className={"font-bold text-center"}>
        Créer son compte
      </Typography>
      <section className={"mt-10 lg:w-[30lvw] m-auto"}>
        <form onSubmit={handleSubmit} noValidate>
            <div className="md:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
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
                {errors.userInfos && errors.userInfos.lastname && (
                  <small className={"text-brick-400 font-bold"}>
                    {errors.userInfos.lastname}
                  </small>
                )}
              </div>

              <div className={"mb-5 w-full"}>
                <Input
                  label="Prénom"
                  type="text"
                  name="userInfos.firstname"
                  id="firstname"
                  className={"!bg-light-100"}
                  value={values.userInfos.firstname}
                  onChange={handleChange}
                  crossOrigin={undefined}
                  aria-required
                />
                
                {errors.userInfos && errors.userInfos.firstname && (
                  <small className={"text-brick-400 font-bold"}>
                    {errors.userInfos.firstname}
                  </small>
                )}
              </div>
              </div>
              <div className="flex gap-5 mb-5 flex-wrap">
                <div className="w-full">
                  <Input
                    label="E-mail"
                    type="email"
                    name="userInfos.email"
                    id="email"
                    className={"!bg-light-100"}
                    value={values.userInfos.email}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.email && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.email}
                    </small>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    label="Adresse"
                    type="text"
                    name="userInfos.address"
                    id="address"
                    className={"!bg-light-100"}
                    value={values.userInfos.address}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.address && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.address}
                    </small>
                  )}
                </div>
                </div>

                <div className="md:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                  <Input
                    label="Code postal"
                    type="text"
                    name="userInfos.zip"
                    id="zip"
                    className={"!bg-light-100"}
                    value={
                      values.userInfos.zip !== null ? values.userInfos.zip : ""
                    }
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.zip && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.zip}
                    </small>
                  )}
                </div>
                <div className="w-full mb-5">
                  <Input
                    label="Ville"
                    type="text"
                    name="userInfos.city"
                    id="city"
                    className={"!bg-light-100"}
                    value={values.userInfos.city}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.city && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.city}
                    </small>
                  )}
                </div>
                </div>
                <div className="mb-5 w-full">
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="userInfos.phone"
                    id="phone"
                    className={"!bg-light-100"}
                    value={
                      values.userInfos.phone !== null
                        ? values.userInfos.phone
                        : ""
                    }
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.phone && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.phone}
                    </small>
                  )}
                </div>
                <div className="md:flex sm:gap-x-5">
                <div className="mb-5 w-full">
                  <Input
                    label="Mot de passe"
                    type="password"
                    name="userInfos.password"
                    id="password"
                    className={"!bg-light-100"}
                    value={values.userInfos.password}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.password && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.password}
                    </small>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label="Confirmer du mot de passe"
                    type="password"
                    name="userInfos.checkPassword"
                    id="checkPassword"
                    className={"!bg-light-100"}
                    value={values.userInfos.checkPassword}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    aria-required
                  />
                  {errors.userInfos && errors.userInfos.checkPassword && (
                    <small className={"text-brick-400 font-bold"}>
                      {errors.userInfos.checkPassword}
                    </small>
                  )}
                </div>
                </div>
                
          <article>
          <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Je suis un professionnel
            </Typography>
            <div className="flex justify-center my-5 mx-5">
              <Radio
                label={
                  <Typography className="flex font-medium">
                    Ajouter mon entreprise
                  </Typography>
                }
                name="check"
                value="checkCompany"
                crossOrigin={undefined}
                checked={selectedOption === SelectionEnum.OWNER}
                onChange={() => setSelectedOption(SelectionEnum.OWNER)}
              />
              <Radio
                label={
                  <Typography className="flex font-medium">
                    Je suis salarié
                  </Typography>
                }
                name="check"
                value="checkEmployee"
                crossOrigin={undefined}
                checked={selectedOption === SelectionEnum.EMPLOYEE}
                onChange={() => setSelectedOption(SelectionEnum.EMPLOYEE)}
              />
              </div>

              {selectedOption === SelectionEnum.OWNER && (
                <Card
                  className={"w-full p-10 flex flex-col gap-5 taskDescription"}
                >
                  <Input
                    label="Nom de l'entreprise"
                    type="text"
                    name="companyInfos.name"
                    id="name"
                    value={values.companyInfos.name}
                    aria-required
                    onChange={handleChange}
                    crossOrigin={undefined}
                  />
                  {errors.companyInfos && (
                    <small>{errors.companyInfos.name}</small>
                  )}

                  <Input
                    label="SIRET"
                    type="text"
                    name="companyInfos.additionalInfos"
                    id="additionalInfos"
                    value={values.companyInfos.additionalInfos}
                    aria-required
                    onChange={handleChange}
                    crossOrigin={undefined}
                  />
                  {errors.companyInfos && (
                    <small>{errors.companyInfos.additionalInfos}</small>
                  )}
                  <Input
                    label="Décrire vos activités"
                    name="companyInfos.description"
                    id="description"
                    value={values.companyInfos.description}
                    aria-required
                    onChange={handleChange}
                    crossOrigin={undefined}
                  />
                  {errors.companyInfos && (
                    <small>{errors.companyInfos.description}</small>
                  )}
                </Card>
              )}

              {selectedOption === SelectionEnum.EMPLOYEE && (
                <Card className={"w-full p-10 taskDescription"}>
                  <Input
                    label="Nom de l'entreprise"
                    type="text"
                    name="companyNameEmployee"
                    id="companyNameEmployee"
                    aria-required
                    onChange={handleChange}
                    crossOrigin={undefined}
                  />
                </Card>
              )}
              </article>

              <div className={"flex justify-center my-20"}>
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
