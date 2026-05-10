FROM eclipse-temurin:21-jre
WORKDIR /app

# 1. Tải OpenTelemetry
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

# 2. Copy chính xác file jar và đổi tên thành app.jar
# (Thay user-service-*.jar bằng pattern đúng với tên file của bạn nếu cần)
COPY build/libs/user-service-*.jar app.jar

# 3. Chạy trực tiếp (KHÔNG DÙNG sh -c hay *.jar nữa)
CMD ["java", "-javaagent:/app/opentelemetry-javaagent.jar", "-jar", "app.jar"]