import LinearProgress from '@mui/joy/LinearProgress'
export default function Loading() {
  return (
    <LinearProgress
      thickness={2}
      sx={{
        zIndex: '1',
        width: '100%',
        position: 'absolute',
        color: 'var(--joy-palette-secondary-500)',
      }}
    />
  )
}
