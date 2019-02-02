---
title: "Tvorba amxx pluginu – ako detekovať stlačenú klávesu na strane klienta (tichá chôdza)"
layout: post
date: 2009-04-03 19:00
tag: [pawn, amxx, plugin]
headerImage: false
star: false
description: "Tvorba amxx pluginu – ako detekovať stlačenú klávesu na strane klienta (tichá chôdza)"
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

O praktickom použití som začal písať môj prvý blog s pred takmer [10 rokov](https://arzzen.wordpress.com/2009/04/03/tvorba-amxx-pluginu-ako-detekovat-stlacenu-klavesu-na-strane-klienta-ticha-chodza/).
Tu je jeho nezmenená verzia:

---

Vzhľadom k tomu, že chôdza je prevádzaná čisto na strane klienta, neexistuje žiadny jednoduchý spôsob ako zistit kedy hráč práve stlačil tlačítko. Klient posiela určité informácie na server, ktoré sa dajú detekovať, ide napríklad o pohyby vred a vzad. Tieto hodnoty sa nachádzajú v triede UserCmd.

Použitím modulu FAKEMETA si vytovríme novú funkciu s názvom USRCmdStart pomocou ktorej zachytíme hodnoty pohybu vpred a vzad (UC_ForwardMove a UC_SideMove). Pohyb dopredu sme zistili pomocou vypočítania hodnoty konštanty MAXSPEED, ktorú vynásobíme 0.52 (táto číslica je hodnota ktorá je premenlívá – nachádza sa medzi hodnotami cvar a jej názov je cl_movespeedkey).

zdrojový kód:

```c
plugin_init()
register_forward(FM_CmdStart, "FMCmdStart");

public FMCmdStart(id, uc_handle, randseed){
    new Float:fmove, Float:smove;
    get_uc(uc_handle, UC_ForwardMove, fmove);
    get_uc(uc_handle, UC_SideMove, smove);

    new Float:maxspeed;
    pev(id, pev_maxspeed, maxspeed);
    new Float:walkspeed = (maxspeed * 0.52);
    fmove = floatabs(fmove);
    smove = floatabs(smove);

    if(fmove <= walkspeed && smove <= walkspeed && !(fmove == 0.0 && smove == 0.0)){
        client_print(id, print_center, "Ticha chodza");
    }else{
        client_print(id, print_center, "Rychla chodza");
    }
}
```

vysvetlenie jednotlivých častí zdrojového kódu:

```c
plugin_init(){
    register_forward(USR_CmdStart, "USRCmdStart");
}
```

Príkazom plugin_init() si sinicializujeme získavanie hodnoty pohybu do predu pomocou funkcie register_forward().

```c
public USRCmdStart(id, uc_handle, randseed){
    new Float:fmove, Float:smove;
    get_uc(uc_handle, UC_ForwardMove, fmove);
    get_uc(uc_handle, UC_SideMove, smove);
```

Vytvoríme si novú funkciu s názvom USRCmdStart, ktorá bude mať tri argumenty. Vytvoríme si premenné typu float a to fmove a smove. V ďaľšom kroku naplníme premenné fmove a smove hodnotami konštánt UC_ForwardMove pre pohyb dopredu a UC_SideMove pre pohyb do strán.

```c
    new Float:maxspeed;
    pev(id, pev_maxspeed, maxspeed);
    new Float:walkspeed = (maxspeed * 0.52);
    fmove = floatabs(fmove);
    smove = floatabs(smove);
```

Vytvoríme si pomocné premenné maxspeed (pre získanie rýchlosti behu) a walkspeed (pre získanie hodnoty tichého pohybu). Pri inicializácii premennej walkspeed sme si ju rovno naplnili hodnotou násobku premennej maxspeed a 0.52. Pomocou funkcie pev() si nastavíme predvolené rýchlosť behu (pohybu užívateľa-hráča) na hodnotu maxspeed (čiže rýchlosť behu). Premenným fmove a smove priradíme absolutné hodnoty s typu premennej float.

```c
    if(fmove <= walkspeed && smove <= walkspeed && !(fmove == 0.0 && smove == 0.0)){
        client_print(id, print_center, "Ticha chodza");
    }else{
        client_print(id, print_center, "Rychla chodza");
    }
}
```

V poslednom kroku nám len stačí porovnať hodnoty fmove a zároven smove s hodnotami walkspeed a zároven ak hodnoty premenných fmove a smove sú rôzne od 0.0 tak sa nám vykoná funkcia, ktorá vypíše danému klientovi správu Ticha chodza. Ak podmienka nieje splnená vypíše sa správa Rychla chodza.