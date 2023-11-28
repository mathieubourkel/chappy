import { Typography } from "@material-tailwind/react";
import './footer.css';
import logo from "./../../assets/img/icon_logo_footer.png";
import {NavLink} from "react-router-dom";

export default function Footer() {
  return (
      <footer className="w-full bg-white p-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between sm:justify-evenly border-t-text-200">
          <img src={logo} alt="logo-chappy" className="w-10" />
          <ul className="flex flex-wrap gap-y-2 gap-x-8 justify-center">
            <li>
              <NavLink
                  to={"/about"}
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                A propos
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={"/legal-mentions"}
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                Mentions légales
              </NavLink>
            </li>
            <li>
              <NavLink
                  to={"/contact-us"}
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                Contactez-nous
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-text-200" />
        <Typography color="gray" className="text-center font-normal">
          &copy; 2023, CHAPPY
        </Typography>
      </footer>
  );
}