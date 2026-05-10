import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';

// Dùng API mới của bản @latest thay vì class Resource
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export const initTracing = () => {
  try {
    // 1. Khai báo Service Name bằng resourceFromAttributes
    const provider = new WebTracerProvider({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'blogapp-frontend',
      }),
    });

    // 2. Gắn processor và exporter
    provider.addSpanProcessor(
      new BatchSpanProcessor(new OTLPTraceExporter({ url: '/v1/traces' }))
    );

    // 3. Đăng ký provider
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    // 4. Bắt đầu thu thập dữ liệu tự động
    registerInstrumentations({
      instrumentations: [
        getWebAutoInstrumentations({
          '@opentelemetry/instrumentation-fetch': {
            propagateTraceHeaderCorsUrls: [/.+/g],
          },
        }),
      ],
    });

    console.log('✅ OpenTelemetry Web Tracing Initialized Successfully');
  } catch (error) {
    console.error('❌ Failed to initialize OpenTelemetry:', error);
  }
};