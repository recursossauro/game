select u.username, g.nickname, w.word, number
from words_right as r
inner join words_word as w on (r.word_id = w.id)
INNER JOIN auth_user as u on (r.user_id = u.id)
inner join gameplace_gamer as g on (r.gamer_id = g.id)
