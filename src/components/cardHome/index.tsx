import { useNavigate } from 'react-router-dom'
import { CardContainer } from './styles'
import { FunctionComponent } from 'react'

type CardHomeProps = {
    icon: JSX.Element
    text: string
    linkTo: string
}

const CardHome: FunctionComponent<CardHomeProps> = ({ icon, text, linkTo }) => {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/${linkTo}`)
    }

    return (
        <CardContainer onClick={handleClick}>
            <div className="icon">{icon}</div>
            <div className="text">{text}</div>
        </CardContainer>
    )
}

export default CardHome
