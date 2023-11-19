import csv
from src.models.dish import Dish
from src.models.ingredient import Ingredient


class MenuData:
    def __init__(self, source_path: str) -> None:
        self.dishes = set()  # Inicialize o conjunto de pratos vazio
        # Chame o método para carregar os dados do menu
        self.load_menu_data(source_path)

    def load_menu_data(self, source_path: str) -> None:
        with open(source_path, 'r') as file:
            reader = csv.DictReader(file)
            menu_data = {}

            for row in reader:
                dish_name = row['dish']
                ingredient_name = row['ingredient']
                recipe_amount = int(row['recipe_amount'])
                price = float(row['price'])

                if dish_name not in menu_data:
                    # Se o prato ainda não existe no dicionário,
                    # crie um novo Dish
                    dish = Dish(dish_name, price)
                    menu_data[dish_name] = dish
                    self.dishes.add(dish)
                else:
                    dish = menu_data[dish_name]

                # Crie um novo ingrediente e adicione à receita do prato
                ingredient = Ingredient(ingredient_name)
                dish.add_ingredient_dependency(ingredient, recipe_amount)
