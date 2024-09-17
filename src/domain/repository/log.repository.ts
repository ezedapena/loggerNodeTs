import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLogs(log: LogSeverityLevel): Promise<LogEntity[]>;
}