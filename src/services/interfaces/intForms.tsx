import { intCompany } from "./intCompany";
import { intEmployee } from "./intEmployee";
import { intUsers } from "./intUser";

export interface intForms extends intUsers, intCompany, intEmployee {}