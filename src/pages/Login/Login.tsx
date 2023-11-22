import FormLogin from "../../components/Authentication/formLogin";

export default function Login(props: any) {
  const {handleSubmitLogin}= props;
  return (
    <>
    <h1>Se connecter</h1>
    <br />
    <FormLogin handleSubmitLogin={handleSubmitLogin} />
    </>
  )
}