import pytest
from src.models.ingredient import Ingredient, Restriction


# Req 1 - Teste para a classe Ingredient
@pytest.mark.xfail
def test_ingredient():
    # Cria um ingrediente "farinha"
    ingredient1 = Ingredient("farinha")

    # Verifica as restrições do ingrediente
    expected_restrictions = {Restriction.GLUTEN}
    assert ingredient1.restrictions == expected_restrictions

    # Verifica o método __repr__ do ingrediente
    expected_repr = "Ingredient('farinha')"
    assert repr(ingredient1) == expected_repr

    # Cria um segundo ingrediente "farinha" para testar a igualdade
    ingredient2 = Ingredient("farinha")

    # Cria um terceiro ingrediente "presunto" para testar a desigualdade
    ingredient3 = Ingredient("presunto")

    # Verifica a igualdade entre ingredient1 e ingredient2
    assert ingredient1 == ingredient2

    # Verifica a desigualdade entre ingredient1 e ingredient3
    assert ingredient1 != ingredient3

    # Verifica se os hashes de ingredient1 e ingredient2 são iguais
    assert hash(ingredient1) == hash(ingredient2)

    # Verifica se os hashes de ingredient1 e ingredient3 são diferentes
    assert hash(ingredient1) != hash(ingredient3)
