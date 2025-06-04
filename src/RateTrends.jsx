import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';

// Generate period-specific data
const generateTimePeriodData = (period) => {
  const baseADR = 145;
  
  switch(period) {
    case 'Today':
      return { 
        adr: baseADR,
        change: 0.8,
        competitorsChange: (competitors) => competitors.map(comp => ({
          ...comp,
          ADR: comp.ADR - 2 + Math.round(Math.random() * 4),
          change: (Math.random() * 3 - 1).toFixed(1)
        }))
      };
    case 'Next 14 Days':
      return { 
        adr: baseADR + 8,
        change: 5.2,
        competitorsChange: (competitors) => competitors.map(comp => ({
          ...comp,
          ADR: comp.ADR + Math.round(Math.random() * 8),
          change: (Math.random() * 6 - 2).toFixed(1)
        }))
      };
    case 'Next 30 Days':
      return { 
        adr: baseADR + 15,
        change: 9.8,
        competitorsChange: (competitors) => competitors.map(comp => ({
          ...comp,
          ADR: comp.ADR + 5 + Math.round(Math.random() * 10),
          change: (Math.random() * 10 - 3).toFixed(1)
        }))
      };
    case 'Next 90 Days':
      return { 
        adr: baseADR + 25,
        change: 15.6,
        competitorsChange: (competitors) => competitors.map(comp => ({
          ...comp,
          ADR: comp.ADR + 12 + Math.round(Math.random() * 18),
          change: (Math.random() * 18 - 5).toFixed(1)
        }))
      };
    default:
      return { 
        adr: baseADR,
        change: 0,
        competitorsChange: (competitors) => competitors.map(comp => ({
          ...comp,
          change: 0
        }))
      };
  }
};

export default function RateTrends({ competitorsDB }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  
  // Get period-specific data
  const periodData = generateTimePeriodData(selectedPeriod);
  
  // Update my hotel data based on period
  const myHotel = { 
    name: 'My Hotel', 
    ADR: periodData.adr, 
    change: periodData.change 
  };
  
  // Update competitors data based on period
  const competitorsWithChange = periodData.competitorsChange(competitorsDB);
  
  // Calculate statistics
  const avgCompetitorRate = competitorsWithChange.reduce((acc, curr) => acc + curr.ADR, 0) / competitorsWithChange.length;
  const ratePosition = [...competitorsWithChange, myHotel]
    .sort((a, b) => b.ADR - a.ADR)
    .findIndex(hotel => hotel.name === myHotel.name) + 1;
  const totalHotels = competitorsWithChange.length + 1;
  
  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
    }
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          Rate Trends – {selectedPeriod}
        </Typography>
        
        <ToggleButtonGroup
          value={selectedPeriod}
          exclusive
          onChange={handlePeriodChange}
          aria-label="time period"
          sx={{
            '& .MuiToggleButtonGroup-grouped': {
              borderRadius: '8px !important',
              mx: 0.5,
              border: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiToggleButton-root': {
              px: 2,
              py: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.dark',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'primary.light',
                }
              }
            }
          }}
        >
          <ToggleButton value="Today" aria-label="today">
            <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
            Today
          </ToggleButton>
          <ToggleButton value="Next 14 Days" aria-label="next 14 days">
            <DateRangeIcon sx={{ mr: 1, fontSize: 20 }} />
            Next 14 Days
          </ToggleButton>
          <ToggleButton value="Next 30 Days" aria-label="next 30 days">
            <DateRangeIcon sx={{ mr: 1, fontSize: 20 }} />
            Next 30 Days
          </ToggleButton>
          <ToggleButton value="Next 90 Days" aria-label="next 90 days">
            <EventIcon sx={{ mr: 1, fontSize: 20 }} />
            Next 90 Days
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              p: 3,
              bgcolor: 'primary.light',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HotelIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography color="text.secondary">Your ADR</Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                ${myHotel.ADR}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                  <TrendingUpIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body2">+{myHotel.change}%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              p: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography color="text.secondary">Market Position</Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {ratePosition} of {totalHotels}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Top {Math.round((totalHotels - ratePosition + 1) / totalHotels * 100)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              p: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography color="text.secondary">Competitor Average</Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                ${avgCompetitorRate.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {selectedPeriod === 'Today' ? 'Current rates' : `Forecast for ${selectedPeriod}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Competitor Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 2,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Hotel
                  <Tooltip title="Compare your hotel's rate with competitors">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  ADR
                  <Tooltip title={`Average Daily Rate for ${selectedPeriod}`}>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell align="right">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow 
              sx={{ 
                bgcolor: 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HotelIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography fontWeight="medium">
                    {myHotel.name} (You)
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="medium">
                  ${myHotel.ADR}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <TrendingUpIcon sx={{ mr: 0.5, color: 'success.main' }} />
                  <Typography color="success.main">
                    +{myHotel.change}%
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            
            {competitorsWithChange.map((competitor) => (
              <TableRow
                key={competitor.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {competitor.name}
                </TableCell>
                <TableCell align="right">
                  ${competitor.ADR}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {competitor.change > 0 ? (
                      <>
                        <TrendingUpIcon sx={{ mr: 0.5, color: 'success.main' }} />
                        <Typography color="success.main">
                          +{competitor.change}%
                        </Typography>
                      </>
                    ) : competitor.change < 0 ? (
                      <>
                        <TrendingDownIcon sx={{ mr: 0.5, color: 'error.main' }} />
                        <Typography color="error.main">
                          {competitor.change}%
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TrendingFlatIcon sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography color="text.secondary">
                          0%
                        </Typography>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 