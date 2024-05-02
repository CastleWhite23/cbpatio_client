import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons"

const MeusTimes = () => {
    return (
        <Times pageTitle={'MEUS TIMES'}>
            <PageTitle text={`CAPITÃO `} icon={faCrown} />
            <MeusTimesComponent cargo={"capitao"} />
            <DividerComponent margin={"3rem 0  0  0"} />
            <PageTitle text={"JOGADOR"} icon={faChessKnight}/>
            <MeusTimesComponent cargo={'jogador'}/>
        </Times>
    )
}

export { MeusTimes }