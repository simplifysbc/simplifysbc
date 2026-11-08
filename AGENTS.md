# Architecture rules

- Store consultant past projects and optional case study links in the existing consultants.projects JSON field; shared validation preserves older title/result entries and prevents unsafe links.
- Reserve Scheduled/Booked slots using consultant UUIDs and a database unique index; the public availability function exposes only occupied consultant IDs and times, so concurrent bookings cannot bypass protection or expose lead details.