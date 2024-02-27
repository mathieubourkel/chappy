import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "../../../hooks/useFetch";
import { ApiPathEnum } from "../../../services/enums/api.path.enum";
import { intDocument } from "../../../services/interfaces/intDocument";
import DocumentCard from "./DocumentCard";
import DocumentsAdd from "./DocumentsAdd";
import { Alert } from "@material-tailwind/react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function Documents({idProject}:{idProject:string}) {

    const {data, updateData, handleErrorAndLoading} = useFetch(`${ApiPathEnum.DOCUMENT}/project/${idProject}`);
    return (
        <>
            <section className={"w-full flex justify-between gap-5 items-center"}>
                <div>
                    <h2>Les documents</h2>
                </div>
                <DocumentsAdd setDocuments={updateData} documents={data}/>
            </section>
            {handleErrorAndLoading()}
            {data && 
            <div className="mt-5 mb-20">
                {data.map((document: intDocument) => (
                    <DocumentCard
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
            </div>}
        </>
    )
}
