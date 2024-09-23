import { DefaultCatchBoundary } from '@/components/layout/default-catch-boundary'
import { NotFound } from '@/components/layout/not-found'
import { Spinner } from '@/components/layout/spinner'
import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import SuperJSON from 'superjson'

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30 * 1000 },
      dehydrate: { serializeData: SuperJSON.serialize },
      hydrate: { deserializeData: SuperJSON.deserialize },
    },
  })

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: 'intent',
      defaultPendingComponent: () => <Spinner />,
      defaultNotFoundComponent: () => <NotFound />,
      defaultErrorComponent: DefaultCatchBoundary,
      transformer: SuperJSON,
    }),
    queryClient,
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
