import FormUser from "../../components/Authentication/formUser";
import { NavbarVisitor } from "../../components/Navbar/NavbarVisitor";

export default function Signup(props: any) {
  const { handleSubmitUser } = props;
  return (
    <>
      <header>
        <NavbarVisitor />
      </header>
      <main>
        <h1>Créer mon compte</h1>
        <FormUser handleSubmitUser={handleSubmitUser} />
        <input type="checkbox" name="checkboxCompagny" />
      </main>
    </>
  );
}
