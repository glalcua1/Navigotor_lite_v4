import React, { useState } from 'react';
import { 
  AppBar, Box, Toolbar, Typography, CssBaseline, Container,
  Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Stack, CircularProgress, FormControl, InputLabel,
  Select, MenuItem, ToggleButtonGroup, ToggleButton, TableContainer, Table,
  TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Drawer
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import RankingIcon from '@mui/icons-material/EmojiEvents';
import BusinessIcon from '@mui/icons-material/Business';
import AttractionsIcon from '@mui/icons-material/Attractions';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { alpha } from '@mui/material/styles';

const drawerWidth = 240;

// Generate dynamic dates for rate trends data
const generateRateTrendsData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Base ADR with some randomization
    const adrBase = 140 + Math.floor(i * 3.5);
    const adr = adrBase + Math.floor(Math.random() * 5);
    
    // Compset is typically a bit lower
    const compset = adr - 2 - Math.floor(Math.random() * 5);
    
    // Define city demand based on day of week
    let cityDemand = 'Low';
    if (date.getDay() === 5 || date.getDay() === 6) { // Friday and Saturday
      cityDemand = 'High';
    } else if (date.getDay() === 0 || date.getDay() === 4) { // Sunday and Thursday
      cityDemand = 'Medium';
    }
    
    // Position is generally better on weekends
    let position = '3rd of 10';
    if (cityDemand === 'High') {
      position = '1st of 10';
    } else if (cityDemand === 'Medium') {
      position = '2nd of 10';
    }
    
    // Competitors
    const hiltonRate = adr + Math.floor(Math.random() * 10) - 5;
    const marriottRate = adr + Math.floor(Math.random() * 10) - 5;
    const sheratonRate = adr + Math.floor(Math.random() * 10) - 5;
    
    data.push({
      date: dateString,
      dayName,
      ADR: adr,
      Compset: compset,
      position,
      cityDemand,
      competitors: [
        { name: 'Hilton London', rate: hiltonRate },
        { name: 'Marriott Hyde Park', rate: marriottRate },
        { name: 'Sheraton Grand', rate: sheratonRate }
      ]
    });
  }
  
  return data;
};

// Mock data for rate trends
const rateTrendsData = generateRateTrendsData();

