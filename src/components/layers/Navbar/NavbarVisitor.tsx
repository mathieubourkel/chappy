import {Navbar,Typography} from "@material-tailwind/react";
import logo from "../../../assets/img/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ButtonTypeEnum } from "../../../services/enums/button.type";
import MagicButton from "../../elements/Buttons/MagicButton";

export function NavbarVisitor() {
 
  const currentURL = useLocation();

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-text-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography className="mr-4 cursor-pointer m-auto">
        <Link to='/'>
          <img src={logo} alt={"logo de Chappy"} />
          </Link>
        </Typography>
        
        <div className="flex items-center gap-4">
        <NavLink to={"/login"}>
          <div className="flex items-center gap-x-1">
            {currentURL.pathname !== "/login" && (
              <MagicButton type={ButtonTypeEnum.CONNEXION} wrap='lg'/>
            )}
          </div>
          </NavLink>
        </div>
      </div>
    </Navbar>
  );
}
