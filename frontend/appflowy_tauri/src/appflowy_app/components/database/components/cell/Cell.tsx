import { FC } from 'react';
import { FieldType } from '@/services/backend';

import { Cell as CellType, Field } from '../../application';
import { useCell } from './Cell.hooks';
import { TextCell } from './TextCell';
import { SelectCell } from './SelectCell';
import { CheckboxCell } from './CheckboxCell';
import NumberCell from '$app/components/database/components/cell/NumberCell';
import URLCell from '$app/components/database/components/cell/URLCell';
import ChecklistCell from '$app/components/database/components/cell/ChecklistCell';
import DateTimeCell from '$app/components/database/components/cell/DateTimeCell';
import TimestampCell from '$app/components/database/components/cell/TimestampCell';

export interface CellProps {
  rowId: string;
  field: Field;
  documentId?: string;
  icon?: string;
  placeholder?: string;
}

interface CellComponentProps {
  field: Field;
  cell: CellType;
}
const getCellComponent = (fieldType: FieldType) => {
  switch (fieldType) {
    case FieldType.RichText:
      return TextCell as FC<CellComponentProps>;
    case FieldType.SingleSelect:
    case FieldType.MultiSelect:
      return SelectCell as FC<CellComponentProps>;
    case FieldType.Checkbox:
      return CheckboxCell as FC<CellComponentProps>;
    case FieldType.Checklist:
      return ChecklistCell as FC<CellComponentProps>;
    case FieldType.Number:
      return NumberCell as FC<CellComponentProps>;
    case FieldType.URL:
      return URLCell as FC<CellComponentProps>;
    case FieldType.DateTime:
      return DateTimeCell as FC<CellComponentProps>;
    case FieldType.LastEditedTime:
    case FieldType.CreatedTime:
      return TimestampCell as FC<CellComponentProps>;
    default:
      return null;
  }
};

export const Cell: FC<CellProps> = ({ rowId, field, ...props }) => {
  const cell = useCell(rowId, field);

  const Component = getCellComponent(field.type);

  if (!cell) {
    return <div className={`h-[36px] w-[${field.width}px]`} />;
  }

  if (!Component) {
    return null;
  }

  return <Component {...props} field={field} cell={cell} />;
};
