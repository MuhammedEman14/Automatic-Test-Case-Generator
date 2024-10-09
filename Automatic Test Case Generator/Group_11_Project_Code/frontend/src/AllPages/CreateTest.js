import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import logoImage from '../assets/DigitalGroveLogo.png'
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material'; // Assuming you have the GradientButton component
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Table from './Table'

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const AddBlog = () => {
  const[testResults,setTestResults]=useState(null);
  const [blogData, setBlogData] = useState({
    code: '',
    Testtitle: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function getCurrentTimestamp() {
    return new Date().getTime();
  }
  const addExportIfNeeded = (code) => {
    // Use a regular expression to find function declarations without 'export'
    const functionDeclarationRegex = /(function\s+[\w$]+\s*\()/g;
  
    // Replace each function declaration without 'export' with 'export function'
    code = code.replace(functionDeclarationRegex, 'export $1');
  
    return code;
  };
  
    const handleAddBlog = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          // Handle case where token is not available (user not logged in)
          // token=""
          console.error('Token not found in local storage');
          // return;
        }
  console.log(blogData)
  console.log(addExportIfNeeded(blogData.code))
        const response = await fetch('http://localhost:3001/run-tests', {
  method: 'POST',
  body: JSON.stringify({
    userCode: addExportIfNeeded(blogData.code),
    title: blogData.Testtitle,
  }),
  headers: {
    'Content-Type': 'application/json',
    token: `${token}`,
  },
});
  
        if (!response.ok) {
          throw new Error('Failed to test');
        }
  else{
    let data=await response.json();
    setTestResults(data)
    console.log(data.appFileContent);
    console.log(data.testFileContent);

  }
      
        console.log('tested successfully');
      } catch (error) {
        console.error('Error testing:', error.message);
      }
    };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 175;
  const marginRight = isMobile ? 10 : 175;
  const cardStyle = {
    width: '33%', // Set the default width to cover 33% of the available space
    margin: '1%',
  };

  return (
    <>
          {/* <div>
        <SideBar active="/addblog" />
      </div> */}
      <div style={{ marginTop: 30, 
        marginLeft, marginRight
         }}>
    <Card>
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
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            Test your typescript code
          </Typography>
        </div>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="Testtitle"
          value={blogData.Accounttitle}
          onChange={handleInputChange}
          style={{ marginTop: '16px' }}
        />

        <TextField
          label="Your code"
          variant="outlined"
          fullWidth
          multiline
          rows={12}
          name="code"
          value={blogData.Blogdata}
          onChange={handleInputChange}
          style={{ marginTop: '16px' }}
        />
        <div style={{
          display:'flex',flexDirection:'row',justifyContent:'space-between'
        }}>
        <GradientButton onClick={handleAddBlog} variant="contained" size="small" startIcon={<Add />} style={{height:40,borderRadius:10,marginTop:10}}>
          Test this code
        </GradientButton>
       
        </div>
        
      </CardContent>
    </Card>

   
   
  
    {(testResults!==null)?
<>

        <Table data={testResults}/>
        <div style={{ marginTop: 30
         }}>
    <Card>
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
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            Tests Generated
          </Typography>
        </div>
        {/* <div> */}
        <Typography
            // variant="h"
            sx={{
              marginTop: '8px',
              textAlign: 'center',
              color: `linear-gradient(to right, #000000, #3533CD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            {testResults.testFileContent}
          </Typography>
        {/* </div> */}
        </CardContent>
        </Card>
        </div>
</>
        // <div>
          
        //    </div>
           :
           <></>
        }
    
    </div>
    </>
  );
};

export default AddBlog;
