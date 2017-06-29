---
title: "Zastaralé funkcie v PHP 7.2"
layout: post
date: 2017-06-29 15:00
tag: [php, php7.2, rfc]
image: https://arzzen.github.io/git-quick-stats/bg.png
headerImage: false
projects: false
hidden: false # don't count this post in blog pagination
description: "RFC: Deprecations for PHP 7.2"
category: blog
author: arzzen
externalLink: false
---

# Zastarané funkcie v PHP 7.2

## __autoload

Od použitia funkcie *__autoload* sa v dokumentácii odrádza už od verzie php 5.1, 
kedy bola nahradená funkciou *spl_autoload_register()*. 
Jednou z hlavných výhod *spl_autoload_register()* je schopnosť poskytovať viacnásobné 
reťazové autoloadery, čím sa uľahčuje interoperabilita knižníc (vzájomná komunikácia medzi knižnicami).

```php
function __autoload($className) {
    include $className.'.php';
}
```

mala by byť nahradená volaním:
```php
spl_autoload_register(function($className) {
    include $className.'.php';
});
```
   
## $php_errormsg

Premenná *$php_errormsg* je vytváraná vždy v lokálnom kontexte, v prípade:

- ak je vytvorená nefatálna chyba 
- a ak je povolené nastavenie *track_errors* v php.ini (ktoré je štandardne deaktivované) 
- a ak chyba nebola spracovaná iným "error handlerom"

Správanie premennej *$php_errormsg* je veľmi magické...

Mala by byť nahradená používaním funkcie *error_get_last()*, ktorá poskytuje čistejší spǒsob zisťovania poslednej chyby.


## create_function()

Funkcia *create_function()* je v podstate "wraperom" nad funkciou *eval()* a preto by od verzie php 5.3 mala byť nahrádzaná využívaním lambda funkcii.

```php
create_function('$a, $b', 'return strlen($b) - strlen($a);');
```

mala by byť nahradená volaním:
```php
function($a, $b) {
    return strlen($b) - strlen($a);
});
```

## (unset) cast
   
Používanie výrazu *(unset)* je považovaný za zbytočný, jeho správanie je považované za zmätočné, 
kedže vačšina ľudi predpokladá, že jej správanie bude podobné ako pri funkcii *unset()*, 
čo ale v skutočnosti nieje pravda...
   
## parse_str() without second argument

V prípade funkcie *parse_str()* je doporučené používať druhý argument funkcie.
Používanie tejto funkcie bez druhého argumentu predstavuje závažné bezpečnostné riziko.
    
## gmp_random()

Od verzie php 5.6 sa doporučuje používať funkcie *gmp_random_bits()* a *gmp_random_range()*, ktoré umožňujú presnú kontrolu nad používaným rozsahom náhodných čísel. Tieto funkcie by mali byť vždy uprednostňované pred *gmp_random()*.

```php
gmp_random();
```

mala by byť nahradená volaním:
```php
gmp_random_range($min, $max); // or
gmp_random_bits($bits);
```

## each()

*each()* funkcia sa používa/la na iteráciu polí, podobne ako *foreach*. 
Je však horšia vo všetkých ohľadoch, je 10 krát pomalšia a predstavuje problémy s výkonom.
   
```php
while (list($key, $val) = each($array)) {
    echo $key.' => '.$val.'<br />';
}
```

mala by byť nahradená volaním:
```php
foreach ($array as $key => $value) {
    echo $key.' => '.$val.'<br />';
}
```
   
## assert() with string argument

Použitie argumentu typu reťazec ako asertácie je **DEPRECATED** od verzie PHP 7.2 (z dôvodu "remote code execution").




