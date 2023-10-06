SELECT
    (SELECT COUNT(*) FROM SpotifyClone.songs) AS cancoes,
    (SELECT COUNT(DISTINCT artist_id) FROM SpotifyClone.artists) AS artistas,
    (SELECT COUNT(DISTINCT album_id) FROM SpotifyClone.albums) AS albuns;
