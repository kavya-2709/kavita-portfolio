import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

/**
 * Dev-only stand-in for `api/drawings.ts`.
 *
 * In production the wall is Vercel Blob behind an edge function. `vite dev`
 * has neither, so without this the wall is permanently unreachable on
 * localhost and the page can only ever be half-tested. This serves the same
 * three routes from a folder on disk, using the same
 * `<epoch-ms>__<id>__<name>.png` pathname encoding, so what you try locally
 * behaves like what ships.
 *
 * `apply: 'serve'` keeps it out of the build: it cannot run in production,
 * and the real function is the only thing that ever answers there.
 */
const DEV_WALL = '.dev-wall'

function devWall() {
  return {
    name: 'dev-wall',
    apply: 'serve' as const,
    configureServer(server: { middlewares: { use: (path: string, fn: unknown) => void } }) {
      if (!existsSync(DEV_WALL)) mkdirSync(DEV_WALL, { recursive: true })

      const send = (res: ServerResponse, status: number, body: unknown) => {
        res.statusCode = status
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(body))
      }

      // Registered before the list route: connect matches a `use` path as a
      // prefix, so `/api/drawings` would otherwise swallow this and answer a
      // PNG request with the JSON index.
      server.middlewares.use('/api/drawings/file', (req: IncomingMessage, res: ServerResponse) => {
        const f = new URL(req.url ?? '/', 'http://localhost').searchParams.get('f') ?? ''
        if (!f || f.includes('/') || f.includes('..')) {
          res.statusCode = 400
          return res.end()
        }
        const path = join(DEV_WALL, f)
        if (!existsSync(path)) {
          res.statusCode = 404
          return res.end()
        }
        res.setHeader('content-type', 'image/png')
        res.end(readFileSync(path))
      })

      server.middlewares.use('/api/drawings', (req: IncomingMessage, res: ServerResponse) => {
        const url = new URL(req.url ?? '/', 'http://localhost')

        if (req.method === 'GET') {
          const drawings = readdirSync(DEV_WALL)
            .filter((f) => f.endsWith('.png'))
            .map((f) => {
              const [at, , ...rest] = f.replace(/\.png$/, '').split('__')
              return {
                id: `playground/${f}`,
                url: `/api/drawings/file?f=${encodeURIComponent(f)}`,
                name: rest.join('__') || 'Anonymous',
                at: Number(at),
              }
            })
            .sort((a, b) => b.at - a.at)
          return send(res, 200, { drawings })
        }

        if (req.method === 'POST') {
          const chunks: Buffer[] = []
          req.on('data', (c: Buffer) => chunks.push(c))
          req.on('end', () => {
            // Pull the two parts out of the multipart body by hand; adding a
            // parser dependency for a dev stub is not worth it.
            const buf = Buffer.concat(chunks)
            const pngStart = buf.indexOf(Buffer.from([0x89, 0x50, 0x4e, 0x47]))
            const tailBoundary = buf.lastIndexOf(Buffer.from('\r\n------'))
            if (pngStart < 0) return send(res, 400, { error: 'No PNG found.' })
            const png = buf.subarray(pngStart, tailBoundary > pngStart ? tailBoundary : undefined)

            const text = buf.toString('latin1')
            const nameMatch = /name="name"\r\n\r\n([^\r]*)\r\n/.exec(text)
            const name =
              (nameMatch?.[1] ?? '').replace(/[^\p{L}\p{N} '-]/gu, '').trim().slice(0, 24) ||
              'Anonymous'

            const id = Math.random().toString(36).slice(2, 10)
            const file = `${Date.now()}__${id}__${name}.png`
            writeFileSync(join(DEV_WALL, file), png)
            send(res, 201, {
              drawing: {
                id: `playground/${file}`,
                url: `/api/drawings/file?f=${encodeURIComponent(file)}`,
                name,
                at: Number(file.split('__')[0]),
              },
            })
          })
          return
        }

        if (req.method === 'DELETE') {
          const id = url.searchParams.get('id') ?? ''
          const file = id.replace(/^playground\//, '')
          // Same confinement rule as production: never leave the folder.
          if (!file || file.includes('/') || file.includes('..'))
            return send(res, 400, { error: 'Not a wall drawing.' })
          const path = join(DEV_WALL, file)
          if (!existsSync(path)) return send(res, 404, { error: 'Already gone.' })
          unlinkSync(path)
          return send(res, 200, { ok: true })
        }

        send(res, 405, { error: 'Method not allowed.' })
      })

    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devWall()],
})
