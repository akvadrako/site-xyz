
import dayjs from 'dayjs'

export function formatDate(when) {
    if(! when)
        return "unknown date"

    return dayjs(when).format('YYYY-MM-DD')
}
