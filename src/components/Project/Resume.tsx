import { intProject } from '../../services/interfaces/intProject'

type Props = {
    project: intProject
}
export default function Resume({project}:Props) {
  return (
        <div className="header-project-nav">
            <div className="nav-project">
            <div className="nav-project-name">
                <h2>{project.name}</h2>
            </div>
            <div className="nav-project-buttons">
                <button>Code projet</button>
                <button>Les participants</button>
                <button>Mes documents</button>
                <button>Les achats</button>
            </div>
        </div>
        <div className="header-project-desc">
            <p>Description du projet : {project.description}</p>
        </div>
        <div className='header-project-planning'>
        </div>
        <div className="header-project-budget">
            <p>Budget : {project.budget}</p>
        </div>
        <div className="header-project-status">
            <p>{project.status}</p>
        </div>
        
    </div>
  )
}
