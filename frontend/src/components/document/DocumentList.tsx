import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { JSX } from 'react';

import { API_BASE_URL } from '../../shared/constants';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

export function DocumentList(): JSX.Element {
    const { data, loading, error, refresh } = useFetchDocuments();

    const deleteDocument = async (id: number) => {
        try {
            await fetch(`${API_BASE_URL}/documents/${id}`, {
                method: 'DELETE',
            });
            await refresh();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <Typography variant={'body1'}>Loading...</Typography>;
    }

    if (error) {
        return <Typography variant={'body1'}>{error}</Typography>;
    }

    if (data.length === 0) {
        return <Typography variant={'body1'}>No documents</Typography>;
    }

    return (
        <Box mt={2}>
            <Table size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.title}</TableCell>
                            <TableCell>
                                {new Date(doc.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    aria-label={'delete'}
                                    onClick={() => deleteDocument(doc.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
