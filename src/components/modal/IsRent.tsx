import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { rentHistory } from '../../models/book'

type lastRentProps = {
    lastRent: rentHistory
}

const IsRent = ({ lastRent }: lastRentProps) => {
    const withdrawalDate = new Date(lastRent.withdrawalDate)
    const deliveryDate = new Date(lastRent.deliveryDate)
    return (
        <Table
            sx={{
                backgroundColor: '#f4f4f4',
                borderRadius: '5px',
            }}
        >
            <TableHead>
                <TableRow sx={{ fontWeight: '500', fontSize: '16px' }}>
                    <TableCell>Nome do Aluno</TableCell>
                    <TableCell>Turma</TableCell>
                    <TableCell>Data da Retirada</TableCell>
                    <TableCell>Data da Entrega</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow sx={{ fontSize: '16px', fontWeight: '200' }}>
                    <TableCell>{lastRent.studentName}</TableCell>
                    <TableCell>{lastRent.class}</TableCell>
                    <TableCell>
                        {withdrawalDate.toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                        {deliveryDate.toLocaleDateString('pt-BR')}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default IsRent
