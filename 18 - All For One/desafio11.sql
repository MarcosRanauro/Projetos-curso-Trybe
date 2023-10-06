SELECT notes FROM purchase_orders
WHERE SUBSTRING(notes, LENGTH('Purchase generated based on Order: ') + 1, 2) BETWEEN '30' AND '39';
