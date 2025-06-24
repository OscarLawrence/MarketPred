

export const useTimeZone = () => {
    const timezone = useState('tz', () => localStorage.getItem('tz'))

    const set_timezone = (tz: string) => {
        timezone.value = tz
        localStorage.setItem('tz', tz)
        return tz
    }
    const set_local_tz = () => {
        return set_timezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    }

    if (!timezone.value) {
        set_local_tz()
    }


    return { timezone, set_timezone, set_local_tz, }

}