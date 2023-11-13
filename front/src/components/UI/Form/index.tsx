export * as FormUtils from '@app/components/UI/Form/utils';

export type FormErrors = boolean | string | string[];
export type FormErrorsMap<Fields extends string> = Partial<Record<'__root' | Fields, FormErrors|undefined>>;
