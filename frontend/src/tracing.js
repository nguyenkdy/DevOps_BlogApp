import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';

// 1. Dùng hàm chuẩn mới của bản @latest thay vì class Resource
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export const initTracing = () => {
  try {
    const exporter = new OTLPTraceExporter({ url: '/v1/traces' });
    const processor = new BatchSpanProcessor(exporter);

    // 2. Khởi tạo tên Service bằng hàm resourceFromAttributes
    const customResource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'blogapp-frontend',
    });

    // 3. NHÚNG TRỰC TIẾP cả resource và processor vào constructor (An toàn tuyệt đối)
    const provider = new WebTracerProvider({
      resource: customResource,
      spanProcessors: [processor],
    });

    provider.register({
      contextManager: new ZoneContextManager(),
    });

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