import { Nav } from '../components/Nav';
import '../styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <header>
          <Nav />
        </header>
        {children}
      </body>
    </html>
  );
}
