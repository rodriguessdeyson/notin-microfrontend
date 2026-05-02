import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from '../../../todo/stores/todo.store';

@Component({
  selector: 'app-status-summary',
  template: `
    <section class="surface-card bg-slate-950 text-slate-50">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="section-kicker text-cyan-300">Fragmento do Admin</p>
          <h2 class="mt-3 text-3xl font-semibold text-white">Resumo de Status</h2>
          <p class="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Compartilhado pelo remoto Admin e renderizado tanto dentro do shell quanto em uma rota
            local de previa.
          </p>
        </div>

        <div
          class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
        >
          {{ store.summary().completionRate }}% concluido
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">A Fazer</p>
          <p class="mt-3 text-4xl font-semibold text-white">{{ store.summary().open }}</p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Em Andamento</p>
          <p class="mt-3 text-4xl font-semibold text-white">
            {{ store.summary().inProgress }}
          </p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Alta Prioridade</p>
          <p class="mt-3 text-4xl font-semibold text-white">
            {{ store.summary().highPriority }}
          </p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Atrasadas</p>
          <p class="mt-3 text-4xl font-semibold text-white">{{ store.summary().overdue }}</p>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSummaryComponent {
  protected readonly store = inject(TodoStore);
}
