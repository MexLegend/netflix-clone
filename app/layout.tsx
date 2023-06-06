import './globals.css';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';

export const metadata = {
  title: 'Netflix Clone',
  description: 'This is a Netflix clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body >
        <AuthContext>
          <ToasterContext />
          {/* <ActiveStatus /> */}
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
