/**
 * パフォーマンス監視とアナリティクスユーティリティ
 */

import { reportWebVitalsMetric, type WebVitalsMetric } from './performance';

/**
 * Web Vitalsメトリクスをレポートする（後方互換性のため）
 * web-vitals v4+の型定義に対応
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
  entries: PerformanceEntry[];
}) {
  // 新しいパフォーマンス監視システムに委譲
  reportWebVitalsMetric({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  } as WebVitalsMetric);
}

