import { format } from 'date-fns'

export const datePattern = (): string => "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"
export const buildTimeStamp = (): string => format(new Date(), datePattern())
