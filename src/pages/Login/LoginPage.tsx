import FormLogin from "../../components/Authentication/formLogin";

export default function LoginPage(props: any) {
  const {handleSubmitLogin}= props;
  return (
    <>
    <h1>Se connecter</h1>
    <br />
    <FormLogin handleSubmitLogin={handleSubmitLogin} />
    </>
  )
}