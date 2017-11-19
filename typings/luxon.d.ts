declare module 'luxon' {
  export class Duration {
    static fromMillis(count: number): Duration;
    
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;

    public normalize(): Duration;
    public toFormat(format: string): string;
    public shiftTo(...units: string[]): Duration;
  }
}
