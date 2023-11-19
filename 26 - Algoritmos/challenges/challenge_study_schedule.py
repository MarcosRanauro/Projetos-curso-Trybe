def study_schedule(permanence_periods, target_time):
    if target_time is None or not all(
        isinstance(start, int) and isinstance(end, int) and start <= end
        for start, end in permanence_periods
    ):
        return None

    count = 0
    for start, end in permanence_periods:
        if start <= target_time <= end:
            count += 1

    return count
