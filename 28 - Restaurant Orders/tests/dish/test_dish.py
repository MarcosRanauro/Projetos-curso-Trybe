import pytest
from src.models.dish import Dish
from src.models.ingredient import Ingredient


# Req 2
def test_dish():
    # Criando objetos Dish e Ingredient
    lasanha = Dish("Lasanha", 15.99)
    farinha = Ingredient("farinha")
    queijo = Ingredient("queijo")

    # Verificando se lasanha é uma instância de Dish
    assert isinstance(lasanha, Dish)

    # Verificando se o método __repr__ retorna o valor esperado
    assert repr(lasanha) == "Dish('Lasanha', R$15.99)"

    # Verificando se o atributo 'name' está correto
    assert lasanha.name == "Lasanha"

    # Teste falho para verificar o atributo 'name'
    @pytest.mark.xfail
    def test_name_attribute():
        assert lasanha.name == "Pizza"

    # Verificando se um TypeError é levantado
    # ao criar um prato com um preço inválido
    with pytest.raises(TypeError):
        Dish("Lasanha", "15.99")

    # Verificando se um ValueError é levantado
    # ao criar um prato com um preço inválido
    with pytest.raises(ValueError):
        Dish("Lasanha", -5.0)

    # Adicionando ingredientes à receita do prato e verificando a quantidade
    lasanha.add_ingredient_dependency(farinha, 3)
    assert lasanha.recipe.get(farinha) == 3
    lasanha.add_ingredient_dependency(queijo, 2)

    # Verificando as restrições do prato
    restrictions = lasanha.get_restrictions()
    assert restrictions == farinha.restrictions.union(queijo.restrictions)

    # Verificando os ingredientes do prato
    ingredients = lasanha.get_ingredients()
    assert ingredients == {farinha, queijo}

    # Criando um prato duplicado e verificando os hashes e a igualdade
    lasanha_duplicate = Dish("Lasanha", 15.99)
    assert hash(lasanha) == hash(lasanha_duplicate)
    assert lasanha == lasanha_duplicate

    # Criando um prato diferente e verificando os hashes
    pizza = Dish("Pizza", 12.99)
    assert hash(lasanha) != hash(pizza)

    # Teste falho para verificar a igualdade entre pratos diferentes
    @pytest.mark.xfail
    def test_equality_false():
        assert lasanha != pizza

    # Verificando se um TypeError é levantado
    # ao criar um prato com um preço inválido
    with pytest.raises(TypeError):
        Dish("Lasanha", "15.99")

    # Verificando se um ValueError é levantado
    # ao criar um prato com um preço inválido
    with pytest.raises(ValueError):
        Dish("Lasanha", -5.0)
