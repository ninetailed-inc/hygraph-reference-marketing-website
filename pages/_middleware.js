import { NextResponse } from 'next/server'
import {
  getEdgeSideProfile,
  buildEsrNinetailedRequestContext
} from '@ninetailed/experience.js-next-esr'

const excludedPrefixes = ['/favicon', '/api']

export async function middleware(req) {
  if (
    excludedPrefixes.find((path) => req.nextUrl.pathname?.startsWith(path)) ||
    req.method !== 'GET'
  ) {
    return NextResponse.next()
  }

  console.log(req.cookies);


  const { profile } = await getEdgeSideProfile({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx: buildEsrNinetailedRequestContext({ req }),
    url: process.env.NEXT_PUBLIC_NINETAILED_URL ?? '',
    apiKey: process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? '',
    cookies: req.cookies,
    ip: req.ip,
    location: {
      city: req.geo.city,
      region: req.geo.region,
      country: req.geo.country
    }
  })

  console.log(profile);

  let response = NextResponse.next()

  if (profile.audiences.length) {
    const url = req.nextUrl.clone()
    url.pathname = `/;${profile.audiences.join(',')}${req.nextUrl.href.replace(
      req.nextUrl.origin,
      ''
    )}`
    response = NextResponse.rewrite(url)
  }

  return response
}
