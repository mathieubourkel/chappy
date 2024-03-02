/* eslint-disable @typescript-eslint/no-explicit-any */
import {Radio,Input,Typography,Card} from "@material-tailwind/react";
import { addUserAndCompanyToBDD, addUserToBDD } from "../../services/api/users";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectionEnum } from "../../services/enums/selection.enum";
import { useState } from "react";
import { FormEvent, InputEvent} from "../../services/interfaces/generique.interface";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { useMagicForm } from "../../hooks/useMagicForm";
import { useAlert } from "../../hooks/useAlert";
import { UserSchema } from "../../services/schemas/user.schema";
import { CompanySchema } from "../../services/schemas/company.schema";

export default function SignupPage() {
  const location = useLocation();
  const [renderAlert, newAlert] = useAlert()
  const [selectedOption, setSelectedOption] = useState<SelectionEnum>(
    parseInt(location.hash.replace(/\D/g, ""), 10)
  );
  const {form, handleChange, validateForm, renderErrors} = useMagicForm()
  const navigate = useNavigate()

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!validateForm(UserSchema)) return;
    try {
      if (form.name) {
        if (!validateForm(CompanySchema)) return;
        await addUserAndCompanyToBDD(form);
      } else {
        await addUserToBDD(form);
      }
      navigate("/login#created");
    } catch (error:any) {
      if (error.response.data.message.error === "USER-ALRDY-EXIST") {
       newAlert("L'adresse email renseignée existe déjà",'red')
      }
      console.error(error);
    }
  }

  return (
    <main className="sm:mx-20 mx-5 mt-10">
      {renderAlert}
      <Typography variant="h1" className={"font-bold text-center"}>
        Créer son compte
      </Typography>
      <section className={"mt-10 lg:w-[30lvw] m-auto"}>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <div className="md:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                <Input
                  label="Nom"
                  name="lastname"
                  id="lastname"
                  className={"!bg-light-100"}
                  onChange={(e: InputEvent) => handleChange(e)}
                  crossOrigin={undefined}
                />
                {renderErrors('lastname')}
              </div>

              <div className={"mb-5 w-full"}>
                <Input
                  label="Prénom"
                  name="firstname"
                  id="firstname"
                  className={"!bg-light-100"}
                  onChange={(e: InputEvent) => handleChange(e)}
                  crossOrigin={undefined}
                />
                {renderErrors('firstname')}

              </div>
              </div>
              <div className="flex gap-5 mb-5 flex-wrap">
                <div className="w-full">
                  <Input
                    label="E-mail"
                    name="email"
                    id="email"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('email')}
                </div>

                <div className="w-full">
                  <Input
                    label="Adresse"
                    name="address"
                    id="address"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('address')}
                </div>
                </div>

                <div className="md:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                  <Input
                    label="Code postal"
                    name="zip"
                    id="zip"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('zip')}
                </div>
                <div className="w-full mb-5">
                  <Input
                    label="Ville"
                    name="city"
                    id="city"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('city')}

                </div>
                </div>
                <div className="mb-5 w-full">
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    id="phone"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('phone')}
                </div>
                <div className="md:flex sm:gap-x-5">
                <div className="mb-5 w-full">
                  <Input
                    label="Mot de passe"
                    type="password"
                    name="password"
                    id="password"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('password')}
                </div>
                <div className="w-full">
                  <Input
                    label="Confirmer du mot de passe"
                    type="password"
                    name="checkPassword"
                    id="checkPassword"
                    className={"!bg-light-100"}
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('checkPassword')}
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
                <Card className={"w-full p-10 flex flex-col gap-5 taskDescription"}>
                  <Input
                    label="Nom de l'entreprise"
                    name="name"
                    id="name"
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('name')}

                  <Input
                    label="SIRET"
                    name="additionalInfos"
                    id="additionalInfos"
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('additionalInfos')}
                  <Input
                    label="Décrire vos activités"
                    name="description"
                    id="description"
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                  {renderErrors('description')}
                </Card>
              )}

              {selectedOption === SelectionEnum.EMPLOYEE && (
                <Card className={"w-full p-10 taskDescription"}>
                  <Input
                    label="Nom de l'entreprise"
                    type="text"
                    name="companyNameEmployee"
                    id="companyNameEmployee"
                    onChange={(e: InputEvent) => handleChange(e)}
                    crossOrigin={undefined}
                  />
                </Card>
              )}
              </article>
              <div className={"flex justify-center my-20"}>
                <MagicButton type={ButtonTypeEnum.CREATE} value={'Créer mon compte'}/>
                </div>
        </form>
      </section>
    </main>
  );
}
