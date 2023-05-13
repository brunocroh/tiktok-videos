import * as dotenv from 'dotenv';
import prompts from 'prompts';
import { createVideo } from './videos';
import { getVideo } from './lib/youtube';
import { createVideo as ffCreateVideo } from './lib/ffmpeg';
import createImageText from './lib/canva';

dotenv.config();

const youtubePrompt = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'url',
      message: 'URL do video',
    },
    {
      type: 'text',
      name: 'name',
      message: 'Nome do arquivo (Opcional)',
    },
    {
      type: 'text',
      name: 'folder',
      message: 'Pasta para salvar o video',
      initial: 'nature',
    },
  ]);

  const x = await getVideo(response);
  console.log(x);
};

const createVideosPrompt = async () => {
  const response = await prompts([
    // {
    //   type: 'number',
    //   name: 'quantity',
    //   message: 'Quantidade de videos',
    // },
    {
      type: 'text',
      name: 'theme',
      message: 'Tema para criar os videos',
    },
  ]);

  const result = await createVideo(response.theme);

  return result;
};

(async () => {
  const response = await prompts({
    type: 'select',
    name: 'option',
    message: 'O que você gostaria de fazer?',
    choices: [
      {
        title: 'Youtube',
        description: 'Baixar um novo video do youtube',
        value: 'youtube',
      },
      {
        title: 'Criar Videos',
        description: 'Criar novos videos',
        value: 'createVideo',
      },
      {
        title: 'debug',
        description: 'Debug',
        value: 'debug',
      },
    ],
  });

  switch (response.option) {
    case 'youtube':
      await youtubePrompt();
      break;
    case 'createVideo':
      await createVideosPrompt();
      break;
    case 'debug':
      await createImageText(
        'Elimine as distrações, como redes sociais e notificações do celula',
        './teste'
      );
      break;
    default:
      break;
  }
})();
