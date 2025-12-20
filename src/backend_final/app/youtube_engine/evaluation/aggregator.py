def aggregate_scores(scores: list[dict]) -> dict:
    final = {}

    keys = scores[0].keys()
    for key in keys:
        final[key] = round(sum(s[key] for s in scores) / len(scores), 2)

    return final
