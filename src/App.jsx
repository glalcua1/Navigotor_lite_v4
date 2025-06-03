import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Line, LineChart, Tooltip, Area } from 'recharts';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListItemButton from '@mui/material/ListItemButton';
import MuiDrawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LanguageIcon from '@mui/icons-material/Language';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RateTrends from './RateTrends';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const drawerWidth = 240;

// Mock data
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

function OverviewCard({ title, value, icon, trend, trendLabel, explanation }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          fontWeight={500} 
          sx={{ mb: 3, fontSize: '0.875rem' }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography 
              variant="h3" 
              color="text.primary" 
              fontWeight={700} 
              sx={{ 
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mb: 1.5,
                fontSize: '0.75rem'
              }}
            >
              {explanation}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              p: 1,
              borderRadius: 2,
              bgcolor: 'background.default'
            }}
          >
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: 32,
                color: 'primary.main',
                opacity: 0.8
              } 
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Helper function to get next N days with dates and day names
const getNextNDays = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      ADR: 140 + Math.round(Math.random() * 10),
      Compset: 135 + Math.round(Math.random() * 10),
      cityDemand: Math.round(Math.random() * 100),
      competitors: competitorsDB.map(comp => ({
        ...comp,
        ADR: comp.ADR + Math.round(Math.random() * 10 - 5)
      })).sort((a, b) => b.ADR - a.ADR)
    };
  });
};

const allRateTrendsData = {
  'Next 7 Days': getNextNDays(7),
  'Next 14 Days': getNextNDays(14),
  'Next 30 Days': getNextNDays(30),
};

const roomTypes = ['Standard', 'Deluxe', 'Suite'];
const losOptions = [1, 2, 3, 4, 5, 6, 7];

const londonEvents = [
  { name: 'London Fashion Week', date: '2024-09-15' },
  { name: 'Wimbledon Finals', date: '2024-07-14' },
  { name: 'Notting Hill Carnival', date: '2024-08-25' },
  { name: 'London Marathon', date: '2024-04-21' },
];

const londonHolidays = [
  { name: 'Good Friday', date: '2024-03-29' },
  { name: 'Easter Monday', date: '2024-04-01' },
  { name: 'Early May Bank Holiday', date: '2024-05-06' },
  { name: 'Spring Bank Holiday', date: '2024-05-27' },
  { name: 'Summer Bank Holiday', date: '2024-08-26' },
  { name: 'Christmas Day', date: '2024-12-25' },
  { name: 'Boxing Day', date: '2024-12-26' },
];

const allLondonEvents = [
  ...londonEvents.map(e => ({ ...e, type: 'event' })),
  ...londonHolidays.map(e => ({ ...e, type: 'holiday' })),
];

const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Rate Trends', icon: <TrendingUpIcon />, path: '/rate-trends' },
  { text: 'Events', icon: <EventIcon />, path: '/events' },
];

const competitors = [
  'The Ritz London',
  'The Savoy',
  "Claridge's",
  'The Langham',
  'Corinthia Hotel',
  'The Dorchester',
  'Shangri-La The Shard',
  'Rosewood London',
  'The Connaught',
  'Four Seasons Park Lane',
];

