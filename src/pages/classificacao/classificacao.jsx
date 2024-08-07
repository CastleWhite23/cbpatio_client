import { faBell } from '@fortawesome/free-solid-svg-icons'
import { SpinnerCustom } from '../../components/Spinner/Spinner'
import React, { useContext, useEffect, useState } from 'react'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { Api } from '../../services/Api'
import "./classificacao.css"
import { LiveOn } from '../../components/liveOn/liveOn'
import { DividerComponent } from '../../components/Divider/DividerComponent'
import { AuthContext } from '../../context/context'
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'
import { formataData, formataHora, getData } from '../../services/getData'
import { CardClassificacao } from '../../components/CardClassificacao/CardClassificacao'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

const path = "https://cbpatio-production.up.railway.app"

const Classificacao = () => {


    const [loading, setLoading] = useState(false)
    const [liveOn, setLiveOn] = useState(false)
    const [games, setGames] = useState([])
    const [campeao, setCampeao] = useState([])

    const [eliminados, setEliminados] = useState([])
    const [data, setData] = useState([])

    const [esperando, setEsperando] = useState([])

    const { getUserData } = useContext(AuthContext)

    useEffect(() => {
        const getLiveOn = async () => {
            const { data: live } = await Api.get('/liveon')

            if (live[0].live_on == 's') {
                setLiveOn(true)
            } else {
                setLiveOn(false)
            }
        }

        const getGames = async () => {
            try {
                setLoading(true)
                const [gamesResponse, campeaoResponse, eliminadosResponse, esperandoResponse] = await Promise.all([
                    Api.get(`/campeonatos/time/times/jogos/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/campeao/user/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/eliminados/user/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/esperando/user/${getUserData().id}`)
                ]);

                const games = gamesResponse.data;
                const campeao = campeaoResponse.data;
                const eliminados = eliminadosResponse.data;
                const esperandoData = esperandoResponse.data

                setGames(games);
                setCampeao(campeao);
                setEliminados(eliminados);
                setEsperando(esperandoData)
                setLoading(false)
            } catch (error) {
                console.error("Ocorreu um erro ao carregar os dados:", error);
            }
        }

        getGames()
        getLiveOn()
        

    }, []);

    useEffect(() => {
        const getDateElim = async () => {
            const updatedEliminados = [];
            for (const eliminado of eliminados) {
                const eliminado_fase = eliminado.eliminado_em.split(' ');
                console.log(eliminado.fk_id_time, eliminado.fk_id_campeonato, eliminado_fase[1]);
                try {
                    if (eliminado_fase[1] == "semis") {
                        console.log(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/semis`)
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/semis`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    } else if (eliminado_fase[1] == "quartas") {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });

                    } else if (eliminado_fase[1] == 'oitavas') {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    } else if (eliminado_fase[1] == 'final') {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    }
                } catch (error) {
                    console.error('Erro ao obter a data de eliminação:', error);
                    // Se ocorrer um erro, podemos apenas manter os dados existentes do eliminado
                    updatedEliminados.push(eliminado);
                }
            }
            setEliminados(updatedEliminados);
        };

        getDateElim();
    }, [esperando]);


    //console.log(eliminados)
    //  getData(10) > getData() 

    console.log(esperando)

    const dataAtual = new Date();
    esperando.map((game, index) => {
        if(game.data_hora || game.hora_camp_pre_definido) {
            console.log(true, 1)
            if( getData() >= getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sum')){
                console.log('ocorrendo')
                console.log(getData( ))
                console.log(getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sum'))
            }else{
                console.log('nao ocorrendo')
            }
           
         }else{
           console.log(false) 
         } 
        //console.log(getData(`${formataData(game.hora_camp_pre_definido)} ${formataHora(game.hora_camp_pre_definido)}`,10,'sum'))
    })

    return (
        <>
            {
                liveOn

                    ?
                    <>
                        <PageTitle text={`LIVE ON`} icon={faBell} />
                        <LiveOn></LiveOn>
                        <DividerComponent margin={"3rem 0"} />

                    </>

                    :

                    ''
            }
            {
                loading
                    ?
                    <SpinnerCustom />

                    :
                    <>


                        <PageTitle text={'MEUS JOGOS'} />
                        <DividerComponent margin={'3rem 0'} />
                        <div className='div__jogos'>
                            {
                                games.length > 0 || esperando.length > 0 ? <PageTitle text={"Próximos jogos"} /> : (
                                    <div>
                                        <h1 className='aviso'>Você não tem nenhum jogo definido no momento.</h1>
                                        <h1 className='aviso'><span className='link darkpurple'><Link to={`/campeonatos`}>Se increva em um campeonato e espere os avisos dos administradores!</Link></span></h1>
                                    </div>
                                )}

                            {
                                games.map((game, index) => (

                                    <div className='camp__jogo'>
                                        <CardCampeonato
                                            type='preview'
                                            idCamp={game.id_campeonato}
                                            bgImage={game.foto ? `${path}/${game.foto.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                            title={game.nome_camp}
                                            width={'20%'} />

                                        <CardClassificacao
                                            ocorrendo={game.data_hora || game.hora_camp_pre_definido ? (
                                                (
                                                    getData() >= getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sub')  &&
                                                    getData() <= getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sum')) ? true : false
                                            ) : false}
                                            data_hora={game.data_hora}
                                            fase={game.fase}
                                            jogo={game.fase}
                                            nome_time={game.nome_time}
                                            key={index}
                                            nome_time_vs={game.nome_time_vs}

                                        />
                                    </div>
                                ))}

                            {
                                esperando.map((game, index) =>
                                (

                                    <div className='camp__jogo'>
                                        <CardCampeonato
                                            type='preview'
                                            idCamp={game.id_campeonato}
                                            bgImage={game.foto ? `${path}/${game.foto.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                            title={game.nome_camp}
                                            width={'20%'} />

                                        <CardClassificacao
                                            ocorrendo={game.data_hora || game.hora_camp_pre_definido ? (
                                                (getData() >= getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sub')  &&
                                                    getData() <= getData(game.data_hora || game.hora_camp_pre_definido, 10, 'sum')) ? true : false
                                            ) : false}
                                            data_hora={game.data_hora || game.hora_camp_pre_definido}
                                            fase={"EM BREVE"}
                                            jogo={game.fase}
                                            nome_time={game.nome_time}
                                            key={index}
                                            nome_time_vs={"A DEFINIR"}

                                        />
                                    </div>
                                ))}

                            {
                                campeao.length == 0 && eliminados.length == 0 ? "" :
                                    <>
                                        <DividerComponent />
                                        <PageTitle text={"Situação Final"} />
                                    </>
                            }

                            {campeao.map((game, index) => (
                                <div className='camp__jogo'>

                                    <CardCampeonato
                                        type='preview'
                                        idCamp={game.id_campeonato}
                                        bgImage={game.foto ? `${path}/${game.foto.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                        title={game.nome_camp}
                                        width={'20%'}
                                    />


                                    <CardClassificacao
                                        //data_hora={game.data_hora}
                                        fase={game.fase}
                                        jogo={game.fase}
                                        nome_time={game.nome_time}
                                        key={index}
                                        nome_time_vs={game.nome_time_vs}
                                        campeao={true}
                                    />
                                </div>
                            ))}


                            {eliminados.map((game, index) => (
                                <div className='camp__jogo'>

                                    <CardCampeonato
                                        type='preview'
                                        idCamp={game.id_campeonato}
                                        bgImage={game.foto ? `${path}/${game.foto.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                        title={game.nome_camp}
                                        width={'20%'} />

                                    <CardClassificacao
                                        data_hora={game.data_hora}
                                        fase={game.fase}
                                        jogo={game.fase}
                                        nome_time={game.nome}
                                        key={index}
                                        eliminado={true}
                                        eliminado_em={game.eliminado_em}
                                    />
                                </div>
                            ))}


                        </div>

                        <p id='help__text'>Tá meio perdido amigo? acesse a planilha de jogos por esse botão e se informe melhor!</p>     
                        <a target='_blank' href="https://etecspgov-my.sharepoint.com/:x:/r/personal/gustavo_rodrigues199_etec_sp_gov_br/_layouts/15/doc2.aspx?sourcedoc=%7B4271C224-37DD-4642-B8B8-4C5C089B9F99%7D&file=Pasta%201.xlsx&action=editnew&mobileredirect=true&wdNewAndOpenCt=1719976120223&ct=1719976120602&wdOrigin=OFFICECOM-WEB.START.NEW&wdPreviousSessionSrc=HarmonyWeb&wdPreviousSession=baa1af1e-953d-4e99-a661-efbb17a51a9e&cid=b9794a84-ba32-40c1-861c-e67194f7be6d"><Button margin={"25px 0"} text={"Acessar planilha de classificação CBPATIO"} variant={'purple'}/></a>
                    </>
            }

        </>
    )
}

export { Classificacao }
