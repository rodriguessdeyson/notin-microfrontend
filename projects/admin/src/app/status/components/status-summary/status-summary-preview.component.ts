import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusSummaryComponent } from './status-summary.component';

@Component({
  selector: 'app-status-summary-preview',
  imports: [StatusSummaryComponent],
  template: `
    <section class="space-y-6">
      <article class="surface-card bg-white/90">
        <p class="section-kicker text-rose-500">Visualizacao do Fragmento</p>
        <h2 class="mt-3 text-3xl font-semibold text-slate-950">
          Visualizacao isolada do componente exposto
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          O componente abaixo e exatamente o fragmento exposto ao shell como
          <code class="rounded bg-slate-100 px-2 py-1">./StatusSummaryComponent</code>.
        </p>
      </article>

      <app-status-summary />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSummaryPreviewComponent {}
