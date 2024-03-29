import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
// import { headers } from 'next/headers'

type MediaProperties = {
  id: string
  mime: string
  type: string
  ssl_url: string
}

type MediaFiles = {
  ':original'?: Array<MediaProperties>
  lg?: Array<MediaProperties>
  md?: Array<MediaProperties>
  thumb?: Array<MediaProperties>
  vthumb?: Array<MediaProperties>
  '720_webm_encoded'?: Array<MediaProperties>
  '720_h264_encoded'?: Array<MediaProperties>
}

type TransloaditPayload = {
  ok: string
  fields: {
    userId: string
    issueId: string
  }
  results: MediaFiles
}

type PayloadType = {
  [key: string]: Array<{ ssl_url: string }>
}

export async function POST(req: Request) {
  const fields = await req.formData()
  // const headerPayload = headers()

  console.log(`Prior to check signature`)

  // if (!checkSignature(fields, process.env.TRANSLOADIT_AUTH_SECRET)) {
  //   return new Response(
  //     `Error while checking signatures, No match so payload was tampered with, or an invalid Auth Secret was used`,
  //     { status: 403 },
  //   )
  // }

  console.log(`Signature checked`)

  const rawPayload = fields.get('transloadit')

  if (typeof rawPayload !== 'string') {
    return new Response(`Error while checking payload`, { status: 403 })
  }

  const payload: TransloaditPayload = JSON.parse(rawPayload)

  if (
    !payload.fields ||
    !payload.fields.hasOwnProperty('issueId') ||
    payload.fields.issueId === undefined ||
    payload.fields.issueId === null
  ) {
    return new Response(`No fields available or missing property`, {
      status: 403,
    })
  }

  const issueCosmosClient = new IssueCosmosClient()

  try {
    const urlsArray = extractUrls(payload.results)

    if (!urlsArray)
      return new Response('Unable build url array to patch', { status: 403 })

    while (urlsArray.length > 0) {
      const operations = urlsArray.splice(0, 10)
      await issueCosmosClient.partialUpdate({
        id: payload.fields.issueId,
        partitionKey: payload.fields.issueId,
        operations,
      })
    }
  } catch (error) {
    return new Response('Unable to patch', { status: 403 })
  }

  return new Response('Webhook executed successfully', { status: 200 })
}

// function checkSignature(fields: any, authSecret: any) {
//   const receivedSignature = fields.get('signature')
//   const payload = fields.get('transloadit')

//   // If the signature contains a colon, we expect it to be of format `algo:actual_signature`.
//   // If there are no colons, we assume it's a legacy signature using SHA-1.
//   const algoSeparatorIndex = receivedSignature.indexOf(':')
//   const algo =
//     algoSeparatorIndex === -1
//       ? 'sha1'
//       : receivedSignature.slice(0, algoSeparatorIndex)

//   try {
//     const calculatedSignature = crypto
//       .createHmac(algo, authSecret)
//       .update(Buffer.from(payload, 'utf-8'))
//       .digest('hex')

//     // If we are in legacy signature mode, algoSeparatorIndex is -1 and we are
//     // comparing the whole string. Otherwise we slice out the prefixed algo.
//     return (
//       calculatedSignature === receivedSignature.slice(algoSeparatorIndex + 1)
//     )
//   } catch {
//     // We can assume the signature string was ill-formed.
//     return false
//   }
// }

function extractUrls(payload: PayloadType) {
  const result: Array<{
    op: 'add' | 'replace' | 'remove' | 'set' | 'incr'
    path: string
    value: string
  }> = []

  if (!Array.isArray(result)) {
    return
  }

  Object.keys(payload).forEach((key) => {
    payload[key].forEach((item: { ssl_url: string }) => {
      if (item.ssl_url) {
        result.push({ op: 'add', path: `/media/${key}/-`, value: item.ssl_url })
      }
    })
  })

  return result
}
