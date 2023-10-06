SELECT
    A.artist_name AS artista,
    AB.album_name AS album
FROM
    SpotifyClone.artists A
INNER JOIN
    SpotifyClone.albums AB ON A.artist_id = AB.artist_id
WHERE
    A.artist_name = 'Elis Regina'
ORDER BY
    album;
