import { format } from 'date-fns';

export function getTime(dateString: string) {
    const date = new Date(dateString);
    return format(date, 'hh:mm')
}