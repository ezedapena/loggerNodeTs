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
        const parseableJson = json.length ? json : '{}';
    
        return this.createLog(JSON.parse(parseableJson));
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        return this.createLog({ level, message, createdAt, origin });
    }

    private static createLog = (options: LogEntityOptions): LogEntity => {
        const { message, level, origin, createdAt = new Date() } = options;

        if (!Object.values(LogSeverityLevel).includes(level)) {
            throw new Error(`Invalid level: ${level}. Must be one of ${Object.values(LogSeverityLevel).join(', ')}`);
        }

        const parsedDate = new Date(createdAt);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date: ${createdAt}. Must be a valid date.`);
        }

        return new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });
    }
}
