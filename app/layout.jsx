import Navbar from '../components/Navbar';
import Cursor from '../sections/Cursor';
import Footer from '../sections/Footer';
import './globals.css';

export const metadata = {
  title: 'Master Chips',
  description: 'Premium potato chips',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Cursor />
      <Navbar />  
      {children}
      <Footer />  
      </body>
    </html>
  );
}
