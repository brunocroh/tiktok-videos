import * as dotenv from 'dotenv';
import prompts from 'prompts';
import { createVideo } from './videos.js';
import { getVideo } from './lib/youtube.js';
import { convertVideoToMp4, getAudioFromVideo, } from './lib/ffmpeg.js';
import createImageText from './lib/canva.js';
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
            {
                title: 'Converter Video para mp4',
                description: 'converter video para mp4',
                value: 'toMp4',
            },
            {
                title: 'Extrair Audio',
                description: 'extrair audio de video',
                value: 'audioExtract',
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
            await createImageText('Elimine as distrações, como redes sociais e notificações do celula', './teste');
            break;
        case 'toMp4':
            await convertVideoToMp4('videos/gengis.MOV');
            break;
        case 'audioExtract':
            await getAudioFromVideo('videos/04.mp4');
            break;
        default:
            break;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sYUFBYSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBQzdCO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxjQUFjO1NBQ3hCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLDRCQUE0QjtTQUN0QztRQUNEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsT0FBTyxFQUFFLFFBQVE7U0FDbEI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFDN0IsSUFBSTtRQUNKLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIscUNBQXFDO1FBQ3JDLEtBQUs7UUFDTDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsMkJBQTJCO1NBQ3JDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDVixNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQztRQUM3QixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsS0FBSyxFQUFFLFNBQVM7YUFDakI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsY0FBYztnQkFDckIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsS0FBSyxFQUFFLGFBQWE7YUFDckI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQUUsT0FBTztnQkFDcEIsS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNEO2dCQUNFLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLFdBQVcsRUFBRSwwQkFBMEI7Z0JBQ3ZDLEtBQUssRUFBRSxPQUFPO2FBQ2Y7WUFDRDtnQkFDRSxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsS0FBSyxFQUFFLGNBQWM7YUFDdEI7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILFFBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLEtBQUssU0FBUztZQUNaLE1BQU0sYUFBYSxFQUFFLENBQUM7WUFDdEIsTUFBTTtRQUNSLEtBQUssYUFBYTtZQUNoQixNQUFNLGtCQUFrQixFQUFFLENBQUM7WUFDM0IsTUFBTTtRQUNSLEtBQUssT0FBTztZQUNWLE1BQU0sZUFBZSxDQUNuQixvRUFBb0UsRUFDcEUsU0FBUyxDQUNWLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsTUFBTSxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdDLE1BQU07UUFDUixLQUFLLGNBQWM7WUFDakIsTUFBTSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxNQUFNO1FBQ1I7WUFDRSxNQUFNO0lBQ1YsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMifQ==