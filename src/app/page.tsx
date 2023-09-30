import { Footer } from '@/components/Footer/Footer'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import { LandingSection } from '@/components/LandingSection/LandingSection'
import { LinksSection } from '@/components/LinksSection/LinksSections'
import { MailingListSection } from '@/components/MailingListSection/MailingListSection'
import { StepsBar } from '@/components/StepsBar/StepsBar'
import Sheet from '@mui/joy/Sheet'

export default function Home() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <HeaderBar />
      <LandingSection />
      <MailingListSection />
      <StepsBar />
      <LinksSection />
      <Footer />
    </Sheet>
  )
}
