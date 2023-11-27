import { intProjects, intUser } from "../../../services/interfaces/intProject";
import calendar from "../../../assets/img/calendar.webp";
import CreateButton from "../Buttons/CreateButton";
import RejoinButton from "../Buttons/RejoinButton";

type Props = {
  user: intUser;
  projects: intProjects;
};

export default function DashboardHeader({ user, projects }: Props) {
  
  return (
    <section className="b1-header mt-20 md:flex justify-between gap-10">
      <div className="basis-1/2">
        {projects.length > 0 ? (
          <div className="flex justify-center mb-5">
            <h1>Bienvenue {user.name}</h1>
          </div>
        ) : (
          <div className="flex justify-center mb-5 mt-40">
            <h1>Bienvenue {user.name}</h1>
          </div>
        )}

        {projects.length > 0 ? (
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
          <div className="flex justify-center">
            <CreateButton value="Créer un projet"/>
            <RejoinButton value="Rejoindre un projet" />
          </div>
        )}
      </div>
      <div className="basis-1/2">
        <img src={calendar} />
      </div>
    </section>
  );
}
