FROM eclipse-temurin:21-jre
WORKDIR /app

# SỬA LỖI: Thêm dấu / ở cuối để báo cho Docker biết /app/ là một thư mục
COPY build/libs/*.jar /app/

# Dùng sh -c để shell tự động tìm và chạy file .jar hiện có trong thư mục
CMD ["sh", "-c", "java -jar /app/*.jar"]
