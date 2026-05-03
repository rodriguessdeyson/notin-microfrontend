import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusSummaryComponent } from './status-summary.component';

@Component({
  selector: 'app-status-summary-preview',
  imports: [StatusSummaryComponent],
  template: `
    <section class="space-y-6 gap-2">
      <article class="surface-card bg-slate-950/90 border border-white/10 mb-5">
        <p class="section-kicker text-cyan-300">Visualizacao do Fragmento</p>
        <h2 class="mt-3 text-3xl font-semibold text-white">
          Visualizacao isolada do componente exposto
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          O componente abaixo é exatamente o fragmento exposto ao shell como
          <code class="rounded bg-slate-800 px-2 py-1 text-slate-100">./StatusSummaryComponent</code>.
        </p>
      </article>

      <app-status-summary/>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSummaryPreviewComponent {}
