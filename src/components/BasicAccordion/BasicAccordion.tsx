import Accordion from '@mui/joy/Accordion'
import AccordionDetails from '@mui/joy/AccordionDetails'
import AccordionGroup from '@mui/joy/AccordionGroup'
import AccordionSummary from '@mui/joy/AccordionSummary'
import { ReactNode } from 'react'

type ComponentProps = {
  questions: Array<{
    title: string
    summary: ReactNode
  }>
}

export default function BasicAccordion({ questions }: ComponentProps) {
  return (
    <AccordionGroup>
      {questions.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary>{item.title}</AccordionSummary>
          <AccordionDetails>{item.summary}</AccordionDetails>
        </Accordion>
      ))}
    </AccordionGroup>
  )
}
