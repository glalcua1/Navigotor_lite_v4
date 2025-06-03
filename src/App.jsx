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
import Container from '@mui/material/Container';
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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RateTrends from './RateTrends';

const drawerWidth = 240;

function OverviewCard({ title, value, icon, color, trend, trendLabel, trendColor, miniChart, explanation }) {
  return (
    <Card
      sx={{
        flex: 1,
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)',
        border: '1px solid #f0f1f3',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 180,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 24px 0 rgba(16,30,54,0.10)',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600} mb={1}>
            {title}
          </Typography>
          <Typography variant="h3" color="text.primary" fontWeight={800} mb={0.5}>
            {value}
          </Typography>
          {explanation && (
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              {explanation}
            </Typography>
          )}
          {trend && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color={trendColor || 'success.main'} fontWeight={700}>
                {trend}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {trendLabel}
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" minWidth={48}>
          {miniChart || icon}
        </Box>
      </Box>
    </Card>
  );
}

const allRateTrendsData = {
  'Next 7 Days': Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    ADR: 140 + Math.round(Math.random() * 10),
    Compset: 135 + Math.round(Math.random() * 10),
    position: `${Math.ceil(Math.random() * 5)}th out of 10`,
  })),
  'Next 14 Days': Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    ADR: 140 + Math.round(Math.random() * 10),
    Compset: 135 + Math.round(Math.random() * 10),
    position: `${Math.ceil(Math.random() * 5)}th out of 10`,
  })),
  'Next 30 Days': Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    ADR: 140 + Math.round(Math.random() * 10),
    Compset: 135 + Math.round(Math.random() * 10),
    position: `${Math.ceil(Math.random() * 5)}th out of 10`,
  })),
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
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Rate Trends', icon: <TrendingUpIcon /> },
  { text: 'Events', icon: <EventIcon /> },
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

// Add a database of 10 hotel competitors with mock ADRs
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

