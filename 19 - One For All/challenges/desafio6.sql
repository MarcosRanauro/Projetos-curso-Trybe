SELECT
    ROUND(MIN(P.plan_value), 2) AS faturamento_minimo,
    ROUND(MAX(P.plan_value), 2) AS faturamento_maximo,
    ROUND(AVG(P.plan_value), 2) AS faturamento_medio,
    ROUND(SUM(P.plan_value), 2) AS faturamento_total
FROM
    SpotifyClone.users U
INNER JOIN
    SpotifyClone.plans P ON P.plan_id = U.plan_id;
