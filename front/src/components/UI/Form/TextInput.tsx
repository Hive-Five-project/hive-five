import { ChangeEvent, HTMLInputTypeAttribute, useId, useMemo } from 'react';
import { FormErrors, FormUtils } from '@app/components/UI/Form';
import { Label } from '@app/components/UI/Form/Label';
import FormControl from '@app/components/UI/Form/FormControl.tsx';
import InputWrap from '@app/components/UI/Form/InputWrap.tsx';

type ValueTypes = string|number|Date;

interface Props<ValueType extends ValueTypes = string> {
  // Input
  id: string
  type?: HTMLInputTypeAttribute
  label: string
  /**
   * Icon classname. If undefined, will attempt to guess from field type.
   * Use null to force no icon.
   */
  icon?: string | null
  required?: boolean
  disabled?: boolean
  hint?: string

  /**
   * Provide a list of options (as [key, value]) for the input.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
   */
  dataList?: readonly [string, Exclude<ValueType, Date>][] | null

  // props overrides
  LabelProps?: JSX.IntrinsicElements['label']
  InputProps?: JSX.IntrinsicElements['input']

  // Value
  value?: ValueType | null
  onChangedValue?: (value: ValueType | null, e: ChangeEvent<HTMLInputElement>) => void
  /** @default true */
  normalizeEmptyStringToNull?: boolean

  // Errors
  errors?: FormErrors
}

function normalizedValue(value: ValueTypes | null) {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }

  return value ?? '';
}

export default function TextInput<ValueType extends ValueTypes = string>({
  id,
  type = 'text',
  label,
  icon,
  required = false,
  disabled = false,
  hint,
  dataList = null,
  value = null,
  onChangedValue,
  errors = [],
  normalizeEmptyStringToNull = true,
  InputProps = {},
  LabelProps = {},
}: Props<ValueType>) {
  const datalistId = useId();

  const iconClassName = useMemo(() => {
    if (icon) {
      // Explicit icon passed, use it:
      return icon;
    }

    if (icon === null) {
      // Explicit null passed, don't show any icon
      return null;
    }

    // Case for undefined, auto-guess icons:
    if (type === 'url') {
      // Auto icon for url inputs
      return 'icon-link';
    }

    // Nothing to do, will be ignored:
    return icon;
  }, [icon, type]);

  const hasError = FormUtils.hasError(errors);

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    if (!onChangedValue) {
      return;
    }

    let normalizedValue: (ValueTypes | null) = event.target.value;

    if (normalizeEmptyStringToNull && '' === normalizedValue) {
      normalizedValue = null;
    }

    if (normalizedValue !== null && ['date', 'datetime-local'].includes(type) ) {
      normalizedValue = event.target.valueAsDate;
    }

    if (normalizedValue !== null && type === 'number') {
      normalizedValue = parseInt(normalizedValue as string, 10);
    }

    return onChangedValue(normalizedValue as ValueType | null, event);
  }

  const uniqueDataList = useMemo(() => {
    const uniqueValues = new Set<ValueType>();

    return dataList?.reduce((uniqueList, [key, value]) => {
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueList.push(
          <option key={key} value={value} />,
        );
      }
      return uniqueList;
    }, [] as React.ReactNode[]);
  }, [dataList]);

  return <FormControl type="input" hasError={hasError} disabled={disabled}>
    <Label required={required} htmlFor={id} label={label} hint={hint} {...LabelProps} />

    <InputWrap iconClassName={iconClassName}>
      <input
        id={id}
        type={type}
        required={required}
        value={normalizedValue(value)}
        onChange={onChange}
        list={dataList ? datalistId : undefined}
        {...InputProps}
        disabled={disabled}
      />
    </InputWrap>

    {dataList && <datalist id={datalistId}>
      {uniqueDataList}
    </datalist>}
  </FormControl>;
}