const channelData = [
  {
    name: 'Booking.com',
    color: '#003580',
    icon: <LanguageIcon sx={{ color: '#003580' }} />, // Replace with logo if available
    otaRank: '2nd out of 10',
    parityScore: '97%',
    reviews: '4.6/5 (2,345 reviews)',
  },
  {
    name: 'Expedia',
    color: '#F58025',
    icon: <LanguageIcon sx={{ color: '#F58025' }} />, // Replace with logo if available
    otaRank: '3rd out of 10',
    parityScore: '95%',
    reviews: '4.4/5 (1,876 reviews)',
  },
  {
    name: 'Agoda',
    color: '#1a1a1a',
    icon: <LanguageIcon sx={{ color: '#1a1a1a' }} />, // Replace with logo if available
    otaRank: '1st out of 10',
    parityScore: '99%',
    reviews: '4.7/5 (3,012 reviews)',
  },
];

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
    },
    {
      title: "Revenue Optimization",
      prompts: [
        "Where are our biggest revenue opportunities this month?",
        "Should we implement any length-of-stay restrictions?",
        "Which room types are underperforming in RevPAR?"
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
        "Your rate parity score has dropped to 95% across OTAs. Main discrepancies found on Booking.com for Superior Rooms.",
        "Occupancy forecast shows potential for compression dates during London Fashion Week. Consider implementing length-of-stay restrictions.",
        "Your RevPAR index vs. competitive set has improved by 3% this month, primarily driven by better weekend performance."
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
          boxSizing: 'border-box',
          p: 3,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <SmartToyIcon color="primary" />
            <Typography variant="h6">AI Revenue Assistant</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Ask about revenue, pricing, or market insights"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="E.g., What are the key revenue opportunities for next month?"
            multiline
            rows={3}
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Ready-made Prompts
        </Typography>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
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
        </Box>

        {aiResponse && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              AI Response:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {aiResponse}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAskAI}
            disabled={!question.trim() || loading}
            startIcon={<SmartToyIcon />}
          >
            Get Insights
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState('graph');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Next 7 Days');
  const [selectedRoomType, setSelectedRoomType] = useState('Standard');
  const [selectedLOS, setSelectedLOS] = useState(1);
  const [visibleSeries, setVisibleSeries] = useState({ ADR: true, Compset: true });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(6px)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ml: { sm: open ? `${drawerWidth}px` : '72px' },
            width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` },
            transition: 'margin-left 0.3s ease, width 0.3s ease'
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 64, sm: 70 }, px: { xs: 2, sm: 4 } }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                Hyatt London
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  ml: 1, 
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Revenue Navigator
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<SmartToyIcon />}
              onClick={() => setAiDialogOpen(true)}
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                }
              }}
            >
              Ask AI
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/rate-trends" element={<RateTrends competitorsDB={competitorsDB} />} />
          <Route path="/" element={
            <Box component="main" sx={{ 
              flexGrow: 1, 
              p: { xs: 2, sm: 3, md: 4 }, 
              mt: 8,
              ml: { sm: open ? `${drawerWidth}px` : '72px' },
              transition: 'margin-left 0.3s ease',
              width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` }
            }}>
              <Drawer
                variant="permanent"
                open={open}
                sx={{
                  width: open ? drawerWidth : 72,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                  position: 'fixed',
                  '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 72,
                    transition: 'width 0.3s ease',
                    boxSizing: 'border-box',
                    border: 'none',
                    backgroundColor: 'white',
                    overflowX: 'hidden',
                    boxShadow: '1px 0 8px rgba(0,0,0,0.05)',
                    zIndex: (theme) => theme.zIndex.drawer,
                    height: '100%',
                    position: 'fixed'
                  },
                }}
              >
                <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                  <List>
                    {sidebarItems.map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={item.path}
                          sx={{
                            minHeight: 48,
                            px: 2.5,
                            justifyContent: open ? 'initial' : 'center',
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.text} 
                            sx={{ 
                              opacity: open ? 1 : 0,
                              display: open ? 'block' : 'none'
                            }} 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>

              <Box
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'transparent',
                  maxWidth: '100%'
                }}
              >
                <Grid 
                  container 
                  spacing={4} 
                  sx={{ 
                    mb: 4,
                    width: '100%',
                    mx: 0,
                    mt: 0
                  }}
                >
                  <Grid 
                    item 
                    xs={12} 
                    md={4} 
                    sx={{ 
                      p: { xs: 1, sm: 2 },
                      flex: 1,
                      display: 'flex'
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: '100%',
                        minHeight: 180,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'white',
                        p: { xs: 2.5, sm: 3 },
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
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
                      p: { xs: 1, sm: 2 },
                      flex: 1,
                      display: 'flex'
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: '100%',
                        minHeight: 180,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'white',
                        p: { xs: 2.5, sm: 3 },
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
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
                      p: { xs: 1, sm: 2 },
                      flex: 1,
                      display: 'flex'
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: '100%',
                        minHeight: 180,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'white',
                        p: { xs: 2.5, sm: 3 },
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
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
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    width: '100%',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                    }
                  }}
                >
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
                    <Typography variant="h5" component="h2" fontWeight="600" color="primary">
                      Rate Trends Analysis
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: 2
                      }}
                    >
                      <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(e, newValue) => newValue && setViewMode(newValue)}
                        size="small"
                      >
                        <ToggleButton value="graph" aria-label="graph view">
                          <ShowChartIcon sx={{ mr: 1 }} />
                          Graph
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="table view">
                          <BarChartIcon sx={{ mr: 1 }} />
                          Table
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <FormControl
                        size="small"
                        sx={{
                          minWidth: 150,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      >
                        <InputLabel>Time Range</InputLabel>
                        <Select
                          value={selectedTimeRange}
                          label="Time Range"
                          onChange={(e) => setSelectedTimeRange(e.target.value)}
                        >
                          {Object.keys(allRateTrendsData).map((range) => (
                            <MenuItem key={range} value={range}>
                              {range}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      {viewMode === 'graph' && (
                        <ToggleButtonGroup
                          value={Object.keys(visibleSeries).filter(key => visibleSeries[key])}
                          onChange={(event, newValues) => {
                            setVisibleSeries({
                              ADR: newValues.includes('ADR'),
                              Compset: newValues.includes('Compset')
                            });
                          }}
                          aria-label="visible series"
                          sx={{
                            '& .MuiToggleButton-root': {
                              borderRadius: 2,
                              mx: 0.5,
                              px: 3,
                              py: 1,
                              textTransform: 'none',
                              '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'primary.dark',
                                }
                              }
                            }
                          }}
                        >
                          <ToggleButton value="ADR">
                            Your Hotel
                          </ToggleButton>
                          <ToggleButton value="Compset">
                            Compset
                          </ToggleButton>
                        </ToggleButtonGroup>
                      )}
                    </Box>
                  </Box>
                  
                  {viewMode === 'graph' ? (
                    <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={allRateTrendsData[selectedTimeRange]}
                          margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fill: '#666' }} 
                            axisLine={{ stroke: '#e0e0e0' }}
                            tickLine={{ stroke: '#e0e0e0' }}
                            dy={10}
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }}
                          />
                          <YAxis 
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                            tickLine={{ stroke: '#e0e0e0' }}
                            dx={-10}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              bgcolor: 'white',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            labelFormatter={(value) => {
                              const date = new Date(value);
                              return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
                            }}
                          />
                          <Legend 
                            wrapperStyle={{
                              paddingTop: '20px'
                            }}
                          />
                          {visibleSeries.ADR && (
                            <Line
                              type="monotone"
                              dataKey="ADR"
                              stroke="#2196f3"
                              strokeWidth={2}
                              dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
                              name="Your Hotel"
                              activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                          )}
                          {visibleSeries.Compset && (
                            <Line
                              type="monotone"
                              dataKey="Compset"
                              stroke="#4caf50"
                              strokeWidth={2}
                              dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
                              name="Compset Average"
                              activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell align="right">Your Rate</TableCell>
                            <TableCell align="right">City Demand</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell>Top 3 Competitors</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {allRateTrendsData[selectedTimeRange].map((row) => {
                            const date = new Date(row.date);
                            const position = row.competitors.findIndex(comp => comp.ADR < row.ADR) + 1;
                            const top3 = row.competitors.slice(0, 3);
                            
                            return (
                              <TableRow
                                key={row.date}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell>
                                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </TableCell>
                                <TableCell>{row.dayName}</TableCell>
                                <TableCell align="right">£{row.ADR}</TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Box
                                      sx={{
                                        width: 60,
                                        bgcolor: row.cityDemand > 75 ? 'success.light' : row.cityDemand > 50 ? 'warning.light' : 'error.light',
                                        borderRadius: 1,
                                        px: 1,
                                        py: 0.5,
                                        textAlign: 'center'
                                      }}
                                    >
                                      {row.cityDemand}%
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="right">{position} of {row.competitors.length + 1}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {top3.map((comp, idx) => (
                                      <Typography key={comp.name} variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        {idx + 1}. {comp.name} - £{comp.ADR}
                                      </Typography>
                                    ))}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>

                {/* Events Card */}
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <Typography variant="h5" component="h2" fontWeight="600" color="primary" mb={4}>
                    Upcoming Events in London
                  </Typography>
                  <Grid container spacing={3}>
                    {allLondonEvents
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .slice(0, 6)
                      .map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box
                            sx={{
                              p: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 2
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: event.type === 'holiday' ? 'error.lighter' : 'primary.lighter',
                                borderRadius: 1,
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {event.type === 'holiday' ? (
                                <EventIcon sx={{ color: 'error.main' }} />
                              ) : (
                                <CalendarTodayIcon sx={{ color: 'primary.main' }} />
                              )}
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                                {event.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(event.date).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Distribution Health Card */}
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <Typography variant="h5" component="h2" fontWeight="600" color="primary" mb={4}>
                    Distribution Health
                  </Typography>
                  <Grid container spacing={3}>
                    {channelData.map((channel, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Box
                          sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            height: '100%'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                            <Box
                              sx={{
                                bgcolor: 'grey.50',
                                borderRadius: 1,
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {channel.icon}
                            </Box>
                            <Typography variant="h6" fontWeight={600}>
                              {channel.name}
                            </Typography>
                          </Box>
                          
                          <Stack spacing={2}>
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                OTA Rank
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {channel.otaRank}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Parity Score
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {channel.parityScore}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Reviews
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {channel.reviews}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          } />
        </Routes>

        <AskAIDrawer
          open={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
        />
      </Box>
    </Router>
  );
}

export default App;
