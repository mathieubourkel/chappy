import { useState } from "react";
import { intUsers } from "../../services/interfaces/intUser";
import { Input } from "@material-tailwind/react";

export default function FormUser(props: any) {
  const { handleSubmitUser } = props;

  const [form, setForm] = useState<intUsers>({
    lastname: "",
    firstname: "",
    email: "",
    address: "",
    postal: 0,
    city: "",
    phone: 0,
    password: "",
    checkPassword: "",
  });

  const [errors, setErrors] = useState<{ [key in keyof intUsers]?: string }>(
    {}
  );

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key in keyof intUsers]?: string } = {};

    if (form.lastname.length < 2) {
      newErrors.lastname = "Le nom doit contenir au moins 2 caractères";
      valid = false;
    }

    if (form.firstname.length < 2) {
      newErrors.firstname = "Le prénom doit contenir au moins 2 caractères";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "L'e-mail doit être une adresse e-mail valide";
      valid = false;
    }

    if (form.password !== form.checkPassword) {
      newErrors.password = "Les mots de passe ne correspondent pas";
      newErrors.checkPassword = "Les mots de passe ne correspondent pas";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (validateForm()) {
      handleSubmitUser(form);
      setForm({
        lastname: "",
        firstname: "",
        email: "",
        address: "",
        postal: 0,
        city: "",
        phone: 0,
        password: "",
        checkPassword: "",
      });
      setErrors({});
    }
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  }

  return (
    <>
      <article className="flex justify-center">
        <form
          className="w-96 flex gap-5 flex-col items-center"
          onSubmit={(evt) => {
            handleSubmit(evt);
          }}
        >
          <div className="flex gap-2">
            <Input
              label="Nom"
              type="text"
              name="lastname"
              id="lastname"
              value={form.lastname}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />

            <Input
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              value={form.firstname}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />
          </div>
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={(evt) => {
              handleChange(evt);
            }}
            crossOrigin={undefined}
            required
            aria-required
          />

          <Input
            label="Adresse"
            type="text"
            name="address"
            id="address"
            value={form.address}
            onChange={(evt) => {
              handleChange(evt);
            }}
            crossOrigin={undefined}
            required
            aria-required
          />

          <div className="flex gap-2">
            <Input
              label="Code postal"
              type="number"
              name="postal"
              id="postal"
              value={form.postal}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />

            <Input
              label="Ville"
              type="text"
              name="city"
              id="city"
              value={form.city}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />
          </div>
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={(evt) => {
              handleChange(evt);
            }}
            crossOrigin={undefined}
            required
            aria-required
          />
          <div className="flex gap-2">
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />

            <Input
              label="Comfirmer du mot de passe"
              type="password"
              name="checkPassword"
              id="checkPassword"
              value={form.checkPassword}
              onChange={(evt) => {
                handleChange(evt);
              }}
              crossOrigin={undefined}
              required
              aria-required
            />
          </div>
        </form>
      </article>
    </>
  );
}
