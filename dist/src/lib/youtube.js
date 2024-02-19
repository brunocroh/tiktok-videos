import youtubedl from 'youtube-dl-exec';
import { progressBar } from './progressBar.js';
const POKEMON_VIDEO = 'https://youtu.be/gutR_LNoZw0';
const SNOW_VIDEO = 'https://youtu.be/ADDFmfOeihU';
export async function getVideo({ url, name, folder }) {
    try {
        const promise = youtubedl.exec(url, {
            output: `./videos/${folder}/${name || '%(title)s'}.%(ext)s`,
            format: 'mp4/bestvideo',
        });
        const result = await progressBar(promise);
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveW91dHViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsTUFBTSxhQUFhLEdBQUcsOEJBQThCLENBQUM7QUFDckQsTUFBTSxVQUFVLEdBQUcsOEJBQThCLENBQUM7QUFRbEQsTUFBTSxDQUFDLEtBQUssVUFBVSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBWTtJQUM1RCxJQUFJLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxNQUFNLEVBQUUsWUFBWSxNQUFNLElBQUksSUFBSSxJQUFJLFdBQVcsVUFBVTtZQUMzRCxNQUFNLEVBQUUsZUFBZTtTQUN4QixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUMifQ==