import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import logoImage from '../assets/DigitalGroveLogo.png';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import GradientPieChart from '../components/charts/PieChart';
import GradientLineChart from '../components/charts/GradientLineChart'
import BarChart from '../components/charts/BarChart'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import html2pdf from 'html2pdf.js';
import { Download } from '@mui/icons-material';
import { styled } from '@mui/system';

const UserTable = ({ data }) => {
  const columns = [
    { id: 'type', label: 'Type' },
    { id: 'covered', label: 'Covered' },
    { id: 'uncovered', label: 'Uncovered' },
    { id: 'percentage', label: 'Percentage' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{"Statement Coverage"}</TableCell>
            <TableCell>{data.totalStatements}</TableCell>
            <TableCell>{data.coveredStatements}</TableCell>
            <TableCell>{data.statementCoverage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"Branch Coverage"}</TableCell>
            <TableCell>{data.totalBranches}</TableCell>
            <TableCell>{data.coveredBranches}</TableCell>
            <TableCell>{data.branchCoverage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"Function Coverage"}</TableCell>
            <TableCell>{data.totalFunctions}</TableCell>
            <TableCell>{data.coveredFunctions}</TableCell>
            <TableCell>{data.functionalCoverage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"Path Coverage"}</TableCell>
            <TableCell>{data.totalPathStatements}</TableCell>
            <TableCell>{data.coveredPathStatements}</TableCell>
            <TableCell>{data.pathCoverage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"Condition Coverage"}</TableCell>
            <TableCell>{data.totalConditions}</TableCell>
            <TableCell>{data.coveredConditions}</TableCell>
            <TableCell>{data.conditionCoverage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"MC/DC Coverage"}</TableCell>
            <TableCell>{data.totalDecisions}</TableCell>
            <TableCell>{data.coveredDecisions}</TableCell>
            <TableCell>{data.multipleConditionDecisionCoverage}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BlockedUsersPage = (props) => {
  const [data, setData] = useState(props.data.coverageMetrics);
  const[testResults,setTestResults]=useState(props.data);

  const handleDownloadPDF = () => {
    const wrapperElement = document.createElement('div');

    const cardContentClone = document.getElementById('card-content').cloneNode(true);
    wrapperElement.appendChild(cardContentClone);

    const userTableClone = document.getElementById('pdf-content').cloneNode(true);
    wrapperElement.appendChild(userTableClone);

    const pdfOptions = {
      margin: 10,
      filename: 'coverage_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(wrapperElement).set(pdfOptions).save();
  };

  const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(to right, #000000, #3533CD)',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(to right, #000000, #3533CD)',
    },
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const marginLeft = isMobile ? 10 : 175;
  const marginRight = isMobile ? 10 : 175;
  const cardStyle = {
    width: '33%', // Set the default width to cover 33% of the available space
    margin: '1%',
  };

  return (
    <Box>
        <div >

<GradientButton onClick={handleDownloadPDF} variant="contained" size="small" startIcon={<Download />} style={{ height: 40, borderRadius: 10, marginLeft: '90%',marginBottom:10, marginTop: 10 }}>
        Export
      </GradientButton>

</div>
      <Card id="card-content">
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
            <Avatar alt="Logo" src={logoImage} sx={{ width: 64, height: 64, marginRight: 2 }} />
            <Typography
              variant="h5"
              sx={{
                marginTop: '8px',
                textAlign: 'center',
                height: 15,
                color: `linear-gradient(to right, #000000, #3533CD)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: isMobile ? 0 : '16px',
              }}
            >
              Report
            </Typography>
          </div>
        </CardContent>
      </Card>
   
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px'
    // ,flexWrap:'wrap'
     }}>
<Card  style={{ ...cardStyle }}>
      <CardContent>
        
      <GradientPieChart data={testResults} />
        </CardContent></Card>
        <Card  style={{ ...cardStyle }}>
      <CardContent>
        
      <BarChart  data={testResults}/>
        </CardContent></Card>
        <Card  style={{ ...cardStyle }}>
      <CardContent>
        
      <GradientLineChart  data={testResults}/>
        </CardContent></Card>
        </div>
        <Box id="pdf-content">
        <UserTable data={data} />
      </Box>
    </Box>
  );
};

export default BlockedUsersPage;
