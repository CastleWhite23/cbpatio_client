import './FormSolicita.css'
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// import { Api } from "../../services/Api"
// import { AuthContext } from "../../context/context"
// import { useToast } from '@chakra-ui/react'


import { useContext, useState } from "react";

const schema = yup.object({
    username: yup.string().min(6, "Seu time deve ter no mínimo 6 caracteres").max(30, "Caracteres acima do permitido!").required('Este campo não pode estar vazio!'),
}).required()


const FormSolicita = () => {

    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });


    const onSubmit = (formData) => {
        handleNewTeam(formData)
    }


    // TEM QUE TER VERIFICAÇÃO SE O USERNAME JA FAZ PARTE DO TIME
    return (
        <>
            <div className="form-solicita">
                <h1>Adicionar Jogador</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <Input name="username" control={control} placeholder="username" />
                        <p className="error">{errors?.username?.message}</p>
                    </div>
                    <Button text={loading ? 'Carregando...' : 'Enviar Solicitação'} variant="green" type="submit" width="100%" height={'60px'} />
                </form>
                <p>Quado você digitar o <span>nome do usuário</span> e clicar em <span>enviar</span>, chegará uma <span>notificação</span> a ele, se ele <span>aceitar</span> fará parte do time!</p>
            </div>
        </>
    )
}

export { FormSolicita }