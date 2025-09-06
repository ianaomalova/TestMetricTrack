Таблица Х - сведения о показах (uid уникален)
1 строка - 1 показ

Таблица У - сведения о действиях после показа (uid может дублироваться)
tag - тип события

    view through - событие без клика
    click through - событие по клику
    flick - первый клик 

----
    CTR (доля кликов на любой тип события относительно всех показов)
    click_count - чисто событий с tag = 'click' or 'fclick'
    impression_count - общее чисто строк (показов)
    CTR = 100 * (click_count / impression_count)

____

    EvPM (число событий определенного типа на 1000 показов)
    event_count - число событий нужного типа (без учета просмотр или клик)
    impression_count - общее чисто строк (показов)
    EvPM = 1000 * (event_count / impression_count)

____
Итоговая таблица содержит 
uid        tag              date
1          ckick            1.1.1
1          registarion      1.1.1
1          что-то еще       1.1.1
2          click            1.1.1
2          registration     1.1.1
3          click            2.2.2
