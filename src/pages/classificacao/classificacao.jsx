import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useContext, useEffect, useState} from 'react'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { Api } from '../../services/Api'
import "./classificacao.css"
import { LiveOn } from '../../components/liveOn/liveOn'
import { DividerComponent } from '../../components/Divider/DividerComponent'
import { AuthContext } from '../../context/context'

const Classificacao = () => {

    const [liveOn, setLiveOn] = useState(false)

    const {getUserData} = useContext(AuthContext)
  
    useEffect(() => {
        const getLiveOn = async () => {
            const {data: live} = await Api.get('/liveon')
            
            if(live[0].live_on == 's'){
                setLiveOn(true)
            }else{
                setLiveOn(false)
            }
            console.log(live[0].live_on)
        }

        const getGames = async () => {
            const games = await Api.get(`/campeonatos/time/times/jogos/${getUserData().id}`)
            console.log(games)
        }

        getGames()
        getLiveOn()
    }, []);

    return (
        <>
            {
                liveOn     
                
                ?
                <>
                    <PageTitle text={`LIVE ON`} icon={faBell}/>
                    <DividerComponent margin={"1rem 0"}/>
                    <LiveOn></LiveOn>
                </>
                
                :
                
                ""
            }

        </>
    )
}

export {Classificacao}
