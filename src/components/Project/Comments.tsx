import { useState } from "react";
import { intComment, intComments } from "../../services/interfaces/intProject"

type Props = {
    comments: intComments
}

export default function Comments({comments}:Props) {

    const [display, setDisplay] = useState<boolean>(false);

    function handleDisplay(){
        display ? setDisplay(false) : setDisplay(true)
    }

  return (

    <div className="project-comments">
        <div className="project-comments-header">
            <h2>Espace commentaire</h2>
        </div>
        <div className="comments">
            {display ? comments.map((comment:intComment, index:number) => (
                <div className="comment" key={index}>
                    <div className="comment-header">
                        <h2>{comment.author}</h2>
                        <button>Répondre</button>
                    </div>
                    <div>
                        <p>{comment.content}</p>
                    </div>
                    
                </div>
                
            )) : <div className="comment">
            <div className="comment-header">
                <h2>{comments[0].author}</h2>
                <button>Répondre</button>
            </div>
            <div>
                <p>{comments[0].content}</p>
            </div>
            
        </div>}
            
        </div>
        <div className="flex justify-center">
            <button
            onClick={handleDisplay} >
            {display ? <a>Afficher moins</a> : <a>Afficher plus</a>}
            </button>
        </div>
        <div className="comments-modify">
            <div className="EXTERNAL">
                <p>EXTERNAL WIDGET</p>
            </div>
            <div className='comments-modify-buttons flex justify-end mr-6'>
                <button className="m-4">Annuler</button>
                <button>Envoyer</button>
            </div>
        </div>
    </div>
  )
}
