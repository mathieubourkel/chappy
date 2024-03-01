import { useEffect, useState } from 'react';
import DisplayMore from './DisplayMore.tsx';
import CreateComment from './CreateComment.tsx';
import CommentCard from './CommentCard.tsx';
import { getComments } from '../../services/api/comments.ts';
import {
  Alert,
  Spinner,
} from '@material-tailwind/react';
import { RefCommentEnum} from '../../services/enums/comment.ref.enum.ts';
import { intComment, intComments } from '../../services/interfaces/intComment.tsx';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faBan
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  table: RefCommentEnum;
  idParent: string
};

export default function EspaceComment({ table, idParent }: Props) {
  const [display, setDisplay] = useState<boolean>(false);
  const [comments, setComments] = useState<intComments>([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const handleReload = () => setReload((bool) => !bool);


  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await getComments(RefCommentEnum[table], idParent);
        console.log(data)
        setComments(data);

      } catch (error) {
        setError(true)
      } finally {
        setBusy(false)
      }  
    }
    fetchData();
  }, [reload, idParent, table]);

  if (error) return (<div>Error Fetching Comments</div>)

    return (
      <section className="mb-20">
        <h2>Espace commentaire</h2>
        {busy ? (
          <div
              className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
        {comments.length > 0 && 
          <>
          <div className="flex flex-col mt-10">
            {display ? (
              comments.map((comment: intComment) => (
                <CommentCard comment={comment} key={comment._id} handleReload={handleReload} />
              ))
            ) : (
              <CommentCard comment={comments[0]} key={comments[0]._id} handleReload={handleReload} />
            )}
          </div>
    
        <div className="flex justify-center">
          <DisplayMore state={display} setState={setDisplay} />
        </div>
        </>
        }

          {comments.length == 0 && <><Alert
            icon={<FontAwesomeIcon icon={faBan} className={"text-brick-300 text-xl"}/>}
            className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-10"
          >
            Aucun commentaire trouvé.
          </Alert></>}
        </>)}
        <CreateComment
          idParent={idParent}
          table={table}
          handleReload={handleReload}
        />
      </section>
    );
}
