import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { rentHistory } from '../../models/book'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import { MainModalProps } from '../../models/modalState'
import { editBook, getBook } from '../../services/books'
import IsRent from './IsRent'
import { useNavigate } from 'react-router-dom'
import useStateBook from '../../hooks/useStateBook'
import {
    IsActiveContainer,
    MainModalContainer,
    RentHistoryContainer,
} from './MainModalStyled'

const MainModal = ({ bookId, controlModal }: MainModalProps) => {
    const [book, setBook] = useStateBook()
    const [isRent, setIsRent] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [lastRent, setLastRent] = useState<rentHistory>()
    const [render, setRender] = useState(false)
    const navigate = useNavigate()

    async function AwaitGetBook() {
        const response = await getBook(bookId)
        setBook(response)
    }

    useEffect(() => {
        AwaitGetBook()
    }, [render])

    useEffect(() => {
        if (book && book.status.isActive === false) {
            return setIsActive(false)
        } else {
            setIsActive(true)
        }
        if (book && book.rentHistory.length) {
            const currentRent = book.rentHistory[book.rentHistory.length - 1]
            if (
                currentRent &&
                new Date(currentRent.deliveryDate) > new Date()
            ) {
                setLastRent(currentRent)
                setIsRent(true)
            } else {
                setIsRent(false)
            }
        }
    }, [book])
    async function returnBook() {
        if (book) {
            book.rentHistory[book.rentHistory.length - 1].deliveryDate =
                new Date()
            const editedBook = await editBook(bookId, book)
            setBook(editedBook)
        }
    }

    function activeBook() {
        if (book) {
            editBook(bookId, {
                ...book,
                status: { ...book.status, description: '', isActive: true },
            })
            setRender(!render)
        }
    }

    const buttonStyles = {
        backgroundColor: isRent ? '#f4f4f4' : undefined,
        border: isRent ? '1px solid #adb5bd' : undefined,
    }

    return (
        <MainModalContainer>
            {book && (
                <>
                    <div className="main-content">
                        <div className="img-side">
                            <img
                                src={book.image}
                                alt={`Capa do livro ${book.tittle}`}
                            />
                            <Button
                                style={buttonStyles}
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={!isActive}
                                onClick={() => {
                                    isRent
                                        ? returnBook()
                                        : controlModal('main', 'lent')
                                }}
                                sx={{ border: '1px solid #adb5bd' }}
                            >
                                <AutoStoriesOutlinedIcon sx={{ mr: '12px' }} />
                                {isRent ? 'Devolver' : 'Emprestar'}
                            </Button>
                        </div>
                        <div className="text-side">
                            <div className="text">
                                <Typography
                                    align="center"
                                    variant="h6"
                                    sx={{ mb: '24px' }}
                                >
                                    {book.tittle}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Sinopse
                                </Typography>
                                <Typography
                                    display="flex"
                                    style={{
                                        maxHeight: '67px',
                                        maxWidth: '424px',
                                        overflow: 'hidden',
                                    }}
                                    variant="body1"
                                >
                                    {book.synopsis}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Autor
                                </Typography>
                                <Typography variant="body1">
                                    {book.author}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Gênero
                                </Typography>
                                <Typography variant="body1">
                                    {book.genre}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Data de entrada
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(
                                        book.systemEntryDate
                                    ).toLocaleDateString('pt-br')}
                                </Typography>
                            </div>
                            <div className="buttons">
                                <Button
                                    variant="outlined"
                                    color="info"
                                    onClick={() => {
                                        navigate(`/biblioteca/editar/${bookId}`)
                                    }}
                                >
                                    Editar
                                </Button>
                                {isActive ? (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            controlModal('main', 'inactive')
                                        }}
                                        color="error"
                                    >
                                        Inativar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() => {
                                            activeBook()
                                        }}
                                    >
                                        Ativar
                                    </Button>
                                )}
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        controlModal('main', 'rentHistory')
                                    }
                                    sx={{ color: 'black' }}
                                >
                                    Histórico
                                </Button>
                            </div>
                        </div>
                    </div>
                    {!isActive && (
                        <IsActiveContainer>
                            <Typography mb="16px" variant="h6">
                                Informações da inativação
                            </Typography>
                            <div>
                                <Typography variant="subtitle1">
                                    Motivo
                                </Typography>
                                <Typography variant="body1">
                                    {book.status.description}
                                </Typography>
                            </div>
                        </IsActiveContainer>
                    )}
                    {isRent && lastRent && (
                        <RentHistoryContainer>
                            <Typography variant="h6" sx={{ mb: '16px' }}>
                                Dados do aluno
                            </Typography>
                            <IsRent lastRent={lastRent} />
                        </RentHistoryContainer>
                    )}
                </>
            )}
        </MainModalContainer>
    )
}

export default MainModal
