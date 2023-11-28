/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";
import {intTask,intTasks} from "../../../services/interfaces/intProject";


type Props = {
  isOwner: boolean
};

export default function Steps({isOwner}: Props) {

  // Temp
  const [tasks, setTask] = useState<intTasks>([
    {name: "Nomtache1", description: "desription tache1", status: "En cours", users: ["Pierre1", "Paul1", "Jack1"],
    startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite", comments: ["comment1task1", "comment2task2"]},
    {name: "Nomtache2", description: "desription tache2", status: "Terminée", users: ["Pierre2", "Paul2", "Jack2"],
    startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite", comments: ["comment1task2", "comment2task2"]},
    {name: "Nomtache3", description: "desription tache3", status: "En attente", users: ["Pierre3", "Paul3", "Jack3"],
    startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite", comments: ["comment1task3", "comment2task3"]},
    {name: "Nomtache4", description: "desription tache4", status: "En cours", users: ["Pierre4", "Paul4", "Jack4"],
    startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite", comments: ["comment1task4", "comment2task4"]}
  ])


  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between items-center">
        <div className="b2-header-title">
          <h2>Les tâches</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
          <div>
            <StepCreateTask tasks={tasks} setTask={setTask} />
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <ul className="b2-body mt-5">
        {tasks.map((_task: intTask, index: number) => (
          <TaskCard
            key={index}
            index={index}
            tasks={tasks}
            setTask={setTask}
            isOwner={isOwner}
          />
        ))}
      </ul>
    </section>
  );
}
