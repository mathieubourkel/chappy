export const formatDate = (date:Date):string => {
    const annee = date.getFullYear();
    const mois = ("0" + (date.getMonth() + 1)).slice(-2);
    const jour = ("0" + date.getDate()).slice(-2);
    return annee + "-" + mois + "-" + jour;
}