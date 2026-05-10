import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
// 1. THÊM IMPORT RESOURCE NÀY
import { Resource } from '@opentelemetry/resources'; 

export const initTracing = () => {
  try {
    const exporter = new OTLPTraceExporter({ url: '/v1/traces' });
    const processor = new BatchSpanProcessor(exporter);

    const provider = new WebTracerProvider({
      // 2. THÊM BLOCK TÊN SERVICE NÀY
      resource: new Resource({
        'service.name': 'blogapp-frontend', 
      }),
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