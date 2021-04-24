import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SetupSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Urban Go')
    .setDescription('Find out best places for you')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
};
