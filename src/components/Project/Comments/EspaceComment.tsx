import { useEffect, useState } from "react";
import {
  intComment,
  intComments,
} from "../../../services/interfaces/intProject";
import DisplayMore from "./DisplayMore";
import CreateComment from "./CreateComment";
import CommentCard from "../Cards/CommentCard";
import { getComments } from "../../../services/api/comments";

type Props = {
  table: string;
  idParent: string | undefined;
};

export default function EspaceComment({ table, idParent }: Props) {
  console.log("EspaceCommentComposant");
  const [display, setDisplay] = useState<boolean>(false);
  const [comments, setComments] = useState<intComments>([]);
  const [reload, setReload] = useState(false);

  const handleReload = () => (reload ? setReload(false) : setReload(true));

  useEffect(() => {
    async function fetchData() {
      const result = await getComments(table, idParent);
      setComments(result);
    }

    fetchData();
  }, [reload, idParent, table]);

    return (
      <section className="mb-20">
        <h2>Espace commentaire</h2>
        {comments.length > 0 && 
          <>
          <div className="flex flex-col">
            {display ? (
              comments.map((comment: intComment) => (
                <CommentCard comment={comment} key={comment.id} />
              ))
            ) : (
              <CommentCard comment={comments[0]} key={comments[0].id} />
            )}
          </div>
    
        <div className="flex justify-center">
          <DisplayMore state={display} setState={setDisplay} />
        </div>
        </>
        }
        <CreateComment
          idParent={idParent}
          table={table}
          handleReload={handleReload}
        />
      </section>
    );
}
