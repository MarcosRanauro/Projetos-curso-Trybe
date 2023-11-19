from .file_management import txt_importer
import sys


def process(path_file, instance):
    # Verifica se o arquivo já foi processado anteriormente
    for i in range(len(instance)):
        if instance.search(i)["nome_do_arquivo"] == path_file:
            print(f"Arquivo {path_file} já foi processado. Ignorando.")
            return

    # Importa o conteúdo do arquivo usando a função txt_importer
    file_lines = txt_importer(path_file)

    # Cria um dicionário com os metadados do arquivo
    file_data = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(file_lines),
        "linhas_do_arquivo": file_lines
    }

    # Adiciona o dicionário à fila
    instance.enqueue(file_data)

    # Exibe os dados via stdout
    print(file_data)


def remove(instance):
    if len(instance) == 0:
        print("Não há elementos")
        return

    # Remove o primeiro arquivo processado (o mais antigo na fila)
    removed_file = instance.dequeue()
    print(f"Arquivo {removed_file['nome_do_arquivo']} removido com sucesso")


def file_metadata(instance, position):
    if position < 0 or position >= len(instance):
        sys.stderr.write("Posição inválida\n")
    else:
        data = instance.search(position)
        print(data)
