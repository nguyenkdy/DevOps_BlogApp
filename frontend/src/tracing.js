import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';

export const initTracing = () => {
  try {
    // 1. Khởi tạo Exporter và Processor
    const exporter = new OTLPTraceExporter({ url: '/v1/traces' });
    const processor = new BatchSpanProcessor(exporter);

    // 2. NHÚNG TRỰC TIẾP processor vào constructor
    // (Tuyệt đối không dùng hàm provider.addSpanProcessor để tránh lỗi Vite Minify)
    const provider = new WebTracerProvider({
      spanProcessors: [processor],
    });

    // 3. Đăng ký provider
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    // 4. Bắt đầu thu thập dữ liệu
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