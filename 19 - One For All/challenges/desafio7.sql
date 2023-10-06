SELECT
    A.artist_name AS artista,
    AB.album_name AS album,
    COUNT(F.user_id) AS pessoas_seguidoras
FROM
    SpotifyClone.artists A
INNER JOIN
    SpotifyClone.albums AB ON A.artist_id = AB.artist_id
LEFT JOIN
    SpotifyClone.followers F ON A.artist_id = F.artist_id
GROUP BY
    A.artist_name, AB.album_name
ORDER BY
    pessoas_seguidoras DESC, artista, album;
