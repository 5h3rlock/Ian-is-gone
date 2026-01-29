const TIME_ZONE = "Europe/Dublin";
// To change timezone, replace with another IANA name, e.g. "America/New_York".

const TARGET_MONTH = 2;
const TARGET_DAY = 4;
const TARGET_HOUR = 20;
const TARGET_MINUTE = 0;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const messageEl = document.getElementById("message");

function getZonedParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const map = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

function getOffsetMs(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const tzName =
    parts.find((part) => part.type === "timeZoneName")?.value || "GMT";

  if (tzName === "GMT" || tzName === "UTC") {
    return 0;
  }

  const match = tzName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  if (!match) {
    return 0;
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);

  return sign * (hours * 60 + minutes) * 60 * 1000;
}

function zonedTimeToUtc(parts, timeZone) {
  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second || 0
  );

  let offset = getOffsetMs(timeZone, new Date(utcGuess));
  let utcTime = utcGuess - offset;
  const recalculatedOffset = getOffsetMs(timeZone, new Date(utcTime));

  if (recalculatedOffset !== offset) {
    utcTime = utcGuess - recalculatedOffset;
  }

  return new Date(utcTime);
}

function getTargetDate() {
  const nowParts = getZonedParts(new Date(), TIME_ZONE);

  return zonedTimeToUtc(
    {
      year: nowParts.year,
      month: TARGET_MONTH,
      day: TARGET_DAY,
      hour: TARGET_HOUR,
      minute: TARGET_MINUTE,
      second: 0,
    },
    TIME_ZONE
  );
}

const targetDate = getTargetDate();

function updateCountdown() {
  const now = new Date();
  const diffMs = targetDate - now;

  if (diffMs <= 0) {
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    messageEl.textContent = "It's 8:00 PM — time's up.";
    return;
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  messageEl.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);
