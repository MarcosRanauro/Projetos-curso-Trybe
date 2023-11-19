class Queue:
    def __init__(self):
        self.items = []

    def __len__(self):
        return len(self.items)

    def enqueue(self, value):
        self.items.append(value)

    def dequeue(self):
        if len(self.items) == 0:
            raise IndexError(
                "A fila está vazia. Não é possível fazer dequeue."
            )
        return self.items.pop(0)

    def search(self, index):
        if index < 0 or index >= len(self.items):
            raise IndexError("Índice Inválido ou Inexistente")
        return self.items[index]
