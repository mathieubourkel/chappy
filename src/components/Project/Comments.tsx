import { intComment, intComments } from "../../services/interfaces/intProject"

type Props = {
    comments: intComments
}

export default function Comments({comments}:Props) {

  return (

    <div className="project-comments">
        <div className="project-comments-header">
            <h2>Espace commentaire</h2>
        </div>
        <div className="comments">
            {comments.map((comment:intComment) => (
                <h2>{comment.author}</h2>
            ))}
            <button>Afficher plus</button>
        </div>
        <div className="comments-modify">
            <div className="EXTERNAL">

            </div>
            <div className='comments-modify-buttons'>
                <button>Annuler</button>
                <button>Envoyer</button>
            </div>
        </div>
    </div>
  )
}
