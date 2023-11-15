import { Issue } from '@/models/Issue'
import ReportCosmosClient from '@/utilities/cosmosdb/ReportCosmosClient'
import { auth } from '@clerk/nextjs'
import { notFound } from 'next/navigation'

type Report = {
  id: string
  reportSlug: string
}

async function getReportBySlug(reportSlug: string): Promise<Issue[] | null> {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const reportCosmosClient = new ReportCosmosClient()
  const report = await reportCosmosClient.getByPropertyValue(
    'reportSlug',
    reportSlug,
  )

  return report || null
}

export default async function ReportDetails({
  params,
}: {
  params: { reportSlug: string }
}) {
  const report = await getReportBySlug(params.reportSlug)

  if (!report) return notFound()

  return <h1>Detalles del Reporte {params.reportSlug}</h1>
}
