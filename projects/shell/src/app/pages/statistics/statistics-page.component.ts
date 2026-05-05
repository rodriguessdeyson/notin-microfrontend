import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-statistics-page',
  imports: [NgComponentOutlet, RouterLink],
  templateUrl: './statistics-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent {
  readonly fragmentComponent = signal<Type<unknown> | null>(null);
  readonly state = signal<'loading' | 'ready' | 'error'>('loading');

  constructor() {
    void this.loadFragment();
  }

  private async loadFragment(): Promise<void> {
    try {
      const remoteModule = await loadRemoteModule('admin', './StatusSummaryComponent');
      this.fragmentComponent.set(remoteModule.StatusSummaryComponent);
      this.state.set('ready');
    } catch (error) {
      console.error('Failed to load status summary fragment', error);
      this.state.set('error');
    }
  }
}
