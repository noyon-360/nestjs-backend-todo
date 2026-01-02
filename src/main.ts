import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  try {
    await app.listen(process.env.PORT ?? 3000);

    console.log(
      `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  } catch (error) {
    console.error('❌ Application failed to start:', error);
  }
}
bootstrap();
