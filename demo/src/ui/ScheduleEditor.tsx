/**
 * Seven-row weekly schedule editor over a `StoreHours` tuple.
 *
 * Shared by the opening-hours lab and the landing-page showcase — both need
 * exactly this control, and a divergence between them would be a bug.
 */
import { Plus, X } from 'lucide-react';
import { DAY_NAMES, getDayTranslation, type StoreHours } from '@apx-ui/toolkit';
import { cn } from '../lib/cn';
import {
    addPeriod,
    isClosed,
    removePeriod,
    setPeriod,
    toggleDay
} from '../lib/schedule';

interface Props {
    hours: StoreHours;
    onChange: (hours: StoreHours) => void;
    /** Language for the day labels — the formatter's own output follows it too. */
    language: string;
}

export function ScheduleEditor({ hours, onChange, language }: Props) {
    return (
        <div className="divide-y divide-border">
            {DAY_NAMES.map((dayName, dayIndex) => (
                <DayRow
                    key={dayName}
                    label={getDayTranslation(language, dayName, 'long')}
                    hours={hours}
                    dayIndex={dayIndex}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}

interface DayRowProps {
    label: string;
    hours: StoreHours;
    dayIndex: number;
    onChange: (hours: StoreHours) => void;
}

function DayRow({ label, hours, dayIndex, onChange }: DayRowProps) {
    const schedule = hours[dayIndex];
    const closed = isClosed(schedule);

    return (
        <div className="flex flex-wrap items-start gap-2 px-4 py-2.5 sm:flex-nowrap">
            <button
                type="button"
                onClick={() => onChange(toggleDay(hours, dayIndex))}
                title={closed ? 'Open this day' : 'Close this day'}
                className={cn(
                    'w-32 shrink-0 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors',
                    closed
                        ? 'text-muted-foreground hover:bg-muted'
                        : 'bg-success/10 text-foreground hover:bg-success/20'
                )}
            >
                <span className="block truncate">{label}</span>
                <span className="block text-[10px] font-normal text-muted-foreground">
                    {closed
                        ? 'closed'
                        : `${schedule.length} period${schedule.length > 1 ? 's' : ''}`}
                </span>
            </button>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                {closed ? (
                    <span className="font-mono text-[11px] italic text-muted-foreground">
                        {'{ open: false, closed: false }'}
                    </span>
                ) : (
                    schedule.map((period, periodIndex) => (
                        <span
                            key={periodIndex}
                            className="flex items-center gap-1 rounded-md border border-input bg-background px-1.5 py-1"
                        >
                            <input
                                type="time"
                                value={period.open}
                                onChange={(e) =>
                                    onChange(
                                        setPeriod(hours, dayIndex, periodIndex, 'open', e.target.value)
                                    )
                                }
                                className="w-[5.5rem] bg-transparent font-mono text-xs focus:outline-none"
                            />
                            <span className="text-muted-foreground">–</span>
                            <input
                                type="time"
                                value={period.closed}
                                onChange={(e) =>
                                    onChange(
                                        setPeriod(hours, dayIndex, periodIndex, 'closed', e.target.value)
                                    )
                                }
                                className="w-[5.5rem] bg-transparent font-mono text-xs focus:outline-none"
                            />
                            <button
                                type="button"
                                aria-label="Remove period"
                                onClick={() => onChange(removePeriod(hours, dayIndex, periodIndex))}
                                className="flex h-4 w-4 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))
                )}
                <button
                    type="button"
                    onClick={() => onChange(addPeriod(hours, dayIndex))}
                    className="flex h-[26px] items-center gap-1 rounded-md border border-dashed border-input px-2 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                    <Plus className="h-3 w-3" />
                    period
                </button>
            </div>
        </div>
    );
}
