/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getEmailToken, resetPwdWithEmail } from "../../services/api/users";
import NotFoundPage from "../../services/utils/NotFoundPage";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { intConfirmPwd } from "../../services/interfaces/intAuth";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

export default function ForgotPwd() {
  const navigate  = useNavigate()
    const { emailToken } = useParams();
    const [busy, setBusy] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [token, setToken] = useState<{id: number, emailToken: string}>({id:0, emailToken:''})

      const validationLogin = yup.object({
        newPwd: yup.string()
        .min(8, "Le mot de passe doit contenir au minimum 8 charactères")
        .required("Ce champ est requis"),
        confirmNewPwd: yup.string()
          .oneOf([yup.ref("newPwd")], "Les mots de passe ne correspondent pas.")
          .required("Le mot de passe est obligatoire."),
      });

      useEffect(() => {
        const getToken = async () => {
          try {
          const {data} = await getEmailToken(emailToken ||'');
          setToken(data)
          } catch (_error) {
            setError(true)
          } finally {
            setBusy(false)
          }   
        }
        getToken();
      }, [emailToken]);

      const formik = useFormik<intConfirmPwd>({
        initialValues: {
          newPwd: "",
          confirmNewPwd: "",
        },
        validateOnChange:false,
        validationSchema: validationLogin,
       onSubmit: async (values) => {
          if (Object.keys(formik.errors).length > 0) return;
          await resetPwdWithEmail({newPwd: values.newPwd, emailToken: token.emailToken})
          navigate('/')
        },
        
      });

    if (error) return (<NotFoundPage />)
  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
        {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <section className={"flex flex-col gap-y-3"}>
        <form onSubmit={formik.handleSubmit}>
          <article>
          <Typography variant="h2" className={"font-bold text-center mb-10"}>
              Réinitialisation du mot de passe
            </Typography>
            <div >
              <div className={"mb-5 w-full"}>
                <Input
                  label="Nouveau mot de passe"
                  className={"!bg-light-100 border-select placeholder:!text-text-100"}
                  name="newPwd"
                  id="newPwd"
                  type="password"
                  value={formik.values.newPwd}
                  crossOrigin={undefined}
                  onChange={formik.handleChange}
                />
                {formik.errors && formik.errors.newPwd && 
          <small className={"text-brick-400 font-bold"}>{formik.errors.newPwd}</small>}
                </div>
                <div>
                <Input
                  label="Confirmer le nouveau mot de passe"
                  className={"!bg-light-100 border-select placeholder:!text-text-100"}
                  name="confirmNewPwd"
                  id="confirmNewPwd"
                  value={formik.values.confirmNewPwd}
                  type="password"
                  crossOrigin={undefined}
                  onChange={formik.handleChange}
                />
                {formik.errors && formik.errors.confirmNewPwd && 
          <small className={"text-brick-400 font-bold"}>{formik.errors.confirmNewPwd}</small>}

              </div>
              <div className={"flex justify-center my-10"}>
                <MagicButton type={ButtonTypeEnum.SEND}/>
              </div>
            </div>
            
          </article>

        </form>
        </section>
      )}
    </main>
  )
}