function App() {
  // Filter states
  const [date, setDate] = useState('2024-06-01');
  const [compareDate, setCompareDate] = useState('2024-07-01');
  const [los, setLos] = useState(1);
  const [roomType, setRoomType] = useState(roomTypes[0]);
  const [lowestRate, setLowestRate] = useState('');
  const [filteredData, setFilteredData] = useState(allRateTrendsData['Next 30 Days']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiDialogOpen, setAIDialogOpen] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [period, setPeriod] = useState('Next 30 Days');
  const [otaChannel, setOtaChannel] = useState('All');
  const [compareWith, setCompareWith] = useState('Yesterday');
  const [compset, setCompset] = useState('Primary');
  const [showMarketDemand, setShowMarketDemand] = useState(false);
  const [showAirlineData, setShowAirlineData] = useState(false);
  const [chartView, setChartView] = useState('bar');
  const aiPrompts = [
    {
      text: 'Show me the best rates for next weekend',
      icon: <TrendingUpIcon color="primary" />,
    },
    {
      text: 'Compare my hotel rates with competitors',
      icon: <CompareArrowsIcon color="primary" />,
    },
    {
      text: 'What is the average rate trend for the last 30 days?',
      icon: <TimelineIcon color="primary" />,
    },
    {
      text: 'Are there any parity issues this week?',
      icon: <WarningAmberIcon color="warning" />,
    },
    {
      text: 'Suggest pricing strategies for high occupancy dates',
      icon: <LightbulbIcon color="primary" />,
    },
  ];

  // Update filteredData when period changes
  useEffect(() => {
    setFilteredData(allRateTrendsData[period] || allRateTrendsData['Next 30 Days']);
  }, [period]);

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  const handleAIClick = () => setAIDialogOpen(true);
  const handleAIClose = () => setAIDialogOpen(false);
  const handlePromptClick = (prompt) => {
    // Example dynamic AI response using competitors
    let response = '';
    if (prompt.includes('best rates')) {
      response = `Your hotel ranks 2nd out of 10 for best rates this weekend. Only ${competitors[0]} has a lower rate.\n\nCompetitors: ${competitors.join(', ')}`;
    } else if (prompt.includes('Compare my hotel rates')) {
      response = `Your ADR is $145.\n\nCompetitor ADRs:\n` + competitors.map((name, i) => `- ${name}: $${140 + i}`).join('\n');
    } else if (prompt.includes('average rate trend')) {
      response = `The average ADR for the last 30 days among competitors is $142.\n\nCompetitors: ${competitors.join(', ')}`;
    } else if (prompt.includes('parity issues')) {
      response = `No major parity issues detected this week.\n\nCompetitors checked: ${competitors.slice(0, 5).join(', ')}...`;
    } else if (prompt.includes('pricing strategies')) {
      response = `Consider increasing rates for high occupancy dates.\n\nCompetitors like ${competitors[2]} and ${competitors[5]} have already raised their prices.`;
    } else {
      response = `AI is thinking... (This is a placeholder for the AI response to: "${prompt}")`;
    }
    setAIResponse(response);
  };

  // Helper to get month/year label for Rate Trends
  function getRateTrendsMonthLabel() {
    // Assume start date is June 1, 2025
    const start = new Date('2025-06-01');
    let end = new Date(start);
    if (period === 'Next 7 Days') end.setDate(start.getDate() + 6);
    else if (period === 'Next 14 Days') end.setDate(start.getDate() + 13);
    else end.setDate(start.getDate() + 29);
    // If start and end are in the same month, show that month; else show range
    if (start.getMonth() === end.getMonth()) {
      return `for ${start.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    } else {
      return `for ${start.toLocaleString('default', { month: 'long' })} - ${end.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    }
  }

  // Generate mock trend line data for Market Demand and Airline Data
  const chartDataWithTrends = filteredData.map((d, i) => ({
    ...d,
    marketDemand: 180 + Math.round(Math.sin(i / 5) * 10) + (i % 7),
    airlineData: 170 + Math.round(Math.cos(i / 7) * 8) + (i % 5),
  }));

  // Helper to get the date range for a given period string
  function getPeriodRangeByLabel(periodLabel) {
    const start = new Date('2025-06-01');
    let days = 30;
    if (periodLabel === 'Next 7 Days') days = 7;
    else if (periodLabel === 'Next 14 Days') days = 14;
    const end = new Date(start);
    end.setDate(start.getDate() + days - 1);
    return { start, end, days };
  }

  // Generate mock data for a period
  function generateMockKPI(periodLabel) {
    // Just for demo, randomize based on period
    if (periodLabel === 'Next 7 Days') return { ADR: 145, compsetADR: 132, availability: 92, parity: 98 };
    if (periodLabel === 'Next 14 Days') return { ADR: 143, compsetADR: 133, availability: 91, parity: 97 };
    if (periodLabel === 'Next 30 Days') return { ADR: 140, compsetADR: 134, availability: 90, parity: 96 };
    return { ADR: 140, compsetADR: 134, availability: 90, parity: 96 };
  }
  function generateMockDistribution(periodLabel) {
    if (periodLabel === 'Next 7 Days') return [
      { name: 'Booking.com', otaRank: 2, parityScore: 97, reviews: 4.6 },
      { name: 'Expedia', otaRank: 3, parityScore: 95, reviews: 4.4 },
      { name: 'Agoda', otaRank: 1, parityScore: 99, reviews: 4.7 },
    ];
    if (periodLabel === 'Next 14 Days') return [
      { name: 'Booking.com', otaRank: 3, parityScore: 96, reviews: 4.5 },
      { name: 'Expedia', otaRank: 2, parityScore: 94, reviews: 4.3 },
      { name: 'Agoda', otaRank: 1, parityScore: 98, reviews: 4.6 },
    ];
    return [
      { name: 'Booking.com', otaRank: 4, parityScore: 95, reviews: 4.4 },
      { name: 'Expedia', otaRank: 3, parityScore: 93, reviews: 4.2 },
      { name: 'Agoda', otaRank: 2, parityScore: 97, reviews: 4.5 },
    ];
  }
  function generateMockTrends(periodLabel) {
    const { days } = getPeriodRangeByLabel(periodLabel);
    return Array.from({ length: days }, (_, i) => ({
      day: `Day ${i + 1}`,
      ADR: 140 + Math.round(Math.random() * 10),
      Compset: 135 + Math.round(Math.random() * 10),
      position: `${Math.ceil(Math.random() * 5)}th out of 10`,
    }));
  }

  // Get current and compare period data
  const kpiCurrent = generateMockKPI(period);
  const kpiCompare = generateMockKPI(compareWith);
  const distCurrent = generateMockDistribution(period);
  const distCompare = generateMockDistribution(compareWith);
  const trendsCurrent = filteredData.map((d, i) => {
    // For demo, rotate ADRs for each day
    const compADRs = competitorsDB.map((c, idx) => c.ADR + ((i + idx) % 3));
    const avgCompset = Math.round(compADRs.reduce((a, b) => a + b, 0) / compADRs.length);
    return {
      ...d,
      Compset: avgCompset,
      competitors: competitorsDB.map((c, idx) => ({
        name: c.name,
        ADR: compADRs[idx],
        position: null // will be filled below
      })),
      myHotel: { name: 'My Hotel', ADR: d.ADR },
    };
  });
  // Assign positions for each competitor and myHotel for each day
  trendsCurrent.forEach(day => {
    const all = [day.myHotel, ...day.competitors];
    all.sort((a, b) => a.ADR - b.ADR);
    all.forEach((item, idx) => {
      item.position = `${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'}`;
    });
    // Update positions in day
    day.myHotel.position = all.find(i => i.name === 'My Hotel').position;
    day.competitors.forEach(c => {
      c.position = all.find(i => i.name === c.name).position;
    });
  });

  // KPI variance helpers
  function getVariance(curr, prev) {
    if (prev === 0) return 0;
    return ((curr - prev) / prev) * 100;
  }

  // Filter events/holidays based on period
  const { start: periodStart, end: periodEnd } = getPeriodRangeByLabel(period);
  const filteredLondonEvents = allLondonEvents.filter(e => {
    const d = new Date(e.date);
    return d >= periodStart && d <= periodEnd;
  });

  // Add state for competitor modal
  const [competitorModal, setCompetitorModal] = useState({ open: false, day: null });

  // Add state for hovered day in Rate Trends
  const [hoveredDay, setHoveredDay] = useState(null);

  // Add state for toggling series visibility
  const [visibleSeries, setVisibleSeries] = useState({ ADR: true, Compset: true });

  // Legend click handler
  const handleLegendClick = (o) => {
    const key = o.dataKey;
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', bgcolor: '#f5f6fa', minHeight: '100vh' }}>
        <CssBaseline />
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? drawerWidth : 72,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            [`& .MuiDrawer-paper`]: {
              width: sidebarOpen ? drawerWidth : 72,
              boxSizing: 'border-box',
              bgcolor: '#fff',
              borderRight: '1px solid #e0e0e0',
              overflowX: 'hidden',
              transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar sx={{ minHeight: 64, justifyContent: sidebarOpen ? 'flex-start' : 'center', px: 1 }}>
            {sidebarOpen && (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" color="primary" fontWeight={800} sx={{ letterSpacing: 1 }}>
                  BCV
                </Typography>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#f5f6fa',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'primary.main',
                    fontSize: 18,
                  }}
                >
                  HYATT
                </Box>
              </Box>
            )}
          </Toolbar>
          <Divider />
          <List>
            {sidebarItems.map((item, idx) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={idx === 0 ? '/' : idx === 1 ? '/rate-trends' : '#'}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: sidebarOpen ? 2 : 1,
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                selected={window.location.pathname === (idx === 0 ? '/' : idx === 1 ? '/rate-trends' : '#')}
              >
                <ListItemIcon sx={{
                  color: idx === 0 ? 'primary.main' : 'inherit',
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : 'auto',
                  justifyContent: 'center',
                  transition: 'margin 0.2s',
                }}>
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: idx === 0 ? 700 : 500 }}
                  />
                )}
              </ListItem>
            ))}
          </List>
          <Box flexGrow={1} />
          <Divider />
          <List>
            <ListItem button sx={{ borderRadius: 2, my: 0.5, justifyContent: sidebarOpen ? 'initial' : 'center', px: sidebarOpen ? 2 : 1 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: sidebarOpen ? 2 : 'auto', justifyContent: 'center' }}><SettingsIcon color="action" /></ListItemIcon>
              {sidebarOpen && <ListItemText primary="Settings" />}
            </ListItem>
          </List>
          <Box p={2} sx={{ display: 'flex', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon color="primary" />
              {sidebarOpen && (
                <Box>
                  <Typography variant="body2" fontWeight={700}>John Mathew</Typography>
                  <Typography variant="caption" color="success.main">100% Complete</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Drawer>
        {/* Main Content Routing */}
        <Box component="main" sx={{ flexGrow: 1, p: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={
              <React.Fragment>
                <AppBar position="fixed" color="inherit" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#fff', borderBottom: '1px solid #e0e0e0' }}>
                  <Toolbar sx={{ minHeight: 64, display: 'flex', gap: 2 }}>
                    <IconButton color="primary" edge="start" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
                      {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" color="primary" fontWeight={800} sx={{ letterSpacing: 1, mr: 3 }}>
                      Navigator
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
                      <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Property</InputLabel>
                        <Select label="Property" value="Hyatt, London">
                          <MenuItem value="Hyatt, London">Hyatt, London</MenuItem>
                          <MenuItem value="Hyatt, Paris">Hyatt, Paris</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Period</InputLabel>
                        <Select
                          label="Period"
                          value={period}
                          onChange={e => setPeriod(e.target.value)}
                        >
                          <MenuItem value="Next 7 Days">Next 7 Days</MenuItem>
                          <MenuItem value="Next 14 Days">Next 14 Days</MenuItem>
                          <MenuItem value="Next 30 Days">Next 30 Days</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Compare with</InputLabel>
                        <Select
                          label="Compare with"
                          value={compareWith}
                          onChange={e => setCompareWith(e.target.value)}
                        >
                          <MenuItem value="Yesterday">Yesterday</MenuItem>
                          <MenuItem value="Last 14 days">Last 14 days</MenuItem>
                          <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>OTA Channel</InputLabel>
                        <Select
                          label="OTA Channel"
                          value={otaChannel}
                          onChange={e => setOtaChannel(e.target.value)}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Booking.com">Booking.com</MenuItem>
                          <MenuItem value="Expedia">Expedia</MenuItem>
                          <MenuItem value="Agoda">Agoda</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Compset</InputLabel>
                        <Select
                          label="Compset"
                          value={compset}
                          onChange={e => setCompset(e.target.value)}
                        >
                          <MenuItem value="Primary">Primary</MenuItem>
                          <MenuItem value="Secondary">Secondary</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Button
                      onClick={handleAIClick}
                      sx={{
                        ml: 2,
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: 16,
                        background: '#fff',
                        border: '1.5px solid #d1d5db',
                        boxShadow: '0 2px 8px 0 rgba(16,30,54,0.06)',
                        textTransform: 'none',
                        color: '#222',
                        transition: 'border-color 0.2s, background 0.2s',
                        '&:hover': {
                          borderColor: '#b0b3b8',
                          background: '#f5f6fa',
                        },
                      }}
                    >
                      <span
                        style={{
                          background: 'linear-gradient(90deg, #1976d2 0%, #00c6fb 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontWeight: 700,
                          fontSize: 16,
                          letterSpacing: 1,
                        }}
                      >
                        ASK AI
                      </span>
                    </Button>
                  </Toolbar>
                </AppBar>
                <Toolbar sx={{ minHeight: 64 }} />
                <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: '#f5f6fa', minHeight: 0 }}>
                  {/* Header with search */}
                  <Box mb={4}></Box>
                  {/* Stat Cards */}
                  <Grid container spacing={4} sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                      <OverviewCard
                        title="ADR"
                        value={`$${kpiCurrent.ADR}`}
                        trend={(() => { const v = getVariance(kpiCurrent.ADR, kpiCompare.ADR); return (v >= 0 ? '+' : '') + v.toFixed(1) + '%'; })()}
                        trendLabel={compareWith}
                        trendColor={getVariance(kpiCurrent.ADR, kpiCompare.ADR) >= 0 ? 'success.main' : 'error.main'}
                        miniChart={<Box component="span" sx={{ width: 48, height: 32, display: 'inline-block', bgcolor: 'transparent' }}><svg width="48" height="32"><rect x="2" y="12" width="4" height="18" rx="2" fill="#1db954"/><rect x="8" y="8" width="4" height="22" rx="2" fill="#1db954"/><rect x="14" y="4" width="4" height="26" rx="2" fill="#1db954"/><rect x="20" y="10" width="4" height="20" rx="2" fill="#1db954"/><rect x="26" y="14" width="4" height="16" rx="2" fill="#1db954"/><rect x="32" y="18" width="4" height="12" rx="2" fill="#1db954"/><rect x="38" y="14" width="4" height="16" rx="2" fill="#1db954"/></svg></Box>}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                      <OverviewCard
                        title="Availability"
                        value={`${kpiCurrent.availability}%`}
                        trend={(() => { const v = getVariance(kpiCurrent.availability, kpiCompare.availability); return (v >= 0 ? '+' : '') + v.toFixed(1) + '%'; })()}
                        trendLabel={compareWith}
                        trendColor={getVariance(kpiCurrent.availability, kpiCompare.availability) >= 0 ? 'success.main' : 'error.main'}
                        miniChart={<Box component="span" sx={{ width: 48, height: 32, display: 'inline-block', bgcolor: 'transparent' }}><svg width="48" height="32"><rect x="2" y="18" width="4" height="12" rx="2" fill="#1da1f2"/><rect x="8" y="10" width="4" height="20" rx="2" fill="#1da1f2"/><rect x="14" y="6" width="4" height="24" rx="2" fill="#1da1f2"/><rect x="20" y="12" width="4" height="18" rx="2" fill="#1da1f2"/><rect x="26" y="16" width="4" height="14" rx="2" fill="#1da1f2"/><rect x="32" y="20" width="4" height="10" rx="2" fill="#1da1f2"/><rect x="38" y="16" width="4" height="14" rx="2" fill="#1da1f2"/></svg></Box>}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                      <OverviewCard
                        title="Parity"
                        value={`${kpiCurrent.parity}%`}
                        trend={(() => { const v = getVariance(kpiCurrent.parity, kpiCompare.parity); return (v >= 0 ? '+' : '') + v.toFixed(1) + '%'; })()}
                        trendLabel={compareWith}
                        trendColor={getVariance(kpiCurrent.parity, kpiCompare.parity) >= 0 ? 'success.main' : 'error.main'}
                        miniChart={<Box component="span" sx={{ width: 48, height: 32, display: 'inline-block', bgcolor: 'transparent' }}><svg width="48" height="32"><rect x="2" y="18" width="4" height="12" rx="2" fill="#ff4d4f"/><rect x="8" y="10" width="4" height="20" rx="2" fill="#ff4d4f"/><rect x="14" y="6" width="4" height="24" rx="2" fill="#ff4d4f"/><rect x="20" y="12" width="4" height="18" rx="2" fill="#ff4d4f"/><rect x="26" y="16" width="4" height="14" rx="2" fill="#ff4d4f"/><rect x="32" y="20" width="4" height="10" rx="2" fill="#ff4d4f"/><rect x="38" y="16" width="4" height="14" rx="2" fill="#ff4d4f"/></svg></Box>}
                      />
                    </Grid>
                  </Grid>
                  {/* Rate Trends and AI Insights Cards */}
                  <Box sx={{ mb: 4, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'stretch', width: '100%' }}>
                      <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 80%' }, maxWidth: { xs: '100%', md: '80%' }, minWidth: 0 }}>
                        <Card sx={{ 
                          height: '100%',
                          bgcolor: '#fff', 
                          borderRadius: 3, 
                          boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)', 
                          border: '1px solid #f0f1f3',
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 360
                        }}>
                          <CardContent sx={{ height: '100%', p: 3 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                              <Box>
                                <Typography variant="h6" fontWeight={700}>Rate Trends</Typography>
                                <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
                                  {period}
                                </Typography>
                              </Box>
                              <ToggleButtonGroup
                                value={chartView}
                                exclusive
                                onChange={(e, v) => v && setChartView(v)}
                                size="small"
                              >
                                <ToggleButton value="bar" aria-label="Bar Chart" sx={{ px: 2 }}>
                                  <BarChartIcon fontSize="small" />
                                  <Box component="span" sx={{ ml: 1, fontWeight: 600, fontSize: 13 }}>Bar chart</Box>
                                </ToggleButton>
                                <ToggleButton value="line" aria-label="Trend Line" sx={{ px: 2 }}>
                                  <ShowChartIcon fontSize="small" />
                                  <Box component="span" sx={{ ml: 1, fontWeight: 600, fontSize: 13 }}>Trend line</Box>
                                </ToggleButton>
                              </ToggleButtonGroup>
                            </Box>
                            <Box sx={{ height: 320, width: '100%' }}>
                              <ResponsiveContainer>
                                {chartView === 'bar' ? (
                                  <BarChart data={trendsCurrent} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                      <linearGradient id="colorADR" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1976d2" stopOpacity={0.9}/>
                                        <stop offset="100%" stopColor="#90caf9" stopOpacity={0.7}/>
                                      </linearGradient>
                                      <linearGradient id="colorCompset" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9c27b0" stopOpacity={0.9}/>
                                        <stop offset="100%" stopColor="#ce93d8" stopOpacity={0.7}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e3e6ee" />
                                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#67749E' }} axisLine={false} tickLine={false} tickFormatter={d => d.replace('Day ', '')} />
                                    <YAxis tick={{ fontSize: 14, fill: '#67749E' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                      cursor={{ fill: '#e3f2fd' }}
                                      content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                          const data = payload[0].payload;
                                          // Calculate the date for this day (assuming start date is 2025-06-01)
                                          const startDate = new Date('2025-06-01');
                                          const dayIndex = parseInt(data.day.replace('Day ', '')) - 1;
                                          const thisDate = new Date(startDate);
                                          thisDate.setDate(startDate.getDate() + dayIndex);
                                          const dayOfWeek = thisDate.toLocaleDateString('en-US', { weekday: 'long' });
                                          const dateStr = thisDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
                                          return (
                                            <Box p={2} bgcolor="#fff" borderRadius={2} boxShadow={4} minWidth={220} style={{ pointerEvents: 'auto' }}>
                                              <Typography variant="subtitle2" fontWeight={700} mb={0.5} sx={{ color: '#23272E' }}>
                                                {dayOfWeek}, {dateStr}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                <span style={{ color: '#1976d2', fontWeight: 700 }}>ADR:</span> <b>${data.ADR}</b>
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                <span style={{ color: '#9c27b0', fontWeight: 700 }}>Compset:</span> <b>${data.Compset}</b>
                                              </Typography>
                                              <Typography variant="body2" color="primary.main" fontWeight={700} mt={1}>Position: {data.myHotel.position} out of 11</Typography>
                                            </Box>
                                          );
                                        }
                                        return null;
                                      }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="ADR" name="ADR" fill="url(#colorADR)" radius={[12, 12, 0, 0]} barSize={8}
                                      style={{ transition: 'filter 0.2s' }}
                                      onMouseMove={state => {
                                        if (state && state.activePayload && state.activePayload[0]) {
                                          setHoveredDay(state.activePayload[0].payload);
                                        }
                                      }}
                                      onMouseLeave={() => setHoveredDay(null)}
                                    />
                                    <Bar dataKey="Compset" name="Avg Compset" fill="url(#colorCompset)" radius={[12, 12, 0, 0]} barSize={8}
                                      style={{ transition: 'filter 0.2s' }}
                                      onMouseMove={state => {
                                        if (state && state.activePayload && state.activePayload[0]) {
                                          setHoveredDay(state.activePayload[0].payload);
                                        }
                                      }}
                                      onMouseLeave={() => setHoveredDay(null)}
                                    />
                                  </BarChart>
                                ) : (
                                  <LineChart data={trendsCurrent} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                      <linearGradient id="lineADRGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1976d2" stopOpacity={0.25}/>
                                        <stop offset="100%" stopColor="#1976d2" stopOpacity={0}/>
                                      </linearGradient>
                                      <linearGradient id="lineCompsetGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9c27b0" stopOpacity={0.18}/>
                                        <stop offset="100%" stopColor="#9c27b0" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e3e6ee" />
                                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#67749E' }} axisLine={false} tickLine={false} tickFormatter={d => d.replace('Day ', '')} />
                                    <YAxis tick={{ fontSize: 14, fill: '#67749E' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                      cursor={{ fill: '#e3f2fd' }}
                                      content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                          const data = payload[0].payload;
                                          // Calculate the date for this day (assuming start date is 2025-06-01)
                                          const startDate = new Date('2025-06-01');
                                          const dayIndex = parseInt(data.day.replace('Day ', '')) - 1;
                                          const thisDate = new Date(startDate);
                                          thisDate.setDate(startDate.getDate() + dayIndex);
                                          const dayOfWeek = thisDate.toLocaleDateString('en-US', { weekday: 'long' });
                                          const dateStr = thisDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
                                          return (
                                            <Box p={2} bgcolor="#fff" borderRadius={2} boxShadow={4} minWidth={220} style={{ pointerEvents: 'auto' }}>
                                              <Typography variant="subtitle2" fontWeight={700} mb={0.5} sx={{ color: '#23272E' }}>
                                                {dayOfWeek}, {dateStr}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                <span style={{ color: '#1976d2', fontWeight: 700 }}>ADR:</span> <b>${data.ADR}</b>
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" mb={0.5}>
                                                <span style={{ color: '#9c27b0', fontWeight: 700 }}>Compset:</span> <b>${data.Compset}</b>
                                              </Typography>
                                              <Typography variant="body2" color="primary.main" fontWeight={700} mt={1}>Position: {data.myHotel.position} out of 11</Typography>
                                            </Box>
                                          );
                                        }
                                        return null;
                                      }}
                                    />
                                    <Legend iconType="circle" />
                                    <Line type="monotone" dataKey="ADR" name="ADR" stroke="#1976d2" strokeWidth={2} dot={{ r: 5, stroke: '#1976d2', strokeWidth: 2, fill: '#fff', filter: 'drop-shadow(0 2px 8px #1976d233)' }} activeDot={{ r: 7 }} fillOpacity={1} fill="url(#lineADRGradient)" />
                                    <Line type="monotone" dataKey="Compset" name="Avg Compset" stroke="#9c27b0" strokeWidth={2} dot={{ r: 5, stroke: '#9c27b0', strokeWidth: 2, fill: '#fff', filter: 'drop-shadow(0 2px 8px #9c27b033)' }} activeDot={{ r: 7 }} fillOpacity={1} fill="url(#lineCompsetGradient)" />
                                  </LineChart>
                                )}
                              </ResponsiveContainer>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 20%' }, maxWidth: { xs: '100%', md: '20%' }, minWidth: 0 }}>
                        <Card sx={{ 
                          height: '100%',
                          bgcolor: '#e3f2fd', 
                          borderRadius: 3, 
                          boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)', 
                          border: '1px solid #bbdefb',
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 360
                        }}>
                          <CardContent sx={{ height: '100%', p: 3 }}>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                              <LightbulbIcon color="primary" />
                              <Typography variant="h6" fontWeight={700}>AI Insight on Rate Trends</Typography>
                            </Box>
                            <Box sx={{
                              p: 2,
                              bgcolor: 'rgba(255,255,255,0.6)',
                              borderRadius: 2,
                              height: 'calc(100% - 60px)'
                            }}>
                              <Typography variant="body1" color="text.primary" fontWeight={600} mb={1}>
                                {(() => {
                                  const adr = kpiCurrent.ADR;
                                  const compset = kpiCurrent.compsetADR;
                                  const delta = adr - compset;
                                  if (delta > 5) {
                                    return `Your ADR is trending $${delta} above the compset average for ${period}. Consider increasing rates on high-demand dates.`;
                                  } else if (delta < -5) {
                                    return `Your ADR is $${Math.abs(delta)} below the compset average for ${period}. You may be underpricing compared to competitors.`;
                                  } else {
                                    return `Your ADR is closely aligned with the compset average for ${period}. Monitor for sudden changes or event-driven demand.`;
                                  }
                                })()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                This insight is generated by AI based on your current rate trends and compset data.
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                  {/* Events & Holidays Card */}
                  <Card sx={{ mb: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)', border: '1px solid #f0f1f3' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} mb={2}>Upcoming Events & Holidays in London</Typography>
                      <Grid container spacing={2}>
                        {filteredLondonEvents.length === 0 ? (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">No events or holidays in this period.</Typography>
                          </Grid>
                        ) : (
                          filteredLondonEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event, idx) => (
                            <Grid item xs={12} md={6} key={event.name + event.date}>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderRadius: 2,
                                  mb: 2,
                                  bgcolor: '#fff',
                                  borderLeft: `6px solid ${event.type === 'holiday' ? '#2e7d32' : '#1976d2'}`,
                                  boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  minHeight: 90,
                                  transition: 'box-shadow 0.2s',
                                  '&:hover': {
                                    boxShadow: '0 4px 24px 0 rgba(16,30,54,0.10)',
                                  },
                                }}
                              >
                                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2, width: '100%' }}>
                                  <Box display="flex" alignItems="center" justifyContent="center" mr={2}>
                                    <EventIcon color={event.type === 'holiday' ? 'success' : 'primary'} sx={{ fontSize: 36 }} />
                                  </Box>
                                  <Box flexGrow={1}>
                                    <Typography variant="subtitle1" fontWeight={700} mb={0.5}>{event.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                                      {new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                    <Typography variant="caption" color={event.type === 'holiday' ? 'success.main' : 'primary.main'} fontWeight={700}>
                                      {event.type === 'holiday' ? 'Holiday' : 'Event'}
                                    </Typography>
                                  </Box>
                                  <Box ml={2} display="flex" alignItems="center" justifyContent="center">
                                    <Box
                                      sx={{
                                        bgcolor: event.type === 'holiday' ? '#e8f5e9' : '#e3f2fd',
                                        color: event.type === 'holiday' ? '#2e7d32' : '#1976d2',
                                        borderRadius: 2,
                                        px: 1.5,
                                        py: 0.5,
                                        fontWeight: 700,
                                        fontSize: 15,
                                        minWidth: 60,
                                        textAlign: 'center',
                                      }}
                                    >
                                      {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* Distribution Health Card */}
                  <Card sx={{ mb: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(16,30,54,0.04)', border: '1px solid #f0f1f3' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} mb={2}>Distribution Health</Typography>
                      <Grid container spacing={3}>
                        {distCurrent.map((channel, idx) => {
                          const prev = distCompare.find(c => c.name === channel.name);
                          // Calculate deltas
                          const deltaOtaRank = prev ? channel.otaRank - prev.otaRank : null;
                          const deltaParity = prev ? channel.parityScore - prev.parityScore : null;
                          const deltaReviews = prev ? channel.reviews - prev.reviews : null;
                          // Color logic
                          const getDeltaColor = v => v > 0 ? '#2e7d32' : v < 0 ? '#d32f2f' : '#888';
                          return (
                            <Grid item xs={12} md={4} sx={{ flex: 1, minWidth: 320, maxWidth: 400 }} key={channel.name}>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderRadius: 2,
                                  bgcolor: '#f8fafc',
                                  border: '1px solid #e0e0e0',
                                  boxShadow: '0 2px 8px 0 rgba(16,30,54,0.04)',
                                  p: 0,
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  transition: 'box-shadow 0.2s',
                                  '&:hover': {
                                    boxShadow: '0 4px 24px 0 rgba(16,30,54,0.10)',
                                  },
                                }}
                              >
                                <CardContent sx={{ width: '100%' }}>
                                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    {channelData[idx].icon}
                                    <Typography variant="subtitle1" fontWeight={700} color={channelData[idx].color}>{channel.name}</Typography>
                                  </Box>
                                  <Box display="flex" flexDirection="column" gap={1}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <EqualizerIcon fontSize="small" color="primary" />
                                      <Typography variant="body2" fontWeight={600}>OTA Rank:</Typography>
                                      <Typography variant="body2">{channel.otaRank}</Typography>
                                      {deltaOtaRank !== null && (
                                        <Typography variant="body2" sx={{ color: getDeltaColor(deltaOtaRank), ml: 1 }}>
                                          ({deltaOtaRank > 0 ? '+' : ''}{deltaOtaRank} vs {compareWith})
                                        </Typography>
                                      )}
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <StarIcon fontSize="small" color="warning" />
                                      <Typography variant="body2" fontWeight={600}>Parity Score:</Typography>
                                      <Typography variant="body2">{channel.parityScore}%</Typography>
                                      {deltaParity !== null && (
                                        <Typography variant="body2" sx={{ color: getDeltaColor(deltaParity), ml: 1 }}>
                                          ({deltaParity > 0 ? '+' : ''}{deltaParity}% vs {compareWith})
                                        </Typography>
                                      )}
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <StarIcon fontSize="small" color="primary" />
                                      <Typography variant="body2" fontWeight={600}>Hotel Reviews:</Typography>
                                      <Typography variant="body2">{channel.reviews}</Typography>
                                      {deltaReviews !== null && (
                                        <Typography variant="body2" sx={{ color: getDeltaColor(deltaReviews), ml: 1 }}>
                                          ({deltaReviews > 0 ? '+' : ''}{deltaReviews} vs {compareWith})
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </React.Fragment>
            } />
            <Route path="/rate-trends" element={<RateTrends />} />
          </Routes>
        </Box>
      </Box>
      {/* ASK AI Drawer */}
      <MuiDrawer
        anchor="right"
        open={aiDialogOpen}
        onClose={handleAIClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            boxSizing: 'border-box',
            p: 0,
            bgcolor: '#fff',
            borderLeft: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #f0f1f3' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <LightbulbIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Ask AI about Rate Shopping</Typography>
          </Box>
          <IconButton onClick={handleAIClose}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pt: 0 }}>
          <Typography variant="subtitle1" mb={2} color="text.secondary">Select a prompt to get AI-powered insights:</Typography>
          <Stack spacing={2} mb={2}>
            {aiPrompts.map((prompt, idx) => (
              <Button
                key={prompt.text}
                variant="outlined"
                startIcon={prompt.icon}
                sx={{ justifyContent: 'flex-start', fontWeight: 600, textTransform: 'none', borderRadius: 2, textAlign: 'left' }}
                onClick={() => handlePromptClick(prompt.text)}
                fullWidth
              >
                {prompt.text}
              </Button>
            ))}
          </Stack>
          {aiResponse && (
            <Box mt={3} p={3} bgcolor="#f5f6fa" borderRadius={2}>
              <Typography variant="body1" fontWeight={600} color="primary.main" mb={1}>AI Response:</Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{aiResponse}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: 2, borderTop: '1px solid #f0f1f3', textAlign: 'right' }}>
          <Button onClick={handleAIClose} color="primary" variant="contained">Close</Button>
        </Box>
      </MuiDrawer>
      {/* Competitor Modal */}
      <Dialog open={competitorModal.open} onClose={() => setCompetitorModal({ open: false, day: null })} maxWidth="sm" fullWidth>
        <DialogTitle>My Hotel & Competitors – {competitorModal.day?.day}</DialogTitle>
        <DialogContent dividers>
          {competitorModal.day && (
            <Box>
              <Typography variant="subtitle1" fontWeight={700} mb={1}>My Hotel</Typography>
              <Box display="flex" justifyContent="space-between" mb={2} p={1} bgcolor="#e3f2fd" borderRadius={2}>
                <Typography fontWeight={600}>ADR: ${competitorModal.day.ADR}</Typography>
                <Typography fontWeight={600}>Position: {competitorModal.day.position} out of 11</Typography>
              </Box>
              <Typography variant="subtitle1" fontWeight={700} mb={1}>Competitors</Typography>
              {competitorModal.day.competitors.map(c => (
                <Box key={c.name} display="flex" justifyContent="space-between" mb={1} p={1} bgcolor="#f5f6fa" borderRadius={2}>
                  <Typography>{c.name}</Typography>
                  <Typography>ADR: ${c.ADR}</Typography>
                  <Typography>Position: {c.position} out of 11</Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompetitorModal({ open: false, day: null })} color="primary" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Router>
  );
}

export default App;
