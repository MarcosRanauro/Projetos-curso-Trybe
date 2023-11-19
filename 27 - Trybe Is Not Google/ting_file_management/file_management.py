import sys


def txt_importer(path_file):
    try:
        # Verifica a extensão do arquivo
        if not path_file.endswith('.txt'):
            raise ValueError("Formato inválido")

        # Tenta abrir o arquivo
        with open(path_file, 'r', encoding='utf-8') as file:
            # Lê as linhas do arquivo e retorna como uma lista
            lines = file.read().split('\n')
            return lines
    except FileNotFoundError:
        # Arquivo não encontrado
        sys.stderr.write(f"Arquivo {path_file} não encontrado\n")
        return []
    except ValueError as e:
        # Formato inválido
        sys.stderr.write(str(e) + '\n')
        return []


# Exemplo de uso
path_file = "exemplo.txt"
result = txt_importer(path_file)
if result:
    for line in result:
        print(line)
