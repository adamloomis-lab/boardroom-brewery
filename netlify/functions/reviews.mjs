// Live Google reviews via Places Details. Returns rating, count, and recent
// 4-5 star reviews. Key stays server-side. { configured:false } when unset.
const KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE = process.env.BOARDROOM_PLACE_ID
const json = (b, s = 200, cache = false) =>
  new Response(JSON.stringify(b), {
    status: s,
    headers: { 'Content-Type': 'application/json', ...(cache ? { 'Cache-Control': 'public, max-age=3600' } : {}) },
  })

export default async () => {
  if (!KEY || !PLACE) return json({ configured: false })
  try {
    const r = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE}&fields=rating,user_ratings_total,reviews,url&reviews_sort=newest&key=${KEY}`,
    ).then((x) => x.json())
    const d = r.result
    if (!d) return json({ configured: false })
    return json(
      {
        configured: true,
        rating: d.rating ?? null,
        count: d.user_ratings_total ?? 0,
        url: d.url || null,
        reviews: (d.reviews || [])
          .filter((rv) => (rv.rating || 0) >= 4 && (rv.text || '').trim())
          .slice(0, 6)
          .map((rv) => ({
            author: rv.author_name,
            rating: rv.rating,
            text: (rv.text || '').slice(0, 320),
            when: rv.relative_time_description || '',
            photo: rv.profile_photo_url || null,
          })),
      },
      200,
      true,
    )
  } catch {
    return json({ configured: false })
  }
}
