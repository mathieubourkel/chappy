import { Typography } from "@material-tailwind/react";
import logo from "./../../assets/img/icon_logo_footer.png";

export default function Footer() {
  return (
      <footer className="w-full bg-white p-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between border-t-text-200">
          <img src={logo} alt="logo-ct" className="w-10" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                A propos
              </Typography>
            </li>
            <li>
              <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                Mentions légales
              </Typography>
            </li>
            <li>
              <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-brick-400 focus:text-brick-300"
              >
                Contactez-nous
              </Typography>
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