// AI Assistant Drawer Component
function AskAIDrawer({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [question, setQuestion] = useState('');

  const readyMadePrompts = [
    {
      title: "Rate Strategy",
      prompts: [
        "What should be our pricing strategy for the upcoming London Fashion Week?",
        "How do our weekend rates compare to competitors?",
        "Should we adjust our rates based on current market position?"
      ]
    },
    {
      title: "Market Analysis",
      prompts: [
        "What are the major events affecting our demand in the next 30 days?",
        "How does our rate parity look across different channels?",
        "What is our competitive position in the luxury segment?"
      ]
    }
  ];

  const handlePromptClick = (promptText) => {
    setQuestion(promptText);
  };

  const handleAskAI = async () => {
    setLoading(true);
    // Simulated AI response - In a real application, this would be an API call
    setTimeout(() => {
      const insights = [
        "Based on historical data, your ADR is currently 5% below the competitive set for the upcoming weekend. Consider adjusting rates upward for Friday and Saturday nights.",
        "There's a major conference at ExCeL London next month that's driving demand. Your competitors have already increased their rates by 15-20% for those dates.",
        "Your rate parity score has dropped to 95% across OTAs. Main discrepancies found on Booking.com for Superior Rooms."
      ];
      setAiResponse(insights.join('\n\n'));
      setLoading(false);
    }, 1500);
  };

  return (
    <Drawer 
      anchor="right"
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 450 },
          maxWidth: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderLeft: '1px solid',
          borderColor: 'divider'
        }
      }}
    >
      <Box
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 1,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)'
            }}
          >
            <StarIcon 
              sx={{ 
                fontSize: 24,
                color: 'primary.main',
              }}
            />
          </Box>
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI Revenue Assistant
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        <TextField
          fullWidth
          label="Ask about revenue, pricing, or market insights"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="E.g., What are the key revenue opportunities for next month?"
          multiline
          rows={3}
          sx={{ mb: 3 }}
        />

        <Typography 
          variant="subtitle2" 
          color="text.secondary" 
          mb={2}
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Ready-made Prompts
        </Typography>

        {readyMadePrompts.map((category) => (
          <Box key={category.title} mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              {category.title}
            </Typography>
            <Stack spacing={1}>
              {category.prompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outlined"
                  size="small"
                  onClick={() => handlePromptClick(prompt)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    borderRadius: 1.5,
                    p: 1.25,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.lighter',
                    },
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </Stack>
          </Box>
        ))}

        {aiResponse && (
          <Box 
            sx={{ 
              mb: 3, 
              p: 2.5, 
              bgcolor: 'primary.lighter', 
              borderRadius: 2, 
              overflow: 'auto',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <Typography variant="subtitle2" color="primary.dark" mb={1.5} fontWeight={600}>
              AI Response:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.primary' }}>
              {aiResponse}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}
        
        <Box sx={{ position: 'sticky', bottom: 0, pb: 2, pt: 2, bgcolor: 'white' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAskAI}
            disabled={!question.trim() || loading}
            startIcon={<StarIcon />}
            sx={{
              py: 1.25,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Get Insights
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

// Overview card component from original app
function OverviewCard({ title, value, icon, trend, trendLabel, explanation }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background: `linear-gradient(135deg, transparent 40%, rgba(33, 150, 243, 0.06) 100%)`,
          zIndex: 0
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          fontWeight={600} 
          sx={{ 
            mb: 2, 
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          mb: 'auto',
          flexGrow: 1
        }}>
          <Box>
            <Typography 
              variant="h3" 
              color="text.primary" 
              fontWeight={700} 
              sx={{ 
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1,
                background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 0px 1px rgba(33, 150, 243, 0.1)'
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mb: 2,
                fontSize: '0.75rem'
              }}
            >
              {explanation}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              background: trend?.startsWith('+') ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.08)',
              borderRadius: '12px',
              px: 1.5,
              py: 0.5,
              width: 'fit-content'
            }}>
              <Typography 
                variant="body2" 
                color={trend?.startsWith('+') ? 'success.main' : 'error.main'} 
                fontWeight={600}
                sx={{ fontSize: '0.875rem' }}
              >
                {trend}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                {trendLabel}
              </Typography>
            </Box>
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 1.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)'
            }}
          >
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: 36,
                color: 'primary.main',
                filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'
              } 
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Rate Trends Overview Chart & Table
function RateTrendsOverview() {
  const [viewMode, setViewMode] = useState('graph');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Next 7 Days');
  const [visibleSeries, setVisibleSeries] = useState({ ADR: true, Compset: true });

  const handleViewModeChange = (event, newValue) => {
    if (newValue !== null) {
      setViewMode(newValue);
    }
  };

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          mb: 4,
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 1.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)'
            }}
          >
            <ShowChartIcon 
              sx={{ 
                fontSize: 28,
                color: 'primary.main',
                filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'
              }} 
            />
          </Box>
          <Typography 
            variant="h5" 
            component="h2" 
            fontWeight="700" 
            sx={{
              color: 'text.primary',
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Rate Trends Overview
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            flexWrap: { md: 'wrap', lg: 'nowrap' }
          }}
        >
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
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
            <ToggleButton value="graph" aria-label="graph view">
              <ShowChartIcon sx={{ mr: 1, fontSize: 20 }} />
              Graph
            </ToggleButton>
            <ToggleButton value="table" aria-label="table view">
              <BarChartIcon sx={{ mr: 1, fontSize: 20 }} />
              Table
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControl
            size="small"
            sx={{
              minWidth: 150,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }
            }}
          >
            <InputLabel>Time Range</InputLabel>
            <Select
              value={selectedTimeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="Next 7 Days">Next 7 Days</MenuItem>
              <MenuItem value="Next 14 Days">Next 14 Days</MenuItem>
              <MenuItem value="Next 30 Days">Next 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {viewMode === 'graph' ? (
        <Box 
          sx={{ 
            height: 400, 
            width: '100%', 
            mt: 3,
            borderRadius: 3,
            p: 2,
            bgcolor: 'rgba(245, 247, 250, 0.5)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={rateTrendsData}
              margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#637381', fontSize: 12 }} 
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={{ stroke: '#e0e0e0' }}
                dy={10}
                tickFormatter={formatDate}
              />
              <YAxis 
                tick={{ fill: '#637381', fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={{ stroke: '#e0e0e0' }}
                dx={-10}
                tickFormatter={(value) => `£${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  bgcolor: 'white',
                  border: 'none',
                  borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  padding: '12px 16px',
                }}
                formatter={(value, name, props) => {
                  const entry = props.payload;
                  
                  // Determine pricing position
                  let positionColor = "#637381"; // default gray
                  let positionText = "";
                  
                  if (name === "Your Hotel") {
                    if (entry.ADR > entry.Compset) {
                      const diff = ((entry.ADR - entry.Compset) / entry.Compset * 100).toFixed(1);
                      positionText = `+${diff}% above compset`;
                      positionColor = "#4caf50"; // green
                    } else if (entry.ADR < entry.Compset) {
                      const diff = ((entry.Compset - entry.ADR) / entry.Compset * 100).toFixed(1);
                      positionText = `-${diff}% below compset`;
                      positionColor = "#f44336"; // red
                    } else {
                      positionText = "at par with compset";
                    }
                  }
                  
                  // Return value and position info
                  return [
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: name === "Your Hotel" ? "#2196f3" : "#4caf50" }}>
                        £{value}
                      </Typography>
                      {name === "Your Hotel" && (
                        <Typography sx={{ fontSize: '0.75rem', color: positionColor, mt: 0.5 }}>
                          {positionText}
                        </Typography>
                      )}
                      {name === "Your Hotel" && (
                        <Typography sx={{ fontSize: '0.75rem', mt: 0.5 }}>
                          Position: {entry.position}
                        </Typography>
                      )}
                    </Box>, 
                    name
                  ];
                }}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                  
                  // Find the data entry for this date to get city demand
                  const entry = rateTrendsData.find(item => item.date === value);
                  const cityDemand = entry ? entry.cityDemand : "";
                  
                  return (
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>
                        {day}
                      </Typography>
                      {cityDemand && (
                        <Box 
                          sx={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1,
                            py: 0.25,
                            borderRadius: 5,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: cityDemand === 'High' 
                              ? 'success.dark' 
                              : cityDemand === 'Medium' 
                                ? 'warning.dark' 
                                : 'text.secondary',
                            bgcolor: cityDemand === 'High' 
                              ? alpha('#4caf50', 0.1) 
                              : cityDemand === 'Medium' 
                                ? alpha('#ff9800', 0.1) 
                                : alpha('#9e9e9e', 0.1),
                          }}
                        >
                          {cityDemand} Demand
                        </Box>
                      )}
                    </Box>
                  );
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
                iconSize={10}
                iconType="circle"
              />
              {visibleSeries.ADR && (
                <Line
                  type="monotone"
                  dataKey="ADR"
                  stroke="#2196f3"
                  strokeWidth={3}
                  dot={{ fill: 'white', stroke: '#2196f3', strokeWidth: 2, r: 4 }}
                  name="Your Hotel"
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#2196f3' }}
                />
              )}
              {visibleSeries.Compset && (
                <Line
                  type="monotone"
                  dataKey="Compset"
                  stroke="#4caf50"
                  strokeWidth={3}
                  dot={{ fill: 'white', stroke: '#4caf50', strokeWidth: 2, r: 4 }}
                  name="Compset Average"
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#4caf50' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <TableContainer 
          sx={{ 
            borderRadius: 3,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            mt: 3,
            '& .MuiTableCell-root': {
              fontSize: '0.875rem',
              py: 1.5,
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontWeight: 600,
              backgroundColor: 'rgba(245, 247, 250, 0.5)',
              color: 'text.secondary',
            }
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
                <TableCell align="right">Your Rate</TableCell>
                <TableCell align="right">Compset Avg</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>City Demand</TableCell>
                <TableCell colSpan={3} align="center">Top Competitors</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}></TableCell>
                <TableCell align="center" sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: alpha('#003580', 0.04) }}>Hilton London</TableCell>
                <TableCell align="center" sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: alpha('#ab0014', 0.04) }}>Marriott</TableCell>
                <TableCell align="center" sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: alpha('#006242', 0.04) }}>Sheraton</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rateTrendsData.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.04)',
                    }
                  }}
                >
                  <TableCell>
                    {formatDate(row.date)}
                  </TableCell>
                  <TableCell>{row.dayName}</TableCell>
                  <TableCell align="right">
                    £{row.ADR}
                  </TableCell>
                  <TableCell align="right">
                    £{row.Compset}
                  </TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: row.cityDemand === 'High' 
                          ? 'success.dark' 
                          : row.cityDemand === 'Medium' 
                            ? 'warning.dark' 
                            : 'text.secondary',
                        bgcolor: row.cityDemand === 'High' 
                          ? alpha('#4caf50', 0.1) 
                          : row.cityDemand === 'Medium' 
                            ? alpha('#ff9800', 0.1) 
                            : alpha('#9e9e9e', 0.1),
                      }}
                    >
                      {row.cityDemand}
                    </Box>
                  </TableCell>
                  
                  {row.competitors.map((competitor, index) => (
                    <TableCell 
                      key={index} 
                      align="center" 
                      sx={{ 
                        fontWeight: competitor.rate > row.ADR ? 600 : 400,
                        color: competitor.rate > row.ADR ? 'error.main' : 'inherit',
                        bgcolor: index === 0 
                          ? alpha('#003580', 0.02)  
                          : index === 1 
                            ? alpha('#ab0014', 0.02) 
                            : alpha('#006242', 0.02),
                      }}
                    >
                      £{competitor.rate}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

// Distribution Health Card Component
function DistributionHealthCard() {
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const otaData = [
    { 
      name: 'Booking.com', 
      rank: '2nd', 
      reviews: '4.7/5', 
      parityScore: 98,
      color: '#003580' // Booking.com blue
    },
    { 
      name: 'Expedia', 
      rank: '3rd', 
      reviews: '4.5/5', 
      parityScore: 95,
      color: '#ffcc00' // Expedia yellow
    },
    { 
      name: 'Agoda', 
      rank: '5th', 
      reviews: '4.4/5', 
      parityScore: 82,
      color: '#e12c32' // Agoda red
    }
  ];

  // Function to get color based on parity score
  const getParityColor = (score) => {
    if (score >= 95) return 'success.main';
    if (score >= 90) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          mb: 4,
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 1.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)'
            }}
          >
            <LanguageIcon 
              sx={{ 
                fontSize: 28,
                color: 'primary.main',
                filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'
              }} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="700" 
              sx={{
                color: 'text.primary',
                background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Distribution Health
            </Typography>
            <Typography variant="body2" color="text.secondary">
              As of {today}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {otaData.map((ota) => (
          <Grid item xs={12} md={4} key={ota.name}>
            <Box
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                p: { xs: 2.5, sm: 3 },
                height: '100%',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                  borderColor: alpha(ota.color, 0.6),
                  bgcolor: alpha(ota.color, 0.02)
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    bgcolor: alpha(ota.color, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ota.color,
                    fontWeight: 700,
                    fontSize: '1.25rem'
                  }}
                >
                  {ota.name.charAt(0)}
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  {ota.name}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mt: 'auto' }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <RankingIcon sx={{ fontSize: 22, color: ota.color }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                      Rank
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {ota.rank}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <StarIcon sx={{ fontSize: 22, color: ota.color }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                      Reviews
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {ota.reviews}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <CompareArrowsIcon sx={{ fontSize: 22, color: getParityColor(ota.parityScore) }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                      Parity
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color={getParityColor(ota.parityScore)}>
                      {ota.parityScore}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// City Demand Card Component
function CityDemandCard() {
  const today = new Date();
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Calculate upcoming dates for events
  const fashionWeekStart = new Date(today);
  fashionWeekStart.setDate(today.getDate() + 10);
  
  const techSummitDate = new Date(today);
  techSummitDate.setDate(today.getDate() + 15);
  
  const bankHolidayDate = new Date(today);
  bankHolidayDate.setDate(today.getDate() + 25);
  
  // Format date ranges
  const fashionWeekRange = `${formatDate(fashionWeekStart)}-${formatDate(new Date(fashionWeekStart.getTime() + (4 * 24 * 60 * 60 * 1000)))}`;
  const techSummitDay = formatDate(techSummitDate);
  const bankHolidayDay = formatDate(bankHolidayDate);
  
  const demandData = [
    {
      title: "Events & Festivals",
      value: "High",
      icon: <StarIcon />,
      trend: "+24%",
      trendLabel: "vs last week",
      color: "#4caf50",
      bgColor: "rgba(76, 175, 80, 0.1)",
      details: `London Fashion Week (${fashionWeekRange}), Tech Summit (${techSummitDay})`
    },
    {
      title: "London City Searches",
      value: "Very High",
      icon: <LanguageIcon />,
      trend: "+32%",
      trendLabel: "vs last month",
      color: "#2196f3",
      bgColor: "rgba(33, 150, 243, 0.1)",
      details: "5.2M searches across all booking channels"
    },
    {
      title: "Airline Bookings",
      value: "Medium",
      icon: <AttractionsIcon />,
      trend: "+8%",
      trendLabel: "vs last week",
      color: "#ff9800",
      bgColor: "rgba(255, 152, 0, 0.1)",
      details: "85% capacity on flights to London Heathrow"
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          mb: 4,
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 1.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)'
            }}
          >
            <LanguageIcon 
              sx={{ 
                fontSize: 28,
                color: 'primary.main',
                filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'
              }} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="700" 
              sx={{
                color: 'text.primary',
                background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              City Demand Forecast
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(today)} - {formatDate(new Date(today.getTime() + (13 * 24 * 60 * 60 * 1000)))} · London Market
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {demandData.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Box
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                p: { xs: 2.5, sm: 3 },
                height: '100%',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: item.bgColor,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                  borderColor: alpha(item.color, 0.6),
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    bgcolor: alpha(item.color, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    fontWeight: 700,
                    fontSize: '1.25rem'
                  }}
                >
                  {React.cloneElement(item.icon, { 
                    sx: { 
                      fontSize: 24,
                      color: item.color
                    } 
                  })}
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography 
                  variant="h4" 
                  fontWeight={700} 
                  sx={{ 
                    color: item.color,
                    mb: 2
                  }}
                >
                  {item.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: '0.875rem',
                    px: 1
                  }}
                >
                  {item.details}
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 1,
                  background: alpha(item.color, 0.1),
                  borderRadius: '12px',
                  px: 1.5,
                  py: 0.75,
                  width: 'fit-content',
                  mx: 'auto',
                  mt: 'auto'
                }}
              >
                <Typography 
                  variant="body2" 
                  color={item.color}
                  fontWeight={600}
                  sx={{ fontSize: '0.875rem' }}
                >
                  {item.trend}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: '0.875rem' }}
                >
                  {item.trendLabel}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      {/* Upcoming Holiday Table */}
      <Box mt={4}>
        <Typography 
          variant="h6" 
          fontWeight={600} 
          mb={2}
          sx={{ 
            color: 'text.primary',
            pl: 1
          }}
        >
          Upcoming Holidays & Events Impact
        </Typography>
        <TableContainer 
          component={Paper}
          sx={{ 
            borderRadius: 3,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            mb: 2,
            '& .MuiTableCell-root': {
              fontSize: '0.875rem',
              py: 1.5,
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontWeight: 600,
              backgroundColor: 'rgba(245, 247, 250, 0.8)',
              color: 'text.secondary',
            }
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Event/Holiday</TableCell>
                <TableCell>Expected Impact</TableCell>
                <TableCell align="right">Recommended Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.04)' } }}>
                <TableCell>{fashionWeekRange}</TableCell>
                <TableCell>London Fashion Week</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 10,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      bgcolor: alpha('#4caf50', 0.1),
                      color: 'success.dark'
                    }}
                  >
                    High (+35%)
                  </Box>
                </TableCell>
                <TableCell align="right">Increase rates by 20-25%</TableCell>
              </TableRow>
              <TableRow sx={{ '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.04)' } }}>
                <TableCell>{techSummitDay}</TableCell>
                <TableCell>London Tech Summit</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 10,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      bgcolor: alpha('#ff9800', 0.1),
                      color: 'warning.dark'
                    }}
                  >
                    Medium (+18%)
                  </Box>
                </TableCell>
                <TableCell align="right">Increase rates by 10-15%</TableCell>
              </TableRow>
              <TableRow sx={{ '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.04)' } }}>
                <TableCell>{bankHolidayDay}</TableCell>
                <TableCell>UK Bank Holiday</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 10,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      bgcolor: alpha('#4caf50', 0.1),
                      color: 'success.dark'
                    }}
                  >
                    High (+28%)
                  </Box>
                </TableCell>
                <TableCell align="right">Increase rates by 15-20%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

// Enhanced dashboard component
function Dashboard() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Revenue Navigator dashboard.
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={3} 
        sx={{ 
          mb: 5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'stretch'
        }}
      >
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            display: 'flex',
            height: '100%'
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              minHeight: 180,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'white',
              p: { xs: 2.5, sm: 3 },
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                borderColor: 'primary.light'
              }
            }}
          >
            <OverviewCard
              title="Average Daily Rate"
              value="£145"
              icon={<TrendingUpIcon />}
              trend="+5.2%"
              trendLabel="vs last week"
              explanation="Current ADR performance"
            />
          </Card>
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            display: 'flex',
            height: '100%'
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              minHeight: 180,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'white',
              p: { xs: 2.5, sm: 3 },
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                borderColor: 'primary.light'
              }
            }}
          >
            <OverviewCard
              title="Market Position"
              value="3rd"
              icon={<EqualizerIcon />}
              trend="Top 3"
              trendLabel="out of 10 competitors"
              explanation="Current competitive ranking"
            />
          </Card>
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            display: 'flex',
            height: '100%'
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              minHeight: 180,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'white',
              p: { xs: 2.5, sm: 3 },
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                borderColor: 'primary.light'
              }
            }}
          >
            <OverviewCard
              title="Rate Parity"
              value="98%"
              icon={<CompareArrowsIcon />}
              trend="+2%"
              trendLabel="improvement"
              explanation="Cross-channel rate consistency"
            />
          </Card>
        </Grid>
      </Grid>

      <Box 
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 2, sm: 3, md: 4 },
          mb: 5,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
            borderColor: 'primary.light'
          }
        }}
      >
        <RateTrendsOverview />
      </Box>

      <Box 
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 2, sm: 3, md: 4 },
          mb: 5,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
            borderColor: 'primary.light'
          }
        }}
      >
        <CityDemandCard />
      </Box>

      <Box 
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 2, sm: 3, md: 4 },
          mb: 5,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
            borderColor: 'primary.light'
          }
        }}
      >
        <DistributionHealthCard />
      </Box>
    </Container>
  );
}

// Main App component
export default function FixedApp() {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%'
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hyatt London - Revenue Navigator
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentDate}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<StarIcon sx={{ fontSize: 20 }} />}
            onClick={() => setAiDialogOpen(true)}
            sx={{
              borderRadius: 2,
              px: { xs: 2.5, sm: 3.5 },
              py: 1.25,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
              boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Ask AI Assistant
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3, md: 4 }, 
        mt: 8,
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Box>
      
      <AskAIDrawer
        open={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
      />
    </Box>
  );
} 