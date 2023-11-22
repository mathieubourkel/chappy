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
  });

  function handleSubmit(evt: any) {
    evt.preventDefault();
    handleSubmitUser(form);
    setForm({
      lastname: "",
      firstname: "",
      email: "",
      address: "",
      postal: 0,
      city: "",
    });
  }

  function handleChange(evt: any) {
    const {name, value} = evt.target;
    setForm({...form, [name]: value})
  }

  

  return (
    <>
     <article className="flex justify-center">
     <form className="w-96 flex gap-5 flex-col items-center" onSubmit={(evt)=>{handleSubmit(evt)}}>
        <div className="flex gap-2">
        <Input
          label="Nom"
          type="text"
          name="lastname"
          id="lastname"
          value={form.lastname}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
        
        <Input
          label="Prénom"
          type="text"
          name="firstname"
          id="firstname"
          value={form.firstname}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
     
        </div>
        <Input
          label="E-mail"
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
      
        <Input
          label="Adresse"
          type="text"
          name="address"
          id="address"
          value={form.address}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
      
        <div className="flex gap-2">
        <Input
          label="Code postal"
          type="number"
          name="postal"
          id="postal"
          value={form.postal}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
   
        <Input
          label="Ville"
          type="text"
          name="city"
          id="city"
          value={form.city}
          onChange={(evt) => { handleChange(evt); } } crossOrigin={undefined}        />
        </div>
      </form>
     </article>
    </>
  );
}
