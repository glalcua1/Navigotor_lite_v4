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
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Line, LineChart, Tooltip, Area, ReferenceLine } from 'recharts';
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
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import RateTrends from './RateTrends';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BusinessIcon from '@mui/icons-material/Business';
import AttractionsIcon from '@mui/icons-material/Attractions';

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
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          fontWeight={600} 
          sx={{ 
            mb: 2.5, 
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
          mb: 2
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
                mb: 1.5,
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

// Helper function to get next N days with dates and day names
const getNextNDays = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Find events or holidays on this date
    const eventsOnDate = allLondonEvents.filter(e => e.date === dateString);
    
    return {
      date: dateString,
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      ADR: 140 + Math.round(Math.random() * 10),
      Compset: 135 + Math.round(Math.random() * 10),
      cityDemand: Math.round(Math.random() * 100),
      competitors: competitorsDB.map(comp => ({
        ...comp,
        ADR: comp.ADR + Math.round(Math.random() * 10 - 5)
      })).sort((a, b) => b.ADR - a.ADR),
      events: eventsOnDate
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
  { 
    name: 'London Fashion Week', 
    date: '2024-09-15', 
    footfall: 120000, 
    importance: 'high', 
    impactRadius: '5 miles',
    description: 'Major fashion event affecting central London hotels'
  },
  { 
    name: 'Wimbledon Finals', 
    date: '2024-07-14', 
    footfall: 80000, 
    importance: 'high', 
    impactRadius: '3 miles',
    description: 'Tennis championship with international visitors'
  },
  { 
    name: 'Notting Hill Carnival', 
    date: '2024-08-25', 
    footfall: 200000, 
    importance: 'high', 
    impactRadius: '4 miles',
    description: 'Annual street festival with significant local impact'
  },
  { 
    name: 'London Marathon', 
    date: '2024-04-21', 
    footfall: 50000, 
    importance: 'medium', 
    impactRadius: '10 miles',
    description: 'Athletic event affecting traffic and hotel bookings'
  },
  { 
    name: 'Royal Ascot', 
    date: '2025-06-17', 
    footfall: 75000, 
    importance: 'high', 
    impactRadius: '7 miles',
    description: 'Prestigious horse racing event attracting luxury clientele'
  },
  { 
    name: 'Trooping the Colour', 
    date: '2025-06-14', 
    footfall: 60000, 
    importance: 'high', 
    impactRadius: '5 miles',
    description: 'Official celebration of the Monarch\'s birthday with parades'
  },
  { 
    name: 'Hampton Court Flower Show', 
    date: '2025-06-30', 
    footfall: 40000, 
    importance: 'medium', 
    impactRadius: '6 miles',
    description: 'Major gardening event with international visitors'
  },
  { 
    name: 'London Tech Week', 
    date: '2025-06-09', 
    footfall: 55000, 
    importance: 'medium', 
    impactRadius: '4 miles',
    description: 'Week-long technology conference affecting business hotels'
  },
  { 
    name: 'West End Live', 
    date: '2025-06-21', 
    footfall: 30000, 
    importance: 'medium', 
    impactRadius: '3 miles',
    description: 'Free musical theatre event in Trafalgar Square'
  },
];

const londonHolidays = [
  { 
    name: 'Good Friday', 
    date: '2024-03-29', 
    footfall: 30000, 
    importance: 'medium', 
    impactRadius: 'citywide',
    description: 'National holiday with moderate travel impact'
  },
  { 
    name: 'Easter Monday', 
    date: '2024-04-01', 
    footfall: 35000, 
    importance: 'medium', 
    impactRadius: 'citywide',
    description: 'National holiday with family travel'
  },
  { 
    name: 'Early May Bank Holiday', 
    date: '2024-05-06', 
    footfall: 25000, 
    importance: 'low', 
    impactRadius: 'citywide',
    description: 'Public holiday with moderate impact'
  },
  { 
    name: 'Spring Bank Holiday', 
    date: '2024-05-27', 
    footfall: 28000, 
    importance: 'low', 
    impactRadius: 'citywide',
    description: 'Public holiday with some local travel'
  },
  { 
    name: 'Summer Bank Holiday', 
    date: '2024-08-26', 
    footfall: 40000, 
    importance: 'medium', 
    impactRadius: 'citywide',
    description: 'Late summer holiday with increased tourism'
  },
  { 
    name: 'Christmas Day', 
    date: '2024-12-25', 
    footfall: 60000, 
    importance: 'high', 
    impactRadius: 'citywide',
    description: 'Major holiday with significant travel impact'
  },
  { 
    name: 'Boxing Day', 
    date: '2024-12-26', 
    footfall: 45000, 
    importance: 'medium', 
    impactRadius: 'citywide',
    description: 'Post-Christmas holiday with shopping activity'
  },
];

const allLondonEvents = [
  ...londonEvents.map(e => ({ ...e, type: 'event' })),
  ...londonHolidays.map(e => ({ ...e, type: 'holiday' })),
];

const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Rate Trends', icon: <TrendingUpIcon />, path: '/rate-trends' },
  { text: 'Events', icon: <EventIcon />, path: '/events' },
  { text: 'Cue', icon: <LightbulbIcon />, path: '/cue' },
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the drawer's transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          width: { xs: '100%', sm: 450 },
          maxWidth: { xs: '100%', sm: 450 },
          margin: { xs: 0, sm: 2 },
          height: { xs: '100%', sm: 'auto' },
          maxHeight: { xs: '100%', sm: '90vh' },
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        py: 2,
        px: 3,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
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
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{
            bgcolor: 'grey.100',
            '&:hover': {
              bgcolor: 'grey.200',
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'primary.main',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                }
              }}
            />
          </Box>

          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            mb={2}
            sx={{
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
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
          </Box>

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
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
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
            },
            '&.Mui-disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            }
          }}
        >
          Get Insights
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function NavigationDrawer({ open, drawerWidth }) {
  const location = useLocation();
  
  return (
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
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
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
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius: '0 24px 24px 0',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.lighter',
                    '&:hover': {
                      backgroundColor: 'primary.lighter',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'grey.600',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    opacity: open ? 1 : 0,
                    visibility: open ? 'visible' : 'hidden',
                    transition: theme => theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.enteringScreen,
                    }),
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          backdropFilter: 'blur(6px)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: { sm: open ? `${drawerWidth}px` : '72px' },
          width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` },
          transition: 'margin-left 0.3s ease, width 0.3s ease'
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: { xs: 64, sm: 70 }, 
            px: { xs: 2, sm: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hyatt London
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  ml: 1.5, 
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                Revenue Navigator
              </Typography>
            </Box>
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

      <NavigationDrawer open={open} drawerWidth={drawerWidth} />

      <Routes>
        <Route path="/rate-trends" element={
          <Box component="main" sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3, md: 4 }, 
            mt: 8,
            ml: { sm: open ? `${drawerWidth}px` : '72px' },
            transition: 'margin-left 0.3s ease',
            width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` }
          }}>
            <RateTrends competitorsDB={competitorsDB} />
          </Box>
        } />
        <Route path="/" element={
          <Box component="main" sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3, md: 4 }, 
            mt: 8,
            ml: { sm: open ? `${drawerWidth}px` : '72px' },
            transition: 'margin-left 0.3s ease',
            width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` }
          }}>
            <Box
              sx={{
                flexGrow: 1,
                width: '100%',
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent',
                maxWidth: '100%'
              }}
            >
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid 
                  item 
                  xs={12} 
                  md={3} 
                  sx={{ 
                    p: { xs: 1, sm: 1.5 },
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
                      display: 'flex',
                      flexDirection: 'column',
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
                  md={3} 
                  sx={{ 
                    p: { xs: 1, sm: 1.5 },
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
                  md={3} 
                  sx={{ 
                    p: { xs: 1, sm: 1.5 },
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
                  mb: 4,
                  width: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                    borderColor: 'primary.light'
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '25%',
                    height: '100%',
                    background: `linear-gradient(135deg, transparent 40%, rgba(33, 150, 243, 0.04) 100%)`,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: 3,
                    mb: 4,
                    width: '100%',
                    position: 'relative',
                    zIndex: 1
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
                      Rate Trends Analysis
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
                      onChange={(e, newValue) => newValue && setViewMode(newValue)}
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
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'primary.main',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
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
                          '& .MuiToggleButtonGroup-grouped': {
                            borderRadius: '8px !important',
                            mx: 0.5,
                            border: '1px solid',
                            borderColor: 'divider',
                          },
                          '& .MuiToggleButton-root': {
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&.Mui-selected': {
                              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                              color: 'white',
                              fontWeight: 600,
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
                  <Box 
                    sx={{ 
                      height: 400, 
                      width: '100%', 
                      mt: 2,
                      borderRadius: 3,
                      p: 2,
                      bgcolor: 'rgba(245, 247, 250, 0.5)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={allRateTrendsData[selectedTimeRange]}
                        margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: '#637381', fontSize: 12 }} 
                          axisLine={{ stroke: '#e0e0e0' }}
                          tickLine={{ stroke: '#e0e0e0' }}
                          dy={10}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
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
                          labelStyle={{
                            fontWeight: 600,
                            marginBottom: 8,
                            color: '#1a2027'
                          }}
                          itemStyle={{
                            padding: '4px 0',
                            fontSize: 14
                          }}
                          labelFormatter={(value, name, props) => {
                            const date = new Date(value);
                            return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
                          }}
                          formatter={(value, name, props) => {
                            const { payload } = props;
                            // Calculate position based on ADR compared to competitors
                            if (name === "Your Hotel" && payload) {
                              const position = payload.competitors?.findIndex(comp => comp.ADR < payload.ADR) + 1 || "N/A";
                              const totalCompetitors = payload.competitors?.length + 1 || "N/A";
                              return [`£${value} (Position: ${position} of ${totalCompetitors})`, name];
                            }
                            return [`£${value}`, name];
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
                        
                        {/* Adding reference lines for events */}
                        {allRateTrendsData[selectedTimeRange].map((day, index) => {
                          if (day.events && day.events.length > 0) {
                            return (
                              <ReferenceLine
                                key={`event-${index}`}
                                x={day.date}
                                stroke={day.events[0].type === 'holiday' ? '#f44336' : '#ff9800'}
                                strokeDasharray="3 3"
                                label={{
                                  value: day.events[0].type === 'holiday' ? '🎉' : '📅',
                                  position: 'insideTopRight',
                                  fill: day.events[0].type === 'holiday' ? '#f44336' : '#ff9800',
                                  fontSize: 14,
                                }}
                              />
                            );
                          }
                          return null;
                        })}
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
                      mt: 2,
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
                          <TableCell align="right">City Demand</TableCell>
                          <TableCell align="right">Position</TableCell>
                          <TableCell>Top 3 Competitors</TableCell>
                          <TableCell>Events & Holidays</TableCell>
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
                              sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                ...(row.events && row.events.length > 0 && {
                                  bgcolor: row.events[0].type === 'holiday' ? 'error.lighter' : 'warning.lighter',
                                  '&:hover': {
                                    bgcolor: row.events[0].type === 'holiday' ? 'error.lighter' : 'warning.lighter',
                                  }
                                })
                              }}
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
                              <TableCell>
                                {row.events && row.events.length > 0 ? (
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {row.events.map((event, idx) => (
                                      <Box 
                                        key={event.name} 
                                        sx={{ 
                                          display: 'flex', 
                                          alignItems: 'center', 
                                          gap: 0.5,
                                          bgcolor: event.type === 'holiday' ? 'error.lighter' : 'warning.lighter',
                                          border: '1px solid',
                                          borderColor: event.type === 'holiday' ? 'error.light' : 'warning.light',
                                          borderRadius: 1,
                                          px: 1,
                                          py: 0.5,
                                        }}
                                      >
                                        {event.type === 'holiday' ? (
                                          <EventIcon sx={{ color: 'error.main', fontSize: 16 }} />
                                        ) : (
                                          <CalendarTodayIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                        )}
                                        <Typography variant="caption" fontWeight={600}>
                                          {event.name}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                ) : (
                                  <Typography variant="caption" color="text.secondary">
                                    No events
                                  </Typography>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>

              {/* City Demand Card */}
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
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '30%',
                    height: '100%',
                    background: `linear-gradient(135deg, transparent 40%, rgba(33, 150, 243, 0.04) 100%)`,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, position: 'relative', zIndex: 1 }}>
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
                    <PeopleIcon 
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
                    City Demand
                  </Typography>
                </Box>
                
                <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        height: '100%',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, position: 'relative', zIndex: 1 }}>
                        <Box
                          sx={{
                            bgcolor: 'grey.50',
                            borderRadius: 2,
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)'
                          }}
                        >
                          <TrendingUpIcon style={{ color: '#2196f3', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                          Overall Demand
                        </Typography>
                      </Box>
                      
                      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Current Rate
                          </Typography>
                          <Typography variant="h4" fontWeight={700} color="primary.main">
                            85%
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16 }} />
                            <Typography variant="body2" color="success.main" fontWeight={600}>
                              +12%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              vs last month
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        height: '100%',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: 'success.main',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, position: 'relative', zIndex: 1 }}>
                        <Box
                          sx={{
                            bgcolor: 'success.lighter',
                            borderRadius: 2,
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: 'success.light',
                            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)'
                          }}
                        >
                          <BusinessIcon style={{ color: '#4caf50', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                          Business District
                        </Typography>
                      </Box>
                      
                      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Current Rate
                          </Typography>
                          <Typography variant="h4" fontWeight={700} color="success.main">
                            92%
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16 }} />
                            <Typography variant="body2" color="success.main" fontWeight={600}>
                              +15%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              vs last month
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        height: '100%',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: 'warning.main',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, position: 'relative', zIndex: 1 }}>
                        <Box
                          sx={{
                            bgcolor: 'warning.lighter',
                            borderRadius: 2,
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: 'warning.light',
                            boxShadow: '0 2px 8px rgba(255, 152, 0, 0.2)'
                          }}
                        >
                          <AttractionsIcon style={{ color: '#ff9800', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                          Tourist Areas
                        </Typography>
                      </Box>
                      
                      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Current Rate
                          </Typography>
                          <Typography variant="h4" fontWeight={700} color="warning.main">
                            78%
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16 }} />
                            <Typography variant="body2" color="success.main" fontWeight={600}>
                              +8%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              vs last month
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
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
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '30%',
                    height: '100%',
                    background: `linear-gradient(135deg, transparent 40%, rgba(33, 150, 243, 0.04) 100%)`,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, position: 'relative', zIndex: 1 }}>
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
                </Box>
                
                <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                  {channelData.map((channel, index) => {
                    const parityScore = parseInt(channel.parityScore);
                    const parityStatus = parityScore >= 97 ? 'excellent' : parityScore >= 93 ? 'good' : 'poor';
                    const reviewScore = parseFloat(channel.reviews.split('/')[0]);
                    
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <Box
                          sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            height: '100%',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              borderColor: channel.color,
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: 100,
                              height: 100,
                              background: `linear-gradient(135deg, transparent 50%, ${channel.color}14 100%)`,
                              zIndex: 0
                            }}
                          />
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, position: 'relative', zIndex: 1 }}>
                            <Box
                              sx={{
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderColor: `${channel.color}40`,
                                boxShadow: `0 2px 8px ${channel.color}20`
                              }}
                            >
                              {React.cloneElement(channel.icon, { style: { color: channel.color, fontSize: 28 } })}
                            </Box>
                            <Typography variant="h6" fontWeight={600}>
                              {channel.name}
                            </Typography>
                          </Box>
                          
                          <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <StarIcon sx={{ fontSize: 16 }} /> OTA Rank
                              </Typography>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ color: channel.color }}>
                                {channel.otaRank}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CompareArrowsIcon sx={{ fontSize: 16 }} /> Parity Score
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {channel.parityScore}
                                </Typography>
                                <Box 
                                  sx={{ 
                                    px: 1.5, 
                                    py: 0.5, 
                                    bgcolor: parityStatus === 'excellent' ? 'success.lighter' : parityStatus === 'good' ? 'warning.lighter' : 'error.lighter',
                                    color: parityStatus === 'excellent' ? 'success.main' : parityStatus === 'good' ? 'warning.main' : 'error.main',
                                    borderRadius: 4,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                  }}
                                >
                                  {parityStatus}
                                </Box>
                              </Box>
                            </Box>
                            
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PeopleIcon sx={{ fontSize: 16 }} /> Reviews
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {channel.reviews}
                                </Typography>
                                <Box sx={{ 
                                  width: '100%', 
                                  height: 6, 
                                  bgcolor: 'grey.100', 
                                  borderRadius: 3,
                                  overflow: 'hidden'
                                }}>
                                  <Box sx={{ 
                                    height: '100%', 
                                    width: `${reviewScore * 20}%`, 
                                    bgcolor: reviewScore >= 4.5 ? 'success.main' : reviewScore >= 4.0 ? 'warning.main' : 'error.main',
                                    borderRadius: 3
                                  }} />
                                </Box>
                              </Box>
                            </Box>
                          </Stack>
                        </Box>
                      </Grid>
                    );
                  })}
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
  );
}

export default App;
