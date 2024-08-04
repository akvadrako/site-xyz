
import dayjs from 'dayjs'

export function formatDate(when) {
    if(! when) {
        console.warn('unknown date', when)
        return "unknown date"
    }

    return dayjs(when).format('YYYY-MM-DD')
}
