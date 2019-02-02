---
title: "AMXX - Vytvorenie konzolového príkazu s jedným argumentom"
layout: post
date: 2009-04-03 15:00
tag: [pawn, amxx, plugin]
headerImage: false
star: false
description: "AMXX - Vytvorenie konzolového príkazu s jedným argumentom"
category: blog
author: arzzen
commentIssueId: 24
externalLink: false
---

Jazyk PAWN je embedovací (takmer) beztypový, ľahko použiteľný skriptovací jazyk. 
AMX Mod X používa funkcie pre spúštanie skriptov pre hry odvodené od série Half-Life 
pomocou záložného "virtuálneho stroja" a metamodu (v základe je napísaný v jazyku C, Metamod je napísaný v C ++). 
Skript musí byť kompilovaný za pomoci "kompilátora", ktorý vytvára binárny súbor pre AMX Mod X. 
AMX Mod X distribuuje špeciálne upravený PAWN kompilátor.

Programovanie PAWN skriptov je relatívne jednoduché a nemá koncepty v iných jazykoch, 
ktoré nie sú potrebné pre všeobecné použitie, napríklad ukazovatele, vektory, štruktúry, triedy, alokácie atď.

O praktickom použití som začal písať môj prvý blog s pred takmer [10 rokov](https://arzzen.wordpress.com/2009/04/03/vytvorenie-konzoloveho-prikazu-s-jednym-argumentom/).
Tu je jeho nezmenená verzia:

---

Pre jednoduchú ukážku ako získavať hodnoty s argumentu konzolového príkazu si napíšeme amxx plugin, ktorý bude mat za úlohu vyhodiť hráča so serveru.

celkový zdrojový kód:

```c
#include <amxmodx>

public plugin_init(){
    register_plugin("ConKick","0.1","null")
    register_concmd("con_kick","kick_player",ADMIN_KICK," kicknutie uzivatela")
}
public kick_player(id){
    if(!(get_user_flags(id)&ADMIN_KICK)){
        console_print(id,"[AMXX] Na vykonanie prikazu nemate opravnenie")
        return PLUGIN_HANDLED
    }
    if(read_argc() == 0){
        console_print(id,"[AMXX] Musite zadat ID uzivatela")
        return PLUGIN_HANDLED
    }
    new user[32], uid
    read_argv(1,user,32)
    uid = find_player("bh",user)
    if(uid == 0){
        console_print(id,"[AMXX] Nespravne uzivatelske ID")
        return PLUGIN_HANDLED
    }
    client_cmd(uid,"echo Bol si kicknuty so serveru!")
    client_cmd(uid,"disconnect")
    console_print(id,"Kicknutie hraca!")
    return PLUGIN_HANDLED
}
```

vysvetlenie jednotlivých častí zdrojového kódu:

```c
#include <amxmodx>
```

Prvý riadok zahŕňa súbor nazývaný amxmodx.inc, ktorý obsahuje základné príkazy pre prácu s hráčom, a je používaný skoro pri všetkých pluginoch.

```c
public plugin_init(){
    register_plugin("ConKick","0.1","null")
    register_concmd("con_kick","kick_player",ADMIN_KICK," kicknutie uzivatela")
}
```

Funkcia register_plugin povie hlavné informácie amxx modulu o našom plugine, a to názov, verziu a autora. túto časť zahŕňa drvivá väčšina pluginov od tých malých až po tie najprepracovanejšie čo sa zdrojového kódu týka.

Funkcia register_concmd povie amxx modulu, že sme vytvorili nový príkaz nazvaný “con_kick”, ktorý bude volat funkciu “kick_player” ked klient použije tento príkaz v konzoli. Je tu tiež použitý základná konštanta pre zistenie prístupového práva (ADMIN_KICK) pre vykonanie tohto príkazu na servery.

```c
public kick_player(id){
```

Tento riadok zdrojového kódu bude použitý pri volaní (použití) príkazu con_kick. Premenná ID reprezentuje číso hráča. Číslo je v rozpätí 1-32, reprezentujúce počet slotov na servery. Číslo hráča zistíme konzolovým príkazom status na servery.

```c
    if(!(get_user_flags(id)&ADMIN_KICK)){
        console_print(id,"[AMXX] Na vykonanie prikazu nemate opravnenie")
        return PLUGIN_HANDLED
    }
```

Táto časť zdrojového kódu slúži na overenie či daný užívatel (hráč) má prístupové práva k vykonaniu nášho príkazu na servery. Ak užívateľ nemá požadované prístupové oprávnenie plugin mu vypíše konzolovú správu v tvare “[AMXX] Na vykonanie prikazu nemate opravnenie” a plugin vráti návratovú hodnotu PLUGIN_HANDLED, ktorý zastaví daľšie vykonanie príkazu(ov).

```c
    if(read_argc() == 0){
        console_print(id,"[AMXX] Musite zadat ID uzivatela")
        return PLUGIN_HANDLED
    }
```

V nasledujúcej časti kódu overujeme počet zadaných argumentov príkazu, ktorý sme zadávali do konzole. Ak neuvedieme žiadny argument plugin nám vypíše konzolovú správu [AMXX] Musite zadat ID uzivatela a vráti návratovu hodnotu PLUGIN_HANDLED.

```c
    new user[32], uid
    read_argv(1,user,32)
    uid = find_player("bh",user)
```

V nasledujucich riadkoch si vytvoríme nové premenné user typu pole o maximálnej veľkosti 32 a premennú uid. Funkcia read_argv nám poslúži na prečítanie prvého argumentu pri zadávaní príkazu, parametre tejto funkcie sú zvyčajne 3:

- počet argumentov použitých v danom príkaze
- premenná do ktorej sa nám uloží hodnota zadaného argumentu
- maximalna dĺžka zadaného reťazca argumente

V ďaľšom kroku sa nám uloží do premennej uid id užívateľa, ktorého funkcia find_player hľadá podla mena vo šetkých pripojených užívatelov okrem bot(ov) a tych, ktorych meno obsahuje časť mena (funkcia vracia celé číslo pri zhode celé číslo reprezentujúce id užívatela na servery, ak výsledok hľadania je false vráti nulu).

```c
   if(uid == 0){
        console_print(id,"[AMXX] Nespravne uzivatelske ID")
        return PLUGIN_HANDLED
    }
```

Overíme si či sme podľa zadaného mena v argumente nášho príkazu zadali správny názov (nick) užívatela, ak premenná uid obsahuje nulu znamená to, že daný užívateľ na servery nieje pripojený, alebo došlo k zadaniu nesprávneho nicku užívateľa.

```c
    client_cmd(uid,"echo Bol si kicknuty so serveru!")
    client_cmd(uid,"disconnect")
```

Funkcia client_cmd slúži na vykonanie príkazu na strane pripojeného užívatela (hráča). V našom prípade ju využijeme na vykonanie dvoch príkazov a to:

    na strane klienta vypíšeme konzolovú správu “Bol si kicknuty so server!”
    a pre vykonanie príkazu disconnect, ktorý spôsobý na strane klienta odpojenie so serveru

```c
    console_print(id,"Kicknutie hraca!")
    return PLUGIN_HANDLED
}
```

Funkcia console_print vypíše konzolovú správu len tomu užívatelovi, ktorý zadal náš príkaz (použil konzolový príkaz, ktory sme napísali v našom plugine).

Na koniec vrátime návratovú hodnotu PLUGIN_HANDLED, ktorá nám ukončí celý beh pluginu.