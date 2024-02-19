import cliProgress from 'cli-progress';
import colors from 'ansi-colors';
import stream from 'stream';
async function endDownload(promise) {
    return new Promise((resolve, reject) => {
        promise
            .then(resolve)
            .catch(reject);
    });
}
export async function progressBar(promise) {
    let prevProgressNum = 0;
    const progressBar = new cliProgress.SingleBar({
        format: `Downloading youtube Video | ${colors.bgRed('{bar}')} | {percentage}% | {value}/{total} Chunks`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    }, cliProgress.Presets.shades_classic);
    progressBar.start(100, 0);
    const stdoutStream = new stream.PassThrough();
    promise?.stdout?.pipe(stdoutStream);
    promise?.stdout?.on('data', () => {
        try {
            const output = stdoutStream.read().toString();
            if (output) {
                const match = output.match(/\b(\d{1,2}(?:\.\d{1,2})?)%/);
                const percentage = match ? match[1] : null;
                if (percentage) {
                    const num = Number(percentage);
                    if (Number.isInteger(num) && num > prevProgressNum) {
                        progressBar.update(Math.round(num));
                        prevProgressNum = num;
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    const result = await endDownload(promise);
    progressBar.update(100);
    progressBar.stop();
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Byb2dyZXNzQmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUE7QUFDaEMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRTNCLEtBQUssVUFBVSxXQUFXLENBQUMsT0FBWTtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE9BQU87YUFDSixJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVyxDQUFDLE9BQVk7SUFDNUMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUM1QyxNQUFNLEVBQUUsK0JBQStCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDJDQUEyQztRQUN2RyxlQUFlLEVBQUUsUUFBUTtRQUN6QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLFVBQVUsRUFBRSxJQUFJO0tBRWpCLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2QyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUU5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1FBQy9CLElBQUksQ0FBQztZQUNILE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUM3QyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNYLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDekQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0MsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDYixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7b0JBQzlCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsZUFBZSxFQUFFLENBQUM7d0JBQ25ELFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO3dCQUNuQyxlQUFlLEdBQUcsR0FBRyxDQUFBO29CQUN2QixDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3BCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXpDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkIsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO0lBRWxCLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyJ9