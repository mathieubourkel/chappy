import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjects, intUser } from "../../services/interfaces/intProject";
import axios from "axios";

export default function DashboardPage() {
  const user: intUser = { name: "Paul", company: "Compagnie créole" };
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState<intProjects>([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/projects")
      .then(({ data }) => setProjects(data.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  return (
    <main className="dashboard-page sm:mx-20 mx-5">
      <DashboardHeader user={user} projects={projects} />
      <DashboardProjects projects={projects} />
      <DashboardCollab projects={projects} />
    </main>
  );
}
