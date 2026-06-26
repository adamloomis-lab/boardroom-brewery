// SEO build guardrail: fail the build if the prerendered home page ships
// without JSON-LD (i.e. the <!--SEO_HEAD--> placeholder is missing from index.html).
import { readFileSync } from 'node:fs'
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
if (!/application\/ld\+json/i.test(html)) {
  console.error('\n[seo-check] FAIL: dist/index.html has no JSON-LD. Is <!--SEO_HEAD--> present in index.html?\n')
  process.exit(1)
}
console.log('[seo-check] OK: JSON-LD present in dist/index.html')
