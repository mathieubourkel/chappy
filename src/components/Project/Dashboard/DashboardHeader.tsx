import { intUser } from "../../../services/interfaces/intProject";
import calendar from "../../../assets/img/calendar.webp";
type Props = {
  user: intUser;
};

export default function DashboardHeader({ user }: Props) {
  return (
    <section className="b1-header mt-20 md:flex justify-between gap-10">
      <div className="basis-1/2">
        <div className="flex justify-center mb-5">
            <h1>Bienvenue {user.name}</h1>
        </div>
        <div className="bg-white border rounded-xl p-5 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          
        </div>
        <div className="bg-white border rounded-xl p-5">
          Acutalité: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eius obcaecati, perferendis dignissimos quae veritatis vitae fugiat
          ratione dolorum similique aspernatur deserunt suscipit quaerat porro
          iure cumque maiores quibusdam est aliquam?
        </div>
      </div>
      <div className="basis-1/2">
        <img src={calendar} />
      </div>
    </section>
  );
}
