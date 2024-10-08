import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-case/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-case/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-case/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/infrastucture/log-implementation.respository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);


const emailService = new EmailService();


export class Server {

  public static start() {

    console.log('Server started...');

    //todo: Mandar email
    // new SendEmailLogs(
    //   emailService, 
    //   fileSystemLogRepository,
    // ).execute(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // )
    // emailService.sendEmailWithFileSystemLogs(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // );



    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute(url);
        // new CheckService().execute( 'http://localhost:3000' );

      }
    );


  }


}

