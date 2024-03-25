/* eslint-disable @typescript-eslint/no-explicit-any */
import {Radio, Typography,Card} from "@material-tailwind/react";
import { addUserAndCompanyToBDD, addUserToBDD } from "../../services/api/users";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectionEnum } from "../../services/enums/selection.enum";
import { useState } from "react";
import { FormEvent} from "../../services/interfaces/generique.interface";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { useMagicForm } from "../../hooks/useMagicForm";
import { useAlert } from "../../hooks/useAlert";
import { UserSchema } from "../../services/schemas/user.schema";
import { CompanySchema } from "../../services/schemas/company.schema";
import MagicInput from "../../components/elements/Input/MagicInput";

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
          <article>
              <div className="md:flex sm:gap-x-5">
                <div className={"mb-5 w-full"}>
                  <MagicInput name="lastname" label="Nom" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>
                <div className={"mb-5 w-full"}>
                  <MagicInput name="firstname" label="Prénom" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>
              </div>
              <div className="flex gap-5 mb-5 flex-wrap">
                <div className="w-full">
                  <MagicInput name="email" label="Email" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>

                <div className="w-full">
                  <MagicInput name="address" label="Adresse" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>
              </div>
              <div className="md:flex sm:gap-x-5">
                <div className={"mb-5 w-full"}>
                    <MagicInput name="zip" label="Code postal" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>
                <div className="w-full mb-5">
                  <MagicInput name="city" label="Ville" handleChange={handleChange} renderErrors={renderErrors}/>
                </div>
              </div>
              <div className="mb-5 w-full">
                <MagicInput name="phone" label="Téléphone" handleChange={handleChange} renderErrors={renderErrors}/>
              </div>
              <div className="md:flex sm:gap-x-5">
                <div className="mb-5 w-full">
                  <MagicInput name="password" label="Mot de passe" handleChange={handleChange} renderErrors={renderErrors} type='password'/>
                </div>
                <div className="w-full">
                  <MagicInput name="checkPassword" label="Confirmer le mot de passe" handleChange={handleChange} renderErrors={renderErrors} type='password'/>
                </div>
              </div>
            </article>
                
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
                  <MagicInput name="name" label="Nom de l'entreprise" handleChange={handleChange} renderErrors={renderErrors}/>
                  <MagicInput name="additionalInfos" label="SIRET" handleChange={handleChange} renderErrors={renderErrors}/>
                  <MagicInput name="description" label="Décrire vos activités" handleChange={handleChange} renderErrors={renderErrors}/>
                </Card>
              )}

              {selectedOption === SelectionEnum.EMPLOYEE && (
                <Card className={"w-full p-10 taskDescription"}>
                  <MagicInput name="companyNameEmployee" label="Nom de l'entreprise" handleChange={handleChange}/>
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
