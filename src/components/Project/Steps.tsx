import {  intStep, intSteps } from '../../services/interfaces/intProject'

type Props = {
    steps:intSteps
}

export default function Steps({steps}:Props) {

  return (
    <section className="bloc-2">
        <div className="steps-project-header">
            <div className="steps-project-header-title">
                <h1>Les jalons</h1>
            </div>
            <div className="steps-project-header-buttons">
                <button className="button-project ">Créer</button>
                <button className="button-project">Filtres</button>
            </div>
        </div>
        <div className="steps-project-steps">
            {steps.map((step:intStep, index:number) => (
                <div className="step" key={index}>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
                <button>Accéder</button>
            </div>
            ))}
            
        </div>
    </section>
  )
}
