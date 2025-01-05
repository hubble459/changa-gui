import { abs_url } from './abs_url';
import { all } from './all';
import { any } from './any';
import { attribute } from './attribute';
import { cast_date } from './cast_date';
import { cast_date_relative } from './cast_date_relative';
import { cast_float } from './cast_float';
import { cast_int } from './cast_int';
import { each } from './each';
import { first } from './first';
import { join } from './join';
import { select } from './select';
import { split } from './split';
import { text_all } from './text_all';
import { text_own } from './text_own';
import { trim } from './trim';

export const actions = {
    abs_url,
    all,
    any,
    attribute,
    cast_date_relative,
    cast_date,
    cast_float,
    cast_int,
    each,
    first,
    join,
    select,
    split,
    text_all,
    text_own,
    trim,
};
export type Actions = typeof actions;
