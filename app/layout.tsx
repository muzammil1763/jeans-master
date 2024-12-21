import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import '@/styles/styles.scss'

import ReduxProviderWrapper from "@/utils/reduxProviderWrapper"; 

import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Footer from "@/components/Footer/Footer";


const instrument = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anvogue',
  description: 'Multipurpose eCommerce Template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={instrument.className}>
        <ReduxProviderWrapper>
       
            <TopNavOne
              props="style-one bg-black"
              slogan="New customers save 10% with the code GET10"
            />
            <div id="header" className="relative w-full">
              <MenuOne props="bg-transparent" />
            </div>
            {children}
            <Footer />
        
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
