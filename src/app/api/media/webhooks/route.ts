import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import crypto from 'crypto'

type MediaProperties = {
  id: string
  mime: string
  type: string
  url: string
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

export async function POST(req: Request) {
  const fields = await req.formData()

  if (!checkSignature(fields, process.env.TRANSLOADIT_AUTH_SECRET)) {
    return new Response(
      `Error while checking signatures, No match so payload was tampered with, or an invalid Auth Secret was used`,
      { status: 403 },
    )
  }

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
    console.log(urlsArray)
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

  return new Response('', { status: 200 })
}

function checkSignature(fields: any, authSecret: any) {
  const receivedSignature = fields.get('signature')
  const payload = fields.get('transloadit')

  // If the signature contains a colon, we expect it to be of format `algo:actual_signature`.
  // If there are no colons, we assume it's a legacy signature using SHA-1.
  const algoSeparatorIndex = receivedSignature.indexOf(':')
  const algo =
    algoSeparatorIndex === -1
      ? 'sha1'
      : receivedSignature.slice(0, algoSeparatorIndex)

  try {
    const calculatedSignature = crypto
      .createHmac(algo, authSecret)
      .update(Buffer.from(payload, 'utf-8'))
      .digest('hex')

    // If we are in legacy signature mode, algoSeparatorIndex is -1 and we are
    // comparing the whole string. Otherwise we slice out the prefixed algo.
    return (
      calculatedSignature === receivedSignature.slice(algoSeparatorIndex + 1)
    )
  } catch {
    // We can assume the signature string was ill-formed.
    return false
  }
}

function extractUrls(payload: any) {
  const result: {
    op: 'add' | 'replace' | 'remove' | 'set' | 'incr'
    path: string
    value: string
  }[] = []

  Object.keys(payload).forEach((key) => {
    payload[key].forEach((item: { url: any }) => {
      if (item.url) {
        result.push({ op: 'add', path: `/media/${key}/-`, value: item.url })
      }
    })
  })

  return result
}
