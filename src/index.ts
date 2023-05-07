import * as dotenv from 'dotenv'
import prompts from 'prompts'
import { getPrompt } from './chatgtp'
import { createAudio } from './text-to-speech'
import { getVideo } from './youtube'

dotenv.config()

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
      initial: 'nature'
    },
  ])

  const x = await getVideo(response)
  console.log(x)
}

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
  ])

  const prompt = await getPrompt(response.theme)

  createAudio(prompt.title)

  return null

}

(async () => {
  const response = await prompts({
    type: 'select',
    name: 'option',
    message: 'O que você gostaria de fazer?',
    choices: [
      { title: 'Youtube', description: 'Baixar um novo video do youtube', value: 'youtube' },
      { title: 'Criar Videos', description: 'Criar novos videos', value: 'createVideo' },
    ]
  })

  switch (response.option) {
    case 'youtube':
      await youtubePrompt()
      break;
    case 'createVideo':
      await createVideosPrompt()
      break;
    default:
      break;
  }
  
})()
