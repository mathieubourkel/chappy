/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { intStep } from "../../../services/interfaces/intStep";

export default function NestedMenuSidebar(props: any) {
  const { steps } = props;
  return (
    <>
      {steps &&
        steps.map((step: intStep) => (
          <div
            className={"py-1.5 px-3 text-light-200 text-sm sidebar-list"}
            key={step._id}
          >
            <NavLink to={"/project/step"} className={"flex items-center"}>
              <FontAwesomeIcon
                icon={faChartPie}
                strokeWidth={3}
                className="h-4 w-4 pl-5 text-marine-100"
              />
              <div className={"ml-3"}>{step.name}</div>
            </NavLink>
          </div>
        ))}
    </>
  );
}
