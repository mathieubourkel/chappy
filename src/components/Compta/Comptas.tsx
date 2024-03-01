/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Card, CardBody } from '@material-tailwind/react';
import { useFetch } from '../../hooks/useFetch';
import { ApiPathEnum } from '../../services/enums/api.path.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { intCompta } from '../../services/interfaces/intCompta';
import ModalAddCompta from './ModalAddCompta';
import CardCompta from './CardCompta';
import { useState } from 'react';
import MagicButton from '../elements/Buttons/MagicButton';
import { ButtonTypeEnum } from '../../services/enums/button.type';

export default function Comptas({idProject}:{idProject: string}) {

    const {data, updateData, handleErrorAndLoading} = useFetch(`${ApiPathEnum.COMPTA}/project/${idProject}`);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const calculateTotal = () => {
        return data.reduce(
            (total:number, compta:intCompta) => total + Math.floor(compta.price.fullTaxPrice),0);
        };
    
    return (
        <section>
            <article className={"w-full flex justify-between gap-5 items-center"}>
                <h2>Mes achats</h2>
                <MagicButton type={ButtonTypeEnum.ADD} handleClick={handleOpen}/>
                <ModalAddCompta setComptas={updateData} comptas={data} open={open} handleOpen={handleOpen}/>
            </article>
            {handleErrorAndLoading()}
            {data && 
            <article className="mt-5 mb-20">
                {data.map((compta: intCompta) => (
                    <CardCompta
                        key={compta._id}
                        compta={compta}
                        comptas={data}
                        setComptas={updateData}
                    />
                ))}

                {data.length == 0 && (
                <Alert
                    icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                    className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5">   
                    Aucun achat recensé.
                </Alert>
                )}

                <Card className="custom-card-purchase-all mb-8">
                    <CardBody className="flex lg:justify-between justify-center flex-wrap">
                        <span className="text-marine-300 uppercase font-extrabold mr-5">
                            TOTAL
                        </span>
                        <div className="border rounded-xl text-light-100 bg-brick-300">
                        <span className={"mx-7"}>{calculateTotal()} €</span>
                        </div>
                    </CardBody>
                </Card>
            </article>}
        </section>
  )
}
