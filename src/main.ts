import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Proyecto de Grado App')
    .setDescription(
      'Aplicación móvil correspondiente al proyecto de grado de Luis Corredor y Juan Calderón, estudiantes de la UDI',
    )
    .setVersion('1.0')
    .addTag('ACE APP')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Aumentar el tamaño máximo permitido del body a 10MB, por ejemplo
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
