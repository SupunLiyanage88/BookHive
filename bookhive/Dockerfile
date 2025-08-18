# Use OpenJDK 17 as base image
FROM eclipse-temurin:17-jdk-alpine

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Set working directory
WORKDIR /app

# Copy built jar file into the container
COPY target/bookhive-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
