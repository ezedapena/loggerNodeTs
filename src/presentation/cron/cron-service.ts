import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        const job = new CronJob(
            cronTime, // '* * * * * *'
            onTick,  // onTick function
            null,    // onComplete (optional, can be null)
            true,    // start the job immediately (true)
            'UTC-3' // timeZone
        );
        return job;
    }
}
