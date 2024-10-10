import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer >
      <p>© {currentYear} Shrestha</p>
    </footer>
  );
};


export default Footer;