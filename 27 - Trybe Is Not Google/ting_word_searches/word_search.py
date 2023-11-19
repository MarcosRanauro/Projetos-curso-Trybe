def exists_word(word, instance):
    results = []

    for i in range(len(instance)):
        file = instance.search(i)
        lines = file.get("linhas_do_arquivo", [])

        occurrences = []

        for line_number, line in enumerate(lines, start=1):
            if word.lower() in line.lower():
                occurrences.append({"linha": line_number})

        if occurrences:
            results.append({
                "palavra": word,
                "arquivo": file.get("nome_do_arquivo", ""),
                "ocorrencias": occurrences,
            })

    return results


def search_by_word(word, instance):
    results = []

    for i in range(len(instance)):
        file = instance.search(i)
        lines = file.get("linhas_do_arquivo", [])

        occurrences = []

        for line_number, line in enumerate(lines, start=1):
            if word.lower() in line.lower():
                occurrences.append({"linha": line_number, "conteudo": line})

        if occurrences:
            results.append({
                "palavra": word,
                "arquivo": file.get("nome_do_arquivo", ""),
                "ocorrencias": occurrences,
            })

    return results
