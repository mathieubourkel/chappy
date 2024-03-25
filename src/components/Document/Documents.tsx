import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "../../hooks/useFetch";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { intDocument } from "../../services/interfaces/intDocument";
import { Alert } from "@material-tailwind/react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import { useState } from "react";
import CardDocument from "./CardDocument";
import ModalAddDocument from "./ModalAddDocument";

export default function Documents({idProject}:{idProject:string}) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const {data, updateData, handleErrorAndLoading} = useFetch(`${ApiPathEnum.DOCUMENT}/project/${idProject}`);
    
    return (
        <section>
            <article className={"w-full flex justify-between gap-5 items-center"}>
                <h2>Mes documents</h2>
                <MagicButton type={ButtonTypeEnum.ADD} handleClick={handleOpen}/>
                <ModalAddDocument setDocuments={updateData} documents={data} open={open} handleOpen={handleOpen}/>
            </article>
            {handleErrorAndLoading()}
            {data && 
            <article className="mt-5 mb-20">
                {data.map((document: intDocument) => (
                    <CardDocument
                        key={document._id}
                        document={document}
                        setDocuments={updateData}
                        documents={data}
                    />
                ))}

            {data.length == 0 &&
            <Alert
                icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5">
                    Aucun document disponible.
            </Alert>}
            </article>}
        </section>
    )
}
