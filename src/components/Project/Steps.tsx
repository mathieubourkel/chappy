import {  intStep, intSteps } from '../../services/interfaces/intProject'

type Props = {
    steps:intSteps
}

export default function Steps({steps}:Props) {

  return (
    <div className="steps-project">
        <div className="steps-project-header">
            <div className="steps-project-header-title">
                <h1>Les jalons</h1>
            </div>
            <div className="steps-project-header-buttons">
                <button>Créer</button>
                <button>Filtres</button>
            </div>
        </div>
        <div className="steps-project-steps">
            {steps.map((step:intStep) => (
                <div className="step">
                <h3>{step.name}</h3>
                <p>{step.description}</p>
                <button>Accéder</button>
            </div>
            ))}
            
        </div>
    </div>
  )
}