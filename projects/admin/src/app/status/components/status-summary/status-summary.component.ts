import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from '../../../todo/stores/todo.store';

@Component({
  selector: 'app-status-summary',
  template: `
    <section class="surface-card bg-slate-950 text-slate-50">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="section-kicker text-cyan-300">Admin Fragment</p>
          <h2 class="mt-3 text-3xl font-semibold text-white">Status Summary</h2>
          <p class="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Shared by the remote Admin and rendered both within the shell and in a local
            preview route.
          </p>
        </div>

        <div
          class="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200"
        >
          {{ store.summary().completionRate }}% complete
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">To Do</p>
          <p class="mt-3 text-4xl font-semibold text-white">{{ store.summary().open }}</p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">In Progress</p>
          <p class="mt-3 text-4xl font-semibold text-white">
            {{ store.summary().inProgress }}
          </p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">High Priority</p>
          <p class="mt-3 text-4xl font-semibold text-white">
            {{ store.summary().highPriority }}
          </p>
        </article>

        <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Overdue</p>
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
