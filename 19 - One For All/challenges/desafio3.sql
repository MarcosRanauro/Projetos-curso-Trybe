SELECT U.user_name AS 'pessoa_usuaria', COUNT(*) AS 'musicas_ouvidas', ROUND(SUM(M.song_duration)/60, 2) AS 'total_minutos'
FROM 
    SpotifyClone.users AS U
    INNER JOIN SpotifyClone.history AS H ON U.user_id = H.user_id
    INNER JOIN SpotifyClone.songs AS M ON H.song_id = M.song_id
GROUP BY U.user_name
ORDER BY U.user_name;
