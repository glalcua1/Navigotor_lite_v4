import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Mock data (should be imported/shared from App.jsx in a real app)
const competitorsDB = [
  { name: 'The Ritz London', ADR: 142 },
  { name: 'The Savoy', ADR: 144 },
  { name: "Claridge's", ADR: 139 },
  { name: 'The Langham', ADR: 141 },
  { name: 'Corinthia Hotel', ADR: 143 },
  { name: 'The Dorchester', ADR: 140 },
  { name: 'Shangri-La The Shard', ADR: 145 },
  { name: 'Rosewood London', ADR: 138 },
  { name: 'The Connaught', ADR: 143 },
  { name: 'Four Seasons Park Lane', ADR: 146 },
];
const myHotel = { name: 'My Hotel', ADR: 145 };

export default function RateTrends() {
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>Rate Trends – Competitor Table</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Hotel</b></TableCell>
              <TableCell align="right"><b>ADR</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={myHotel.name} sx={{ bgcolor: '#e3f2fd' }}>
              <TableCell component="th" scope="row">{myHotel.name} (You)</TableCell>
              <TableCell align="right">${myHotel.ADR}</TableCell>
            </TableRow>
            {competitorsDB.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">${row.ADR}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 