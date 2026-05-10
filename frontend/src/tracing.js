import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';

// --- ĐÂY LÀ PHẦN CODE MỚI ---
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url: '/v1/traces', 
});

// Khởi tạo Resource bằng hàm resourceFromAttributes thay vì class new Resource
const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'blogapp-frontend',
  }),
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({ contextManager: new ZoneContextManager() });

// Tự động bắt các sự kiện (fetch API, load document...)
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        // Cho phép truyền TraceID Header khi gọi API (CORS)
        propagateTraceHeaderCorsUrls: [/.+/g], 
      },
    }),
  ],
});

console.log('OpenTelemetry Web Tracing Initialized');