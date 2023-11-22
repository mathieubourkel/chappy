import { useState } from "react";

export default function FormLogin(props: any) {
    const {handleSubmitLogin} = props;

    type formulaire= {
        email: string,
        password: string,
    }

    const [form, setForm] = useState<formulaire>({
        email:"",
        password:"",
    })

    function handleSubmit(evt: any) {
        evt.preventDefault()
        handleSubmitLogin(form)
        setForm({email:"", password:""})
    }

    function handleChange(evt: any) {
        const {name, value} = evt.target;
        setForm({...form, [name]: value})
    }

    return (
        <>
        <form onSubmit= {(evt)=>{handleSubmit(evt)}} >
            <input type="email" placeholder="email" name="email" id="email" value={form.email} onChange={(evt)=>{handleChange(evt)}} />
            <br />
            <input type="password" placeholder="Mot de passe" name="password" id="password" value={form.password} onChange={(evt)=>{handleChange(evt)}} />
            <br />
            <input type="submit" value="Se connecter" />
        </form>
        </>
    )
} 