import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { SectionList } from '../SectionList/SectionList'

export function LinksSection() {
  return (
    <Sheet
      sx={{
        width: '100%',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-evenly"
        alignItems={{ xs: 'center', sm: 'stretch' }}
        sx={{ maxWidth: '1024px', margin: 'auto', px: 2 }}
        spacing={2}
      >
        <SectionList
          sectionTitle="Traquealo"
          sectionList={[
            {
              sectionTitle: 'FAQ',
              sectionUrl: '/faq',
            },
            {
              sectionTitle: 'About us',
              sectionUrl: '/about-us',
            },
            { sectionTitle: 'Contacts', sectionUrl: '/contacts' },
          ]}
          arialLabelDescription={
            'Links for getting more information about this web.'
          }
        />
        <SectionList
          sectionTitle="Legal"
          sectionList={[
            {
              sectionTitle: 'Terms',
              sectionUrl: '#',
            },
            { sectionTitle: 'Privacy', sectionUrl: '#' },
          ]}
          arialLabelDescription={'Links for legals information.'}
        />
        <SectionList
          sectionTitle="Social"
          sectionList={[
            {
              sectionTitle: 'Facebook',
              sectionUrl: 'https://www.facebook.com/traquealopr',
            },
            {
              sectionTitle: 'Instagram',
              sectionUrl: 'https://www.instagram.com/traquealo/',
            },
            { sectionTitle: 'X', sectionUrl: 'https://twitter.com/traquealo' },
          ]}
          arialLabelDescription={
            'Links for the different social media outlets.'
          }
        />
      </Stack>
    </Sheet>
  )
}
