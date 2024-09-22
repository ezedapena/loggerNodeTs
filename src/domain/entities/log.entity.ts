
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}


export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {

        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
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

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }
}