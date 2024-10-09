// // // src/LandingPage.js
// // import React, { useState, useEffect } from 'react';

// // const BlogCard = ({ blog }) => {
// //   return (
// //     <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
// //       <h3>{blog._id}</h3>
// //       <p>Username: {blog.Username}</p>
// //       <p>Rating: {blog.Rating}</p>
// //       <p>Number of Ratings: {blog.NumberofRatings}</p>
// //     </div>
// //   );
// // };

// // const LandingPage = () => {
// //   const [blogs, setBlogs] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('http://localhost:3000/blog/getallblogs');
// //         const data = await response.json();
// //         setBlogs(data);
// //       } catch (error) {
// //         console.error('Error fetching blogs:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Blogs</h1>
// //       {blogs.map(blog => (
// //         <BlogCard key={blog._id} blog={blog} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default LandingPage;
// // App.js
// import React from 'react';
// import BoxComponent from './components/BoxComponent';
// import SideBar from './components/SideBar'
// import BlogCard from './components/BlogCard'; 
// import logoimage from './assets/DigitalGroveLogo.png'

// import { styled } from '@mui/system';
// const LayoutContainer = styled('div')({
//   display: 'flex',
//   height: '100vh', // Full height of the viewport
//   overflow: 'hidden', // Prevent content overflow
// });

// const App = () => {
//   const handleButtonClick = () => {
//     // Handle button click logic
//     console.log('Button Clicked!');
//   };

//   const handleLike = () => {
//     // Handle like logic
//     console.log('Liked!');
//   };

//   const handleShare = () => {
//     // Handle share logic
//     console.log('Shared!');
//   };

//   return (
//     <LayoutContainer>
//       <div style={{marginLeft:300}}>
//       <SideBar/>

//       </div>
//       <div >
//       <BlogCard
//       title="Sample Blog Title"
//       image={logoimage}
//       buttonText="Read More"
//       onClick={handleButtonClick}
//       likes={42}
//       categories={['Technology', 'Travel']}
//       keywords={['React', 'Web Development']}
//       ratings={4.5}
//       owner="John Doe"
//       onLike={handleLike}
//       onShare={handleShare}
//     />
//       </div>
     
//     </LayoutContainer>
  
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NewTests from './AllPages/CreateTest'
const App = () => {
  
  return (
    <Router>
      <Routes>

  
  <Route path="/" element={<NewTests />} />
</Routes>

    </Router>
  );
};

export default App;
