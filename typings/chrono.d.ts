declare module 'chrono-node' {
  export type ParsedResult = {
    index: number;
    text: string;
    ref: Date;
    start: ParsedComponents;
    end: ParsedComponents | null;
    tags: { [tag: string]: boolean };
  };

  export type Component = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

  export type ParsedComponentValues = {
    knownValues: Partial<Record<Component, number>>;
    impliedValues: Partial<Record<Component, number>>;
  };

  export type ParsedComponents = {
    assign(component: Component, value: number): void;
    imply(component: Component, value: number): void;
    get(component: Component): number;
    isCertain(component: Component): boolean;
    date(): Date;
  };

  export function parse(input: string, ref?: Date): ParsedResult[];
  export function parseDate(input: string, ref?: Date): Date;
}
