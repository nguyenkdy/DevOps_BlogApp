import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// Đóng gói toàn bộ logic vào một hàm
export const initTracing = () => {
  try {
    const exporter = new OTLPTraceExporter({
      url: '/v1/traces', 
    });

    const provider = new WebTracerProvider({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'blogapp-frontend',
      }),
    });

    provider.addSpanProcessor(new BatchSpanProcessor(exporter));
    
    provider.register({ 
      contextManager: new ZoneContextManager() 
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
    // Nếu OTel bị lỗi, chỉ in ra console, KHÔNG làm sập app React
    console.error('❌ Failed to initialize OpenTelemetry:', error);
  }
};