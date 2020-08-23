select u.username, m.nickname, g.nickname, w.word, wr.number
from words_right as wr
inner join words_word as w on (wr.word_id = w.id)
inner join gameplace_gamer as g on (wr.gamer_id = g.id)
inner join gameplace_master as m on (g.master_id = m.id)
inner join auth_user as u on (wr.user_id = u.id)
