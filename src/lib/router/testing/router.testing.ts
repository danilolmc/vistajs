import { render } from '@/lib/dom/render.ts';
import {
  IRouter,
  Routes,
  RouteTestingDependencies,
} from '@/lib/router/types.ts';
import { Router } from '@/lib/router/core/router.ts';
import { routerEventTriggers } from '@/lib/router/core/events/router-events.ts';
import { ActivatedRouteSnapshotApi } from '@/lib/router/api/snapshot.ts';
import { HistoryAPIAdapter } from '@/lib/router/core/adapters/history.adapter.ts';
import { HandlersFacade } from '@/lib/router/core/handlers/handlers.facade.ts';
import { RouteGuard } from '@/lib/router/core/guards/guard.ts';

export function routeTesting(
  routes: Routes,
  dependencies?: RouteTestingDependencies,
): IRouter {
  const container = document.createElement('div');

  render(document.body, container);

  const hasRoutesDef = Boolean(routes?.length);
  if (!hasRoutesDef) return null;

  const router = new Router(
    routes,
    dependencies?.container || container,
    dependencies?.routerEventTriggers || routerEventTriggers,
    dependencies?.activatedRouteSnapshotApi ||
      ActivatedRouteSnapshotApi.getInstance(),
    dependencies?.historyApiAdapter || new HistoryAPIAdapter(),
    dependencies?.handlersFacade || new HandlersFacade(),
    dependencies?.routeGuard || new RouteGuard(),
  );

  router.init();

  return router;
}