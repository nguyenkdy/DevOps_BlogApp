FROM eclipse-temurin:21-jre
WORKDIR /app

# 1. Tải OpenTelemetry Java Agent
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

# 2. Copy file jar của ứng dụng
COPY build/libs/eureka-server-*.jar app.jar

# 3. Chạy ứng dụng kèm theo javaagent (Lưu ý cờ -javaagent đứng trước -jar)
CMD ["java", "-javaagent:/app/opentelemetry-javaagent.jar", "-jar", "app.jar"]