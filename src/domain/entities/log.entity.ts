export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    public level: string;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);

        if (!message) throw new Error("LogEntity requires a message");

        if (!Object.values(LogSeverityLevel).includes(level)) {
            throw new Error(`Invalid level: ${level}. Must be one of ${Object.values(LogSeverityLevel).join(', ')}`);
        }

        const parsedDate = new Date(createdAt);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date: ${createdAt}. Must be a valid date.`);
        }

        const log = new LogEntity(message, level);
        log.createdAt = new Date(parsedDate);

        return log;
    }
}