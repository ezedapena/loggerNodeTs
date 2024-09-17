import { FileSystemDataSource } from '../domain/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../domain/infrastructure/infrastucture/log-implementation.respository';
import { CheckService } from '../domain/use-case/checks/check-service';
import { CronService } from './cron/cron-service';

const fileSystemLogRep = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log( 'Server started...' );

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckService(
          fileSystemLogRep,
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );        
      }
    );
  }
}