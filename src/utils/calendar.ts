export function downloadICalFile(event: {
  title: string;
  description: string;
  location: string;
  startDate: string; // 2026-09-10
  startTime: string; // 07:30
  endTime: string;   // 15:30
}) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Beipu Hiking Team//Trail Events//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:beipu-hiking-20260910@beipuhiking.tw',
    'DTSTAMP:20260901T000000Z',
    'DTSTART;TZID=Asia/Taipei:20260910T073000',
    'DTEND;TZID=Asia/Taipei:20260910T153000',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:北埔徒步明日出发提醒',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', '北埔徒步_20260910.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
