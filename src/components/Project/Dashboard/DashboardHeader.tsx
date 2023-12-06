import calendar from "../../../assets/img/calendar.webp";
import CreateButton from "../elements/Buttons/CreateButton";
import { Link } from "react-router-dom";
import RejoinModal from "../Modals/RejoinModal";

type Props = {
  nbProj:number
};

export default function DashboardHeader({ nbProj}: Props) {
  console.log("DashBoardHeaderComposant")
  const userName = localStorage.getItem('name')
  return (
    <section className="b1-header mt-20 md:flex justify-between gap-10">
      <div className="basis-1/2">
        {nbProj > 0 ? (
          <div className="flex justify-center mb-5">
            <h1>Bienvenue {userName}</h1>
          </div>
        ) : (
          <div className="flex justify-center mb-5 mt-40">
            <h1>Bienvenue {userName}</h1>
          </div>
        )}

        {nbProj > 0 ? (
          <div>
            <div className="bg-white border rounded-xl p-5 mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            </div>
            <div className="bg-white border rounded-xl p-5">
              Acutalité: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Eius obcaecati, perferendis dignissimos quae veritatis vitae
              fugiat ratione dolorum similique aspernatur deserunt suscipit
              quaerat porro iure cumque maiores quibusdam est aliquam?
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-10">
            <Link to='/create-project'>
            <CreateButton value="Créer un projet"/>
            </Link>
            <RejoinModal value="Rejoindre un projet" />
          </div>
        )}
      </div>
      <div className="basis-1/2">
        <img src={calendar} />
      </div>
    </section>
  );
}
