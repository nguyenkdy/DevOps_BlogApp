FROM eclipse-temurin:21-jre
WORKDIR /app

# 1. Tải OpenTelemetry Java Agent trực tiếp vào image
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

# 2. Copy file jar của ứng dụng vào
COPY build/libs/*.jar /app/

# 3. Chạy ứng dụng kèm theo javaagent----
CMD ["sh", "-c", "java -javaagent:/app/opentelemetry-javaagent.jar -jar /app/*.jar"]