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
        sx={{ maxWidth: '1024px', margin: 'auto', px: 4 }}
        spacing={2}
      >
        <SectionList
          sectionTitle="Links"
          sectionList={[
            {
              sectionTitle: 'FAQ',
              sectionUrl: '#',
            },
            { sectionTitle: 'Help', sectionUrl: '#' },
            { sectionTitle: 'Support', sectionUrl: '#' },
          ]}
          arialLabelDescription={'Links for the different support sections.'}
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
              sectionUrl: '#',
            },
            { sectionTitle: 'Instagram', sectionUrl: '#' },
            { sectionTitle: 'X', sectionUrl: '#' },
          ]}
          arialLabelDescription={
            'Links for the different social media outlets.'
          }
        />
        <SectionList
          sectionTitle="Traquealo"
          sectionList={[
            {
              sectionTitle: 'About us',
              sectionUrl: '#',
            },
            { sectionTitle: 'Contact', sectionUrl: '#' },
          ]}
          arialLabelDescription={
            'Links for getting more information about this web.'
          }
        />
      </Stack>
    </Sheet>
  )
}
