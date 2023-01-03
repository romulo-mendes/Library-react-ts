import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { BackToContainer } from './BackToStyled'

type BackToProps = {
    back: string
    current: string
}
const BackTo: FunctionComponent<BackToProps> = ({ back, current }) => {
    const navigate = useNavigate()
    function handleClick() {
        navigate(-1)
    }

    return (
        <BackToContainer onClick={handleClick}>
            <KeyboardArrowLeftOutlinedIcon />
            <div>
                <span className="back">{back}</span>
                <span className="current">{` / ${current}`}</span>
            </div>
        </BackToContainer>
    )
}

export default BackTo
