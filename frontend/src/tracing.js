import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Gửi trace đến Nginx Proxy (đã cấu hình /v1/traces)
const exporter = new OTLPTraceExporter({
  url: '/v1/traces', 
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'blogapp-frontend',
  }),
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({ contextManager: new ZoneContextManager() });

// Khởi chạy tự động bắt các sự kiện (fetch API, load document...)
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