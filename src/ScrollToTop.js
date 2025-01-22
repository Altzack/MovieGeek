import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the location (route) changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null; // No UI to render
};

export default ScrollToTop;
