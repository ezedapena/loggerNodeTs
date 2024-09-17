import { LogDataSource } from "../../datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSource: LogDataSource
    ) { }

    async saveLogs(log: LogEntity): Promise<void> {
        this.logDataSource.saveLogs(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }

}