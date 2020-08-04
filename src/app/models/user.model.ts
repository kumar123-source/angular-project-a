export interface User {
    id?: number;
    real_name?: string;
    tz?: string;
    activeUser?: ActiveUser;
}

export interface ActiveUser {
    start_time?: Date;
    end_time?: Date;
}