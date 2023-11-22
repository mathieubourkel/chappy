import { useState } from "react";
import { intUsers } from "../../services/interfaces/intUser";

export default function FormUser(props: any) {
  const { handleSubmitUser } = props;

  const [form, setForm] = useState<intUsers>({
    lastname: "",
    firstname: "",
    email: "",
    address: "",
    postal: 0,
    city: "",
  });

  return (
    <>
      <form>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={form.lastname}
          placeholder="Nom"
        />
        <br />
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={form.firstname}
          placeholder="Prénom"
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          placeholder="E-mail"
        />
        <br />
        <input
          type="text"
          name="address"
          id="address"
          value={form.address}
          placeholder="Adresse"
        />
        <br />
        <input
          type="number"
          name="postal"
          id="postal"
          value={form.postal}
          placeholder="75000"
        />
        <br />
        <input
          type="text"
          name="city"
          id="city"
          value={form.city}
          placeholder="Paris"
        />
      </form>
    </>
  );
}
