/**
 * パフォーマンス監視とメトリクス収集ユーティリティ
 */

/**
 * Web Vitalsメトリクスの型定義
 */
export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  label: string;
  delta?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

/**
 * パフォーマンス予算の設定
 */
export const PERFORMANCE_BUDGET = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  INP: 200, // Interaction to Next Paint (ms)
} as const;

/**
 * パフォーマンスメトリクスをレポートする
 */
export function reportPerformanceMetric(
  name: string,
  value: number,
  unit: string = 'ms'
) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4（設定されている場合）
  interface WindowWithGtag extends Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
  const windowWithGtag = window as WindowWithGtag;
  if (windowWithGtag.gtag) {
    windowWithGtag.gtag('event', 'performance', {
      metric_name: name,
      metric_value: Math.round(value),
      metric_unit: unit,
    });
  }

  // Vercel Analytics（設定されている場合）
  interface WindowWithVa extends Window {
    va?: (event: string, data?: Record<string, unknown>) => void;
  }
  const windowWithVa = window as WindowWithVa;
  if (windowWithVa.va) {
    windowWithVa.va('performance', {
      name,
      value: Math.round(value),
      unit,
    });
  }

  // 開発環境ではコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${Math.round(value)}${unit}`);
  }
}

/**
 * Web Vitalsメトリクスをレポートする
 */
export function reportWebVitalsMetric(metric: WebVitalsMetric) {
  // パフォーマンス予算との比較
  const budget = PERFORMANCE_BUDGET[metric.name as keyof typeof PERFORMANCE_BUDGET];
  if (budget && metric.value > budget) {
    console.warn(
      `[Performance Budget] ${metric.name} exceeded budget: ${metric.value}ms > ${budget}ms`
    );
  }

  // メトリクスをレポート
  reportPerformanceMetric(metric.name, metric.value, 'ms');

  // Vercel Analytics（本番環境で使用可能な場合）
  if (typeof window !== 'undefined') {
    interface WindowWithVa extends Window {
      va?: (event: string, data?: Record<string, unknown>) => void;
    }
    const windowWithVa = window as WindowWithVa;
    if (windowWithVa.va) {
      windowWithVa.va('web-vitals', metric);
    }
  }

  // Google Analytics 4（設定されている場合）
  if (typeof window !== 'undefined') {
    interface WindowWithGtag extends Window {
      gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    }
    const windowWithGtag = window as WindowWithGtag;
    if (windowWithGtag.gtag) {
      windowWithGtag.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
        rating: metric.rating,
      });
    }
  }

  // 開発環境ではコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    const rating = metric.rating ? ` [${metric.rating}]` : '';
    console.log(
      `[Web Vitals] ${metric.name}: ${Math.round(metric.value)}ms${rating}`
    );
  }
}

/**
 * リソース読み込み時間を測定
 */
export function measureResourceTiming() {
  if (typeof window === 'undefined' || !window.performance) return;

  const resources = window.performance.getEntriesByType(
    'resource'
  ) as PerformanceResourceTiming[];

  resources.forEach((resource) => {
    const duration = resource.responseEnd - resource.startTime;
    
    // 遅いリソースを警告
    if (duration > 1000) {
      console.warn(
        `[Slow Resource] ${resource.name}: ${Math.round(duration)}ms`
      );
    }
  });
}

/**
 * ページ読み込み時間を測定
 */
export function measurePageLoadTime() {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    const navigation = window.performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      reportPerformanceMetric('Page Load Time', loadTime, 'ms');
    }
  });
}

