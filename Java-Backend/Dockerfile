#FROM ubuntu:latest
FROM amazoncorretto:21.0.2-alpine3.19 as build
LABEL authors="jonathanmui"

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Build all dependencies in preparation to go offline
# Seperate step so dependencies will be cached unless pom.xml file changes
RUN ./mvnw dependency:go-offline -B

COPY src src

# Package the app and skip tests
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM amazoncorretto:21.0.2-alpine3.19

ARG DEPENDENCY=/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.jonathanmui.DXC.Login.Assignment.DxcLoginAssignmentApplication"]