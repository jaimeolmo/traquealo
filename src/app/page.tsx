import { LandingSection } from '@/components/LandingSection/LandingSection'
import { LinksSection } from '@/components/LinksSection/LinksSections'
import { MailingListSection } from '@/components/MailingListSection/MailingListSection'
import { StepsBar } from '@/components/StepsBar/StepsBar'

export default function Home() {
  return (
    <>
      <LandingSection />
      <MailingListSection />
      <StepsBar />
      <LinksSection />
    </>
  )
}
