export default function FormUser() {
    return (
        <>
        <form >
            <input type="text" name="lastname" id="lastname" value={form.lastname} placeholder="Nom" />
            <br />
            <input type="text" name="firstname" id="firstname" value={form.firstname} placeholder="Prénom" />
            <br />
            <input type="email" name="email" id="email" value={form.email} placeholder="E-mail" />
            <br />
            <input type="text" name="address" id="address" value={form.address} placeholder="Adresse" />

        </form>
        </>
    )
